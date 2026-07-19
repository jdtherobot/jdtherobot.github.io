# Cisco Switch Config Generator

An Excel-based (VBA) tool that builds ready-to-deploy Cisco switch configurations from a handful of simple inputs. Pick a **Model**, **Port Count**, **Node**, and **Building #** on one sheet, and the workbook auto-generates a per-port VLAN table with sensible defaults, renders a complete switch config, and exports it to a plain-text `.txt` file — on both **Windows and macOS**.

> **Note on this repository:** the runnable tool is the macro-enabled workbook in [`workbook/`](workbook/). Because that file is a binary, the VBA source is also committed in plain text under [`src/`](src/) so the actual code is browsable and diffable here on GitHub. The files in `src/` are exact exports of the code inside the workbook — they are documentation of the source, not a separate build.

## What it does

- Builds Cisco switch configs from simple inputs: Model, Port Count, Node, Building # (entered on **Main**).
- Auto-builds a **Ports** sheet with VLAN dropdowns and sensible defaults for the selected Node.
- Keeps **FinalConfig** in sync with the template + current port VLANs (live, no button required).
- Exports FinalConfig to `.txt` (cross-platform: Windows & macOS).

## Sheets overview

| Sheet | Purpose |
|-------|---------|
| **Main** | User inputs. `B8` = Building # (gray `99` placeholder), `D8` = Model, `E8` = Port Count, `F8` = Node. Buttons: Reset / Generate-Refresh / Output. |
| **Ports** | Auto-built port table. `A` = Port Number, `B` = Assigned VLAN, `C` = Second VLAN, `D` = Third VLAN. VLAN cells are dropdowns fed by `VLAN_List`. |
| **ConfigTemplate** | Line-by-line config template in column A, with placeholders replaced at build time. |
| **Reference** | Data source. `D` = Models, `E` = Port Counts, `F` = Nodes, `G:AF` = Node→VLAN mapping. `A:C` auto-built by `AutoBuildVLANs`. |
| **FinalConfig** | The rendered output, one command per row (easy to hand-edit a line before export). |

### Template placeholders

| Placeholder | Replaced with |
|-------------|---------------|
| `***HOSTNAME***` | `<Model>-BLDG<Building #>` |
| `***PORTCOUNT***` | The number from `Main!E8` |
| `***VLAN_DEFINITIONS***` | Built from `Reference!A:B` |
| `***PORT_CONFIG_BLOCK***` | Built from `Ports!A:D` |

## Buttons

- **Reset Config Generator** → `ResetConfigGenerator` — clears Ports & FinalConfig, resets placeholders on Main, re-applies list validations.
- **Generate / Refresh** → `ForceRefreshOutput` — rebuilds Ports (if Port Count and Node are chosen), then refreshes FinalConfig. Safe to click anytime.
- **Output Config** → `OutputConfig` — ensures FinalConfig is current, then saves as `.txt` (Mac/Windows friendly, with macOS fallbacks).

## Live update behavior

- **Main:** change `E8` (Port Count) or `F8` (Node) → Ports rebuilt + FinalConfig refreshed. Change `D8` (Model) or `B8` (Building) → FinalConfig refreshed (Ports untouched).
- **Ports:** any change in `B:D` → FinalConfig refreshed immediately.
- **Reference:** any edit in `F:AF` → `AutoBuildVLANs` rebuilds `A:C` automatically (Ports is not wiped).

## Data plumbing

```
Reference!F:AF (nodes + VLAN IDs, type names in row 1)
   ⮕ AutoBuildVLANs builds A:C (ID, Name, "ID – Name")
   ⮕ Named range VLAN_List points to C (dynamic)
   ⮕ Ports B:D dropdowns use VLAN_List
   ⮕ FinalConfig = ConfigTemplate + Reference A:B + Ports A:D
```

Named ranges (maintained by `EnsureNamedRanges`): `Model_List` → `Reference!D`, `PortCount_List` → `Reference!E`, `Node_List` → `Reference!F`, `VLAN_List` → `Reference!C`. Main dropdowns applied by `EnsureMainValidations` to `D8/E8/F8`.

## Extracted Code

| Module (`src/`) | Contents |
|-----------------|----------|
| `Module1.bas` | Core orchestration: `EnsureNamedRanges`, `EnsureMainValidations`, `ResetConfigGenerator`, `GenerateNewConfig`, `ForceRefreshOutput`, `SetupPortDropdowns`, `UpdateFinalConfig`, `OutputConfig`, and helpers (`CleanFileName`, cross-platform path pickers). |
| `BuildVLANs.bas` | `AutoBuildVLANs` — builds `Reference!A:C` from `F:AF` using row-1 headers as type names. |
| `Sheet1_Main.cls` | Watches `B8/D8/E8/F8` to trigger rebuild/refresh; handles the `B8` placeholder styling. |
| `Sheet2_Ports.cls` | Watches `B2:D` and refreshes FinalConfig on any change. |
| `Sheet4_Reference.cls` | Watches `F:AF` and runs `AutoBuildVLANs` (does not wipe Ports). |
| `ThisWorkbook.cls` | On open: seeds the `B8` placeholder, runs `AutoBuildVLANs`, `EnsureNamedRanges`, `EnsureMainValidations`. |

## User workflow

1. (Optional) Click **Reset Config Generator** when starting fresh.
2. Pick Model (`D8`), Port Count (`E8`), Node (`F8`).
3. Enter Building # in `B8`.
4. Ports appears with default Data and Voice VLANs per port; adjust any port's VLANs via the dropdowns.
5. FinalConfig updates live.
6. Click **Output Config** to save the `.txt`.

## Admin tasks

- **Add a VLAN type:** add a header in `Reference` row 1 within `G:AF` (e.g. `Printer`, `IoT`, `VLAN7`), fill VLAN IDs per node below it. `AutoBuildVLANs` picks it up automatically.
- **Add a Node:** put the node name in `Reference!F` on a new row, enter its VLAN IDs across `G:AF`. It appears in `Main!F8` immediately.
- **Add a Model or Port Count:** append to `Reference!D` or `Reference!E`; they flow into the Main dropdowns.
- **Change per-port defaults:** defaults come from the Reference row for the selected Node — `G` (Data) → `B`, `H` (Voice) → `C`. Third VLAN is blank by default (enable in `SetupPortDropdowns`).
- **Change interface syntax:** edit `ConfigTemplate` lines (keep placeholders intact) and/or the per-port composition in `UpdateFinalConfig`.

## Troubleshooting

- **Ports didn't rebuild on Node/Port Count change?** Ensure `Application.EnableEvents = True`; confirm you edited exactly `E8`/`F8`; click **Generate / Refresh** once.
- **Dropdowns empty?** Run `AutoBuildVLANs` (or edit any cell in `Reference!F:AF`), then `EnsureNamedRanges` and `EnsureMainValidations`. Confirm `Reference!A:C` has data.
- **Export error on Mac?** The save dialog falls back to a folder picker; choose Desktop if macOS sandboxing blocks other locations.
- **Building shows gray `99` and won't clear?** Click into `B8` once; the sheet code clears the placeholder and turns the font black.

## Known limitations / possible enhancements

- Per-port interface lines are hardcoded to `GigabitEthernet1/0/<n>`; multi-model / stacked-switch deployments would benefit from a configurable interface prefix.
- "Unset" input state is detected via sentinel strings (`"99"`, `"Model"`, `"Node"`, `"Port Ct."`).
- The VLAN ID is recovered from the joined `"ID - Name"` label at render time.

## Requirements

- Microsoft Excel with macros enabled (Windows or macOS). Open the workbook and enable content/macros when prompted.

## License

[MIT](LICENSE)

---

*Author: JD Britt.*
