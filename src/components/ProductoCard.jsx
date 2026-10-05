import { useState } from "react";
import CantidadInput from "./CantidadInput.jsx";
import ImagenProducto from "./ImagenProducto.jsx";
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
    <article className={`producto ${agotado ? "producto--agotado" : ""}`}>
      <ImagenProducto id={producto.id} nombre={producto.nombre} />
      <div className="producto__cuerpo">
        <h3>{producto.nombre}</h3>
        <div className="producto__datos">
          <p className="producto__precio">{formatoCOP(producto.precio)}</p>
          <span className={`producto__stock ${agotado ? "producto__stock--agotado" : disponibles <= 3 ? "producto__stock--bajo" : ""}`}>
            {agotado ? "Sin unidades disponibles" : `Stock disponible: ${disponibles}`}
          </span>
        </div>
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
      </div>
    </article>
  );
}
