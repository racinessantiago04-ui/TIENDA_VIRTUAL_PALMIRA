import { useEffect } from "react";
import CantidadInput from "./CantidadInput.jsx";
import { formatoCOP } from "../utils/formato.js";

export default function Carrito({
  abierto, lineas, totalUnidades, total,
  onCerrar, onSumar, onRestar, onCambiar, onMax, onMin, onQuitar,
}) {
  useEffect(() => {
    if (!abierto) return;
    const cerrarConEsc = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", cerrarConEsc);
    return () => window.removeEventListener("keydown", cerrarConEsc);
  }, [abierto, onCerrar]);

  return (
    <>
      <div className={`overlay ${abierto ? "overlay--visible" : ""}`} onClick={onCerrar} />
      <aside className={`carrito ${abierto ? "carrito--abierto" : ""}`} aria-hidden={!abierto} aria-label="Carrito de compras">
        <div className="carrito__encabezado">
          <h2>Tu carrito</h2>
          <button className="btn btn--icono" onClick={onCerrar} aria-label="Cerrar carrito">✕</button>
        </div>

        {lineas.length === 0 ? (
          <p className="carrito__vacio">Aún no has agregado productos. Elige uno del catálogo.</p>
        ) : (
          <ul className="carrito__lista">
            {lineas.map((l) => (
              <li key={l.id} className="linea">
                <div className="linea__info">
                  <strong>{l.nombre}</strong>
                  <span>{formatoCOP(l.precio)} c/u</span>
                </div>
                <div className="linea__controles">
                  <button className="btn btn--icono" onClick={() => onRestar(l)} aria-label={`Restar una unidad de ${l.nombre}`}>−</button>
                  <CantidadInput
                    value={l.cantidad}
                    max={l.stock}
                    onChange={(n) => onCambiar(l.id, n)}
                    onMin={() => onMin(l)}
                    onMax={onMax}
                    label={`Cantidad de ${l.nombre} en el carrito`}
                  />
                  <button className="btn btn--icono" onClick={() => onSumar(l)} aria-label={`Sumar una unidad de ${l.nombre}`}>+</button>
                </div>
                <div className="linea__pie">
                  <span className="linea__subtotal">{formatoCOP(l.precio * l.cantidad)}</span>
                  <button className="btn btn--texto" onClick={() => onQuitar(l.id)}>Quitar</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="carrito__resumen">
          <p><span>Total de unidades</span><strong>{totalUnidades}</strong></p>
          <p className="carrito__total"><span>Total de la compra</span><strong>{formatoCOP(total)}</strong></p>
        </div>
      </aside>
    </>
  );
}
