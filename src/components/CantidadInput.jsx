import { useEffect, useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

/**
 * Campo de cantidad reutilizable (catálogo y carrito). Punto 4.
 * - Bloquea e, E, +, -, . y , al teclear.
 * - Al pegar solo acepta texto con únicamente dígitos.
 * - La rueda del mouse no cambia el valor.
 * - 0 → onMin(); mayor al stock → se corrige al máximo y onMax().
 */
export default function CantidadInput({ value, max, onChange, onMin, onMax, label, disabled }) {
  const [texto, setTexto] = useState(String(value));

  useEffect(() => setTexto(String(value)), [value]);

  const handleKeyDown = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) e.preventDefault();
  };

  const handlePaste = (e) => {
    const pegado = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pegado)) e.preventDefault();
  };

  const handleChange = (e) => {
    const v = e.target.value;
    if (v === "") return setTexto(""); // permite borrar para escribir otro número
    if (!/^\d+$/.test(v)) return;
    const n = parseInt(v, 10);
    if (n < 1) {
      setTexto(String(value)); // conserva el valor anterior
      onMin();
      return;
    }
    if (n > max) {
      setTexto(String(max));
      onChange(max);
      onMax();
      return;
    }
    setTexto(String(n));
    onChange(n);
  };

  const handleBlur = () => {
    if (texto === "") setTexto(String(value));
  };

  return (
    <input
      className="cantidad-input"
      type="number"
      inputMode="numeric"
      min="1"
      max={max}
      step="1"
      value={texto}
      disabled={disabled}
      aria-label={label}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={handleChange}
      onBlur={handleBlur}
      onWheel={(e) => e.currentTarget.blur()}
    />
  );
}
