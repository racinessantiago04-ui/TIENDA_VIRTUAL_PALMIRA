// Ilustraciones de los productos (SVG propio, sin dependencias externas).
// Para usar fotos reales, guárdalas en src/assets/ y reemplaza el <svg> por un <img>.
const FONDOS = { 1: "#efe3d3", 2: "#f3e2c4", 3: "#f6ecc7", 4: "#e9dcd3", 5: "#f1dcd9", 6: "#dcebe4" };

const DIBUJOS = {
  1: (
    <>
      <ellipse cx="100" cy="144" rx="52" ry="7" fill="#000" opacity=".1" />
      <rect x="62" y="22" width="76" height="118" rx="8" fill="#5b3a29" />
      <rect x="62" y="30" width="76" height="7" fill="#3e2619" />
      <rect x="74" y="56" width="52" height="56" rx="6" fill="#f2d9a8" />
      <ellipse cx="100" cy="82" rx="12" ry="17" fill="#5b3a29" transform="rotate(25 100 82)" />
      <path d="M96 67q9 14 0 30" stroke="#f2d9a8" strokeWidth="3" fill="none" />
      <ellipse cx="150" cy="138" rx="7" ry="4.5" fill="#5b3a29" transform="rotate(-20 150 138)" />
      <ellipse cx="44" cy="140" rx="7" ry="4.5" fill="#5b3a29" transform="rotate(15 44 140)" />
    </>
  ),
  2: (
    <>
      <ellipse cx="100" cy="138" rx="66" ry="8" fill="#000" opacity=".1" />
      <path d="M40 84l18-22h96l-18 22z" fill="#e0a95a" />
      <rect x="40" y="84" width="96" height="46" rx="3" fill="#b9722b" />
      <path d="M136 84l18-22v46l-18 22z" fill="#8f5420" />
      <path d="M72 84v46M104 84v46" stroke="#a2631f" strokeWidth="2" />
    </>
  ),
  3: (
    <>
      <ellipse cx="100" cy="128" rx="74" ry="14" fill="#fff" />
      <ellipse cx="100" cy="126" rx="58" ry="9" fill="#ece7dc" />
      <ellipse cx="100" cy="110" rx="46" ry="14" fill="#d9a53c" />
      <ellipse cx="100" cy="104" rx="46" ry="14" fill="#efc65c" />
      <ellipse cx="100" cy="90" rx="46" ry="14" fill="#d9a53c" />
      <ellipse cx="100" cy="84" rx="46" ry="14" fill="#f4d27a" />
      <ellipse cx="100" cy="84" rx="30" ry="8" fill="#efc65c" />
    </>
  ),
  4: (
    <>
      <ellipse cx="100" cy="138" rx="62" ry="7" fill="#000" opacity=".1" />
      <rect x="48" y="30" width="104" height="100" rx="8" fill="#4a2a1c" />
      <path d="M74 30v70M100 30v70M126 30v70M48 55h104M48 80h104" stroke="#2f1910" strokeWidth="2.5" />
      <rect x="48" y="96" width="104" height="34" rx="6" fill="#d9a441" />
      <circle cx="100" cy="113" r="9" fill="#4a2a1c" />
    </>
  ),
  5: (
    <>
      <ellipse cx="100" cy="134" rx="62" ry="7" fill="#000" opacity=".1" />
      <rect x="44" y="52" width="112" height="76" rx="8" fill="#c2413b" />
      <rect x="44" y="52" width="112" height="14" rx="7" fill="#d9605a" />
      <rect x="82" y="44" width="36" height="92" rx="4" fill="#3f7d3a" />
      <path d="M100 48v84" stroke="#2f6a2c" strokeWidth="2.5" />
      <path d="M100 70l-12 10M100 90l-12 10M100 70l12 10M100 90l12 10" stroke="#2f6a2c" strokeWidth="2" />
    </>
  ),
  6: (
    <>
      <ellipse cx="100" cy="148" rx="44" ry="6" fill="#000" opacity=".1" />
      <rect x="86" y="20" width="28" height="34" rx="4" fill="#cfe5d9" />
      <rect x="84" y="10" width="32" height="12" rx="4" fill="#e8a33d" />
      <path d="M88 52q-28 10-28 36v50a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V88q0-26-28-36z" fill="#cfe5d9" />
      <rect x="70" y="88" width="60" height="38" rx="4" fill="#17483a" />
      <circle cx="100" cy="107" r="9" fill="#e8a33d" />
    </>
  ),
};

export default function ImagenProducto({ id, nombre, className = "" }) {
  return (
    <div className={`imagen-producto ${className}`} style={{ background: FONDOS[id] }}>
      <svg viewBox="0 0 200 160" role="img" aria-label={nombre}>{DIBUJOS[id]}</svg>
    </div>
  );
}
