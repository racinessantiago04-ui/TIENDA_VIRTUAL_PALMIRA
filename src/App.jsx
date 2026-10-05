import { useCallback, useEffect, useState } from "react";
import { PRODUCTOS } from "./data/productos.js";
import Navbar from "./components/Navbar.jsx";
import ProductoCard from "./components/ProductoCard.jsx";
import Carrito from "./components/Carrito.jsx";
import Toasts from "./components/Toasts.jsx";

const CLAVE = "tienda-palmira-carrito";
const MSG_MAX = "Este es el máximo de producto disponible en stock";
const MSG_MIN_CATALOGO = "La cantidad mínima es 1.";
let contadorToast = 0;

// Carrito guardado (valor agregado), validado contra el catálogo
function cargarCarrito() {
  try {
    const data = JSON.parse(localStorage.getItem(CLAVE));
    if (!Array.isArray(data)) return [];
    return data
      .map((l) => {
        const p = PRODUCTOS.find((x) => x.id === l.id);
        return p && Number.isInteger(l.cantidad) && l.cantidad > 0
          ? { id: p.id, cantidad: Math.min(l.cantidad, p.stock) }
          : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(cargarCarrito); // [{ id, cantidad }]
  const [abierto, setAbierto] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch { /* sin almacenamiento */ }
  }, [carrito]);

  const cerrarToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const mostrarToast = useCallback((mensaje, accion) => {
    const id = ++contadorToast;
    setToasts((t) => [...t.filter((x) => x.mensaje !== mensaje), { id, mensaje, accion }]);
  }, []);

  const toastMax = useCallback(() => mostrarToast(MSG_MAX), [mostrarToast]);
  const toastMinCatalogo = useCallback(() => mostrarToast(MSG_MIN_CATALOGO), [mostrarToast]);

  const cantidadEnCarrito = (id) => carrito.find((l) => l.id === id)?.cantidad ?? 0;

  const fijarCantidad = (id, cantidad) =>
    setCarrito((c) => c.map((l) => (l.id === id ? { ...l, cantidad } : l)));

  const quitar = useCallback((id) => setCarrito((c) => c.filter((l) => l.id !== id)), []);

  // Punto 3 y 5: una sola línea por producto, nunca más que el stock
  const agregar = (id, cantidad) => {
    const producto = PRODUCTOS.find((p) => p.id === id);
    const actual = cantidadEnCarrito(id);
    const nueva = actual + cantidad;
    const final = Math.min(nueva, producto.stock);
    if (nueva > producto.stock) toastMax();
    setCarrito((c) =>
      actual > 0
        ? c.map((l) => (l.id === id ? { ...l, cantidad: final } : l))
        : [...c, { id, cantidad: final }]
    );
  };

  // Punto 6: con cantidad 1 no baja; pregunta si desea eliminar
  const pedirEliminar = (linea) =>
    mostrarToast(
      `Esta es la cantidad mínima (1). ¿Desea eliminar «${linea.nombre}» del carrito?`,
      { texto: "Sí, eliminar", fn: () => quitar(linea.id) }
    );

  const sumar = (linea) => (linea.cantidad >= linea.stock ? toastMax() : fijarCantidad(linea.id, linea.cantidad + 1));
  const restar = (linea) => (linea.cantidad <= 1 ? pedirEliminar(linea) : fijarCantidad(linea.id, linea.cantidad - 1));

  // Punto 7: totales derivados del estado
  const lineas = carrito.map((l) => ({ ...PRODUCTOS.find((p) => p.id === l.id), cantidad: l.cantidad }));
  const totalUnidades = lineas.reduce((s, l) => s + l.cantidad, 0);
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);

  return (
    <>
      <Navbar totalUnidades={totalUnidades} onAbrirCarrito={() => setAbierto(true)} />
      <main className="catalogo">
        <h2>Productos de la región</h2>
        <div className="catalogo__grilla">
          {PRODUCTOS.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              enCarrito={cantidadEnCarrito(p.id)}
              onAgregar={agregar}
              onMax={toastMax}
              onMin={toastMinCatalogo}
            />
          ))}
        </div>
      </main>
      <Carrito
        abierto={abierto}
        lineas={lineas}
        totalUnidades={totalUnidades}
        total={total}
        onCerrar={() => setAbierto(false)}
        onSumar={sumar}
        onRestar={restar}
        onCambiar={fijarCantidad}
        onMax={toastMax}
        onMin={pedirEliminar}
        onQuitar={quitar}
      />
      <Toasts toasts={toasts} onCerrar={cerrarToast} />
    </>
  );
}
