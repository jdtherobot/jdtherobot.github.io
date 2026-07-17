/* @ds-bundle: {"format":4,"namespace":"CyberneticPremiumJDBrittDesignSystem_2f21f3","components":[{"name":"TierLine","sourcePath":"components/brand/TierLine.jsx"},{"name":"WaveTrace","sourcePath":"components/brand/WaveTrace.jsx"},{"name":"MarkSpike","sourcePath":"components/brand/WaveTrace.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ModeToggle","sourcePath":"components/data/ModeToggle.jsx"},{"name":"NoteRow","sourcePath":"components/data/NoteRow.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Card","sourcePath":"components/surface/Card.jsx"},{"name":"Figure","sourcePath":"components/surface/Figure.jsx"}],"sourceHashes":{"components/brand/TierLine.jsx":"562c9fc7ec04","components/brand/WaveTrace.jsx":"733c6a4da573","components/core/Button.jsx":"1d89a087ceba","components/core/Eyebrow.jsx":"d338aee7c40f","components/core/Tag.jsx":"76709619434b","components/data/ModeToggle.jsx":"d305cd2d4aa8","components/data/NoteRow.jsx":"edc839f07e0a","components/data/Stat.jsx":"215585a2dd5b","components/surface/Card.jsx":"1fd653a37664","components/surface/Figure.jsx":"3de8c88ba769","ui_kits/portfolio/HomePage.jsx":"84523ccbeb19"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CyberneticPremiumJDBrittDesignSystem_2f21f3 = window.CyberneticPremiumJDBrittDesignSystem_2f21f3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/TierLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* TierLine — the 14px SVG rule at a card's top edge, ALWAYS pure #C9A45E.
   Three variants form ONE progression (not three categories — never multi-hue):
     plain    (default)  — solid gold run
     branch   — taps peel off at 45°, turn parallel, run a real distance;
                some terminate at a node, some exit the box
     dissolve — gold derezzes into PAGE-BACKGROUND pixels left→right, reading as
                holes punched through to the page behind the card. Only two
                colours ever appear: gold and --bg. Pixel pitch MUST equal pixel
                size or the card ground leaks through as a dashed line.
   Mapping: Theory=plain · Implementation=branch · Application=dissolve. */

const GOLD = '#C9A45E';
function draw(svg, kind) {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const cs = getComputedStyle(document.documentElement);
  const bg = cs.getPropertyValue('--bg').trim() || '#ECE2C6';
  const ns = 'http://www.w3.org/2000/svg';
  const W = Math.max(60, Math.round(svg.getBoundingClientRect().width));
  svg.setAttribute('viewBox', '0 0 ' + W + ' 14');
  svg.setAttribute('preserveAspectRatio', 'xMinYMid meet');
  const y = 6,
    h = 3;
  const rect = (x, w, fill, yy, hh) => {
    const r = document.createElementNS(ns, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', yy === undefined ? y : yy);
    r.setAttribute('width', w);
    r.setAttribute('height', hh === undefined ? h : hh);
    r.setAttribute('fill', fill);
    svg.appendChild(r);
  };
  const path = (d, col, w) => {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', col);
    p.setAttribute('stroke-width', w || 2);
    p.setAttribute('stroke-linecap', 'butt');
    svg.appendChild(p);
  };
  const dot = (cx, cy, r, col) => {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', cx);
    c.setAttribute('cy', cy);
    c.setAttribute('r', r);
    c.setAttribute('fill', col);
    svg.appendChild(c);
  };
  if (kind === 'plain') {
    rect(0, W, GOLD);
  }
  if (kind === 'branch') {
    rect(0, W, GOLD);
    const UP = 3,
      DN = 12,
      a = W * 0.20,
      b = W * 0.36,
      c = W * 0.60;
    path('M ' + a + ',7 L ' + (a + 4.5) + ',' + UP + ' H ' + W * 0.42, GOLD, 2);
    dot(W * 0.42 + 1.8, UP, 1.9, GOLD);
    path('M ' + b + ',8 L ' + (b + 4.5) + ',' + DN + ' H ' + W, GOLD, 2);
    path('M ' + c + ',7 L ' + (c + 4.5) + ',' + UP + ' H ' + W, GOLD, 2);
  }
  if (kind === 'dissolve') {
    const px = 3,
      solidTo = Math.round(W * 0.36);
    let seed = 7;
    rect(0, solidTo, GOLD);
    for (let x = solidTo; x < W; x += px) {
      const f = (x - solidTo) / (W - solidTo);
      seed = seed * 1103515245 + 12345 & 0x7fffffff;
      const rnd = seed % 1000 / 1000;
      const isGold = rnd > f * 1.15;
      rect(x, px, isGold ? GOLD : bg);
      if (f > 0.5 && rnd > 0.86) rect(x, px, isGold ? GOLD : bg, rnd > 0.93 ? 0.5 : 10.5, px);
    }
  }
}
function TierLine({
  variant = 'plain',
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const render = () => draw(svg, variant);
    render();
    const ro = new ResizeObserver(render);
    ro.observe(svg);
    // dissolve pixels track --bg, so redraw when the mode attribute flips
    const mo = new MutationObserver(render);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode']
    });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [variant]);
  return /*#__PURE__*/React.createElement("svg", _extends({
    ref: ref,
    className: "ds-tierline",
    "aria-hidden": "true",
    style: {
      display: 'block',
      width: '100%',
      height: 'var(--tierline-h)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { TierLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/TierLine.jsx", error: String((e && e.message) || e) }); }

// components/brand/WaveTrace.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* WaveTrace — the shared signature motif: a neural waveform. Same gesture
   across all three sibling systems, only RECOLOURED, never redrawn.
   Canonical geometry, do not edit: viewBox 0 0 280 40 with these exact points. */
const POINTS = '0,20 40,20 48,6 56,34 64,20 120,20 128,10 136,20 180,20 188,4 196,36 204,20 280,20';
function WaveTrace({
  color = 'var(--gold)',
  width = 280,
  strokeWidth = 2,
  title = 'Neural waveform trace',
  style = {},
  ...rest
}) {
  const w = typeof width === 'number' ? `${width}px` : width;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 280 40",
    width: w,
    role: "img",
    "aria-label": title,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("polyline", {
    points: POINTS,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

/* MarkSpike — a square crop of the trace's sharpest spike; the same gesture,
   legible at 16px where the full 7:1 line collapses. Use as favicon / lockup mark. */
function MarkSpike({
  color = 'var(--gold)',
  size = 32,
  strokeWidth = 2.6,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    role: "img",
    "aria-label": "JD Britt mark",
    style: {
      display: 'block',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("polyline", {
    points: "2,16 10,16 13,5 17,27 20,16 30,16",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(__ds_scope, { WaveTrace, MarkSpike });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WaveTrace.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Button — mono, square, hairline. Primary = material gold fill + carbon ink
   (7.8:1, identical both modes). Outline = ink outline, transparent. Gold is
   NEVER the ink. Renders <a> when href is set, else <button>. */
function Button({
  variant = 'primary',
  href,
  children,
  onClick,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-btn)',
    letterSpacing: 'var(--ls-btn)',
    lineHeight: 1,
    padding: '11px 20px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    border: '1px solid',
    borderRadius: 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : hover ? 0.88 : 1,
    transition: 'opacity .18s, background .18s, color .18s'
  };
  const variants = {
    primary: {
      background: 'var(--gold)',
      color: 'var(--btn-text)',
      borderColor: 'var(--gold)'
    },
    outline: {
      background: hover && !disabled ? 'var(--label-on-bg)' : 'transparent',
      color: hover && !disabled ? 'var(--bg)' : 'var(--label-on-bg)',
      borderColor: 'var(--label-on-bg)'
    }
  };
  const cls = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: "ds-btn",
      style: cls
    }, handlers, rest), children);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: "ds-btn",
    style: cls
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Eyebrow — the mono, uppercase, wide-tracked kicker that opens every block.
   First element of the component skeleton: eyebrow → headline → body → tag → button. */
function Eyebrow({
  children,
  on = 'bg',
  as = 'div',
  style = {},
  ...rest
}) {
  const Comp = as;
  const color = on === 'panel' ? 'var(--label-on-panel)' : 'var(--label-on-bg)';
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: "ds-eyebrow",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      margin: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Tag — mono, hairline-outlined metadata chip (square, not pill). Used for tier
   labels (Theory / Implementation / Application) and other short metadata. Ink
   only — never a gold fill. Adapts to page vs card ground via `on`. */
function Tag({
  children,
  on = 'bg',
  style = {},
  ...rest
}) {
  const color = on === 'panel' ? 'var(--label-on-panel)' : 'var(--label-on-bg)';
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "ds-tag",
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-tag)',
      letterSpacing: 'var(--ls-tag)',
      textTransform: 'uppercase',
      padding: '5px 11px',
      border: `1px solid ${color}`,
      color,
      borderRadius: 'var(--radius)',
      lineHeight: 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/ModeToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ModeToggle — the day/night switch. THEME is chosen by content, not the
   visitor; this control lets a visitor override for comfort, persists the
   choice, and otherwise follows prefers-color-scheme. Writes data-mode on
   <html>. The track is the sole rounded element in the system; the thumb is
   material gold. */
function ModeToggle({
  showLabel = true,
  style = {},
  ...rest
}) {
  const get = () => typeof document !== 'undefined' ? document.documentElement.getAttribute('data-mode') : null;
  const [mode, setMode] = React.useState(get() || 'day');
  React.useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('jdb-mode');
    } catch (e) {/* ignore */}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = get() || saved || (prefersDark ? 'night' : 'day');
    document.documentElement.setAttribute('data-mode', initial);
    setMode(initial);
    const mo = new MutationObserver(() => setMode(get()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode']
    });
    return () => mo.disconnect();
  }, []);
  const toggle = () => {
    const next = mode === 'night' ? 'day' : 'night';
    document.documentElement.setAttribute('data-mode', next);
    try {
      localStorage.setItem('jdb-mode', next);
    } catch (e) {/* ignore */}
    setMode(next);
  };
  const night = mode === 'night';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ds-mode-toggle",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      ...style
    }
  }, rest), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      letterSpacing: '.08em',
      opacity: 0.7,
      width: 36,
      textTransform: 'uppercase'
    }
  }, mode), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    "aria-label": "Toggle day and night mode",
    "aria-pressed": night,
    style: {
      width: 42,
      height: 22,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--edge)',
      border: 'none',
      position: 'relative',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2.5,
      left: 2.5,
      width: 17,
      height: 17,
      borderRadius: '50%',
      background: 'var(--gold)',
      transform: night ? 'translateX(20px)' : 'none',
      transition: 'transform .2s'
    }
  })));
}
Object.assign(__ds_scope, { ModeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ModeToggle.jsx", error: String((e && e.message) || e) }); }

// components/data/NoteRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* NoteRow — an index row for lab notes / writing: a tier Tag + title on the
   left, a mono date on the right, divided by a hairline rule. Title links
   darken to the label ink on hover. */
function NoteRow({
  tag,
  title,
  href = '#',
  date,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ds-note-row",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: '18px 0',
      borderBottom: '1px solid var(--edge)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, tag && /*#__PURE__*/React.createElement(__ds_scope.Tag, null, tag), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: tag ? 8 : 0,
      fontSize: '15px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? 'var(--label-on-bg)' : 'inherit',
      textDecoration: 'none',
      transition: 'color .18s'
    }
  }, title))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      opacity: 0.55,
      whiteSpace: 'nowrap',
      textTransform: 'uppercase'
    }
  }, date));
}
Object.assign(__ds_scope, { NoteRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/NoteRow.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Stat — a large numeral over a mono label. The numeral is the ONE place small
   copy graduates to gold-eligible: it uses --stat (gold at Night, deep bronze
   at Day) and is large-only, so it clears the contrast floor. Never shrink the
   numeral into small-text territory. */
function Stat({
  value,
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ds-stat",
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--w-display)',
      fontSize: 'var(--fs-display)',
      color: 'var(--stat)',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      opacity: 0.65,
      marginTop: 6
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/surface/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Card — the carbon panel. Inverts against the page (dark card on cream page,
   cream card on carbon page). Carries: a gold TierLine at the top edge,
   laser-etched diagonal seams fading out across the top-left (masked to
   dissolve by ~42%), content, and an optional stencil metadata label
   bottom-right (REAL metadata — section id, revision — never roleplay copy).
   Headings inside inherit colour so they stay legible on the inverted ground. */
function Card({
  tier = 'plain',
  stencil,
  children,
  style = {},
  innerStyle = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ds-card card",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--panel)',
      color: 'var(--panel-text)',
      border: '1px solid var(--edge)',
      borderRadius: 'var(--radius)',
      // slice-backing must match the card ground, not the page
      ['--slice-bg']: 'var(--panel)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.TierLine, {
    variant: tier
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      content: '""',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(115deg,var(--seam) 0 1px,transparent 1px 15px)',
      WebkitMaskImage: 'linear-gradient(to bottom right,black 0%,transparent 42%)',
      maskImage: 'linear-gradient(to bottom right,black 0%,transparent 42%)',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-card-inner",
    style: {
      position: 'relative',
      zIndex: 1,
      padding: 'var(--card-pad)',
      ...innerStyle
    }
  }, children), stencil && /*#__PURE__*/React.createElement("div", {
    className: "ds-stencil",
    style: {
      position: 'absolute',
      bottom: 14,
      right: 18,
      zIndex: 1,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-stencil)',
      letterSpacing: 'var(--ls-stencil)',
      lineHeight: 1.7,
      textAlign: 'right',
      opacity: 0.5,
      color: 'var(--panel-text)',
      whiteSpace: 'pre-line'
    }
  }, stencil));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surface/Card.jsx", error: String((e && e.message) || e) }); }

// components/surface/Figure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Figure — project imagery in a carbon frame: 8px padding, 1px edge, 16:10 by
   default, with a mono caption. NO duotone, filter or overlay — the frame does
   the brand work, the image stays honest. Pass real project screenshots only;
   never third-party product photography. */
function Figure({
  src,
  alt = '',
  caption,
  ratio = '16 / 10',
  style = {},
  imgStyle = {},
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: "ds-figure",
    style: {
      margin: 0,
      background: 'var(--panel)',
      border: '1px solid var(--edge)',
      borderRadius: 'var(--radius)',
      padding: 'var(--figure-pad)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      background: '#0e0d10',
      overflow: 'hidden'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      ...imgStyle
    }
  }) : children), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      letterSpacing: 'var(--ls-caption)',
      color: 'var(--panel-text)',
      opacity: 0.7,
      padding: '9px 3px 2px',
      textTransform: 'uppercase'
    }
  }, caption));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surface/Figure.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/HomePage.jsx
try { (() => {
/* JD Britt portfolio — homepage. Faithful recreation of the reference
   (02_CODE_drag_this_whole_folder/index.html), composed from design-system
   components. Page chrome (nav, sections, dot-grid, grids, footer) is styled by
   index.html; branded primitives come from the bundle namespace. */
const NS = window.CyberneticPremiumJDBrittDesignSystem_2f21f3;
const {
  Button,
  Tag,
  Eyebrow,
  WaveTrace,
  MarkSpike,
  TierLine,
  Card,
  Figure,
  Stat,
  NoteRow,
  ModeToggle
} = NS;
function Nav() {
  const [open, setOpen] = React.useState(false);
  const links = ['Research', 'Work', 'Notes', 'Background', 'Résumé'];
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "brand"
  }, /*#__PURE__*/React.createElement(MarkSpike, {
    size: 20,
    color: "currentColor"
  }), " JD BRITT"), /*#__PURE__*/React.createElement("div", {
    className: "navlinks"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase()
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement(ModeToggle, null), /*#__PURE__*/React.createElement("button", {
    className: 'burger' + (open ? ' open' : ''),
    "aria-expanded": open,
    "aria-label": open ? 'Close menu' : 'Open menu',
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: 'drawer' + (open ? ' open' : '')
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    onClick: () => setOpen(false)
  }, l))));
}
const TIERS = [{
  tier: 'plain',
  eyebrow: 'Tier 01 — Theory',
  h: 'ML theory & neuroscience-inspired algorithms',
  b: 'Brain-inspired learning, evolutionary ML, computational neuroscience as a lens into better models.'
}, {
  tier: 'branch',
  eyebrow: 'Tier 02 — Implementation',
  h: 'Embedded systems & neuromorphic hardware',
  b: 'Systems programming, computer architecture — how to build intelligent systems efficiently on real hardware.',
  link: 'See hardware projects →'
}, {
  tier: 'dissolve',
  eyebrow: 'Tier 03 — Application',
  h: 'BCI, AR & robotics',
  b: 'Brain-computer interfaces, human-machine integration — what the theory and hardware make possible.',
  link: 'See BCI projects →'
}];
function HomePage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("section", {
    id: "hero",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "AI/BCI Research \xB7 Systems Engineering"), /*#__PURE__*/React.createElement("h1", null, "Engineering the interface between brain and machine"), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: 18
    }
  }, "Systems engineer and researcher building the hardware-to-application stack for brain-inspired AI \u2014 from neuromorphic hardware to brain-computer interfaces. A decade leading large-scale technical programs in the U.S. Air Force, now pursuing a PhD to bring the same builder's discipline to research."), /*#__PURE__*/React.createElement("div", {
    className: "hero-trace"
  }, /*#__PURE__*/React.createElement(WaveTrace, {
    width: 320
  })), /*#__PURE__*/React.createElement("div", {
    className: "cta-row"
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#research"
  }, "View research \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    href: "#r\xE9sum\xE9"
  }, "Download r\xE9sum\xE9 \u2193")))), /*#__PURE__*/React.createElement("section", {
    id: "research",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Research Framework"), /*#__PURE__*/React.createElement("h2", null, "Three tiers, one stack"), /*#__PURE__*/React.createElement("div", {
    className: "grid3"
  }, TIERS.map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.eyebrow,
    tier: t.tier
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    on: "panel",
    style: {
      marginBottom: 14
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h3", null, t.h), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, t.b), t.link && /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "card-link"
  }, t.link)))))), /*#__PURE__*/React.createElement("section", {
    id: "work",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Selected Work"), /*#__PURE__*/React.createElement("h2", null, "Current focus"), /*#__PURE__*/React.createElement("div", {
    className: "grid2"
  }, /*#__PURE__*/React.createElement(Figure, {
    caption: "PROJECT IMAGE \u2014 16:10 \xB7 CARBON FRAME \xB7 NO FILTER"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 640 400",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid slice"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "640",
    height: "400",
    fill: "#0e0d10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "40,200 180,200 200,140 220,260 240,200 380,200 400,160 420,200 520,200 540,130 560,270 580,200 620,200",
    fill: "none",
    stroke: "#C9A45E",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: ".8"
  }))), /*#__PURE__*/React.createElement(Card, {
    tier: "plain",
    stencil: "SEC.03\nREV 2026.07"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    on: "panel",
    style: {
      marginBottom: 14
    }
  }, "Research direction"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22
    }
  }, "Neuromorphic computing & brain-computer interfaces"), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Bridging computational neuroscience and embedded systems \u2014 building intelligent systems that run efficiently on real hardware, and the interfaces that connect them to people."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#"
  }, "Read more \u2192")))))), /*#__PURE__*/React.createElement("section", {
    id: "notes",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Notes"), /*#__PURE__*/React.createElement("h2", null, "Lab notes"), /*#__PURE__*/React.createElement(NoteRow, {
    tag: "Implementation",
    title: "Choosing an APU for 15 kHz CRT output",
    date: "JUL 2026"
  }), /*#__PURE__*/React.createElement(NoteRow, {
    tag: "Application",
    title: "Debugging EEG signal noise",
    date: "JUN 2026"
  }), /*#__PURE__*/React.createElement(NoteRow, {
    tag: "Theory",
    title: "Why direct-to-PhD, not MS-then-PhD",
    date: "MAY 2026",
    style: {
      borderBottom: 'none'
    }
  }))), /*#__PURE__*/React.createElement("section", {
    id: "background",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Background"), /*#__PURE__*/React.createElement("h2", null, "Before the PhD"), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "A decade-plus in the U.S. Air Force leading technical programs at scale \u2014 infrastructure modernization, portfolio management, and cyber operations across three countries."), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "$10M+",
    label: "Infrastructure modernization led"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "3.2K",
    label: "Devices under lifecycle mgmt"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "8 YRS",
    label: "International technical leadership"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "CISSP",
    label: "Certified"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "r\xE9sum\xE9",
    className: "dotgrid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "Get in touch"), /*#__PURE__*/React.createElement("h2", null, "R\xE9sum\xE9 & contact"), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Open to research conversations, PhD advisor introductions, and technical roles at the intersection of neuroscience and systems."), /*#__PURE__*/React.createElement("div", {
    className: "cta-row"
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#"
  }, "Download r\xE9sum\xE9 \u2193"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    href: "#"
  }, "Email \u2192")))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap foot-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "brand"
  }, /*#__PURE__*/React.createElement(MarkSpike, {
    size: 16,
    color: "currentColor"
  }), " JD BRITT"), /*#__PURE__*/React.createElement("div", {
    className: "foot-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "LinkedIn"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Email")))));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/HomePage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.TierLine = __ds_scope.TierLine;

__ds_ns.WaveTrace = __ds_scope.WaveTrace;

__ds_ns.MarkSpike = __ds_scope.MarkSpike;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ModeToggle = __ds_scope.ModeToggle;

__ds_ns.NoteRow = __ds_scope.NoteRow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Figure = __ds_scope.Figure;

})();
