import { useEffect } from "react";

function Toast({ toast, onCerrar }) {
  const { id, mensaje, accion } = toast;

  // Desaparece solo: más tiempo si pide una decisión
  useEffect(() => {
    const t = setTimeout(() => onCerrar(id), accion ? 9000 : 4000);
    return () => clearTimeout(t);
  }, [id, accion, onCerrar]);

  return (
    <div className="toast" role={accion ? "alertdialog" : "alert"}>
      <p>{mensaje}</p>
      <div className="toast__acciones">
        {accion && (
          <button className="btn btn--toast" onClick={() => { accion.fn(); onCerrar(id); }}>
            {accion.texto}
          </button>
        )}
        <button className="btn btn--icono btn--claro" onClick={() => onCerrar(id)} aria-label="Cerrar aviso">✕</button>
      </div>
    </div>
  );
}

export default function Toasts({ toasts, onCerrar }) {
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => <Toast key={t.id} toast={t} onCerrar={onCerrar} />)}
    </div>
  );
}
