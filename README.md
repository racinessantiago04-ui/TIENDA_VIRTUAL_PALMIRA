# Tienda Palmira – Carrito de compras con validaciones de stock

**Aprendiz:** [Escribe aquí tu nombre completo] · **Ficha:** 3409924
**Tecnología usada:** React 18 + Vite
**Repositorio público:** https://github.com/racinessantiago04-ui/TIENDA_VIRTUAL_PALMIRA

Reto práctico de React (SENA – CBI Palmira, Desarrollo Front-End con React).

## Instalar y ejecutar

```bash
git clone https://github.com/racinessantiago04-ui/TIENDA_VIRTUAL_PALMIRA.git
cd TIENDA_VIRTUAL_PALMIRA
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Funcionalidades

- Navbar fija con el nombre de la tienda a la izquierda y el ícono del carrito a la derecha, con contador de unidades (se oculta en 0).
- Catálogo desde un array JSON (`src/data/productos.js`) con nombre, precio, stock, campo de cantidad (inicia en 1) y botón **Agregar**.
- Un mismo producto nunca duplica líneas: se suman las cantidades. Sin unidades disponibles, **Agregar** se deshabilita.
- Campo de cantidad (`CantidadInput`): bloquea `e E + - . ,`, solo acepta pegar dígitos, no acepta 0 ni negativos y la rueda del mouse no cambia el valor.
- Stock máximo: se corrige al máximo y aparece el toast “Este es el máximo de producto disponible en stock” (al escribir, con el botón + y al agregar de nuevo).
- Mínimo 1: con cantidad 1, − o escribir 0 muestra un toast con botón para confirmar la eliminación. También hay botón **Quitar**.
- Subtotales, total de unidades y total de la compra en formato COP, actualizados al instante.
- Toasts propios (sin `alert()`): se cierran solos y manualmente.
- Interfaz profesional con hero, tarjetas con ilustración de cada producto (`ImagenProducto.jsx`) y miniaturas en el carrito.
- Extras: el carrito se guarda en `localStorage`, diseño responsive, foco visible y toasts anunciables por lectores de pantalla.

## Estructura

```
src/
├── App.jsx                 estado del carrito y reglas de negocio
├── data/productos.js       catálogo (array JSON)
├── utils/formato.js        formato de moneda COP
└── components/
    ├── Navbar.jsx
    ├── ProductoCard.jsx
    ├── ImagenProducto.jsx  ilustraciones SVG de los productos
    ├── CantidadInput.jsx   validaciones del campo numérico (reutilizable)
    ├── Carrito.jsx
    └── Toasts.jsx
```

## Evidencias

Guarda las capturas en la carpeta `evidencias/` y actualiza esta tabla.

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | Sí |
| 3 | Bloqueo de “e”, negativos y 0 | evidencias/03-validaciones.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-toast-maximo.png | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-minimo.png | Sí |
| 6 | Subtotales y total con varios productos | evidencias/06-totales.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | Sí |
