# Steganography lvl 3 — Stegosaurus 3

**Techniques:** binwalk carving · nested AES · JPEG quantization-table stego · filename-as-clue
**Flag:** `Flag{Y0u haVe EnCouNTeR3d a w!Ld s1eEP p@RA1y$!S DEm0n}`

The boss. One file — `Honey.jpeg` — that is secretly **five files stacked together**, wrapped in three
layers of encryption, with a stego-hidden key and a couple of decoys thrown in to waste your time.

---

## The mechanics

`binwalk` reveals the seams. You carve the pieces apart, crack the *weak* outer layer to recover a
toolkit, use that toolkit to extract an AES key hidden in a JPEG's **quantization tables**, and use
*that* to unwind the inner layers down to the flag.

```mermaid
flowchart TD
  H["Honey.jpeg"] -->|binwalk| OFF["offsets:<br/>secret.enc · mid.zip · inner.jpg · payload.enc · decoy.enc"]
  OFF --> SE["carve secret.enc"]
  SE -->|"crack (weak): desertstorm"| BUN["secret_bundle.zip<br/>qtbl.py · STEGO_KEY_386.txt · passwords.enc · iv.bin"]
  BUN -->|"split into 24-char records,<br/>concatenate records 3 · 8 · 6"| KB["stego key ('386')"]
  OFF --> NJ["carve nothingtoseehere.jpg"]
  NJ -->|"qtbl.py extract + stego key"| AK["raw 32-byte AES key<br/>(hidden in quantization tables)"]
  AK --> DP["openssl -d + iv.bin"]
  BUN --> DP
  DP --> PW["passwords.txt →<br/>the real payload password"]
  PW --> PL["decrypt payload.enc → payload.zip"]
  PL --> FLAG["Flag{Y0u haVe EnCouNTeR3d a w!Ld s1eEP p@RA1y$!S DEm0n}"]
```

---

## The clever bit

`STEGO_KEY_386.txt` *looks* like a wall of 4,824 characters. The `386` in the filename is the
instruction: split it into 24-character records and concatenate records **3, 8, 6** to build the XOR
key that `qtbl.py` needs. (Those 24-char records? They're the same 201 strings from **Steganography
lvl 2** — the noise from earlier was the key all along.) The AES key itself never appears in the
bundle; it lives only in the low bits of the inner JPEG's quantization tables, extractable only with
the derived key.

## The decoys

`mid.zip` opens to a four-square red herring; `decoy_random.enc` is literally random bytes; a stray
`secret.txt` reads "better luck next time." Part of the challenge is *not* chasing them.

## The lesson

Real forensics is layered, and progress on one layer unlocks the tools for the next. It also rewards
reading filenames like clues — because here, one of them literally is.
