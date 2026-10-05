import { useState } from "react";
import CantidadInput from "./CantidadInput.jsx";
import { formatoCOP } from "../utils/formato.js";

export default function ProductoCard({ producto, enCarrito, onAgregar, onMax, onMin }) {
  const [cantidad, setCantidad] = useState(1);
  const disponibles = producto.stock - enCarrito;
  const agotado = disponibles <= 0;

  const agregar = () => {
    onAgregar(producto.id, cantidad);
    setCantidad(1);
  };

  return (
    <article className="producto">
      <h3>{producto.nombre}</h3>
      <p className="producto__precio">{formatoCOP(producto.precio)}</p>
      <p className={`producto__stock ${agotado ? "producto__stock--agotado" : ""}`}>
        {agotado ? "Sin unidades disponibles" : `Stock disponible: ${disponibles}`}
      </p>
      <div className="producto__acciones">
        <CantidadInput
          value={cantidad}
          max={producto.stock}
          onChange={setCantidad}
          onMin={onMin}
          onMax={onMax}
          disabled={agotado}
          label={`Cantidad de ${producto.nombre}`}
        />
        <button className="btn btn--primario" onClick={agregar} disabled={agotado}>
          Agregar
        </button>
      </div>
    </article>
  );
}
