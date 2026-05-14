# BAFAR Aliados — Dashboard para Micro PyMEs

Maqueta interactiva de la app **BAFAR Aliados** diseñada para micro restauranteros (pizzerías, hamburgueserías, food trucks).

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build para producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## Estructura

```
bafar-aliados/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global styles
│   └── App.jsx           # Dashboard completo (900 líneas)
└── README.md
```

## Secciones

1. **Dashboard** — KPIs del día, gráfica semanal, caja, inventario, más vendidos
2. **Capturar día** — Registro diario de ventas, compras, gastos, publicidad y flujo de caja
3. **Bienvenido a BAFAR** — Catálogo de pedidos con marcas BAFAR, carrito y BAFAR Puntos
4. **BAFAR Academy** — Videos de entrenamiento en Cocina, Rentabilidad, Marketing y Operación
5. **Alertas inteligentes** — Alertas proactivas conectadas entre secciones

## Tecnologías

- React 18
- Vite 5
- Lucide React (iconos)

---

*Diseñado por Profit Solutions · profitsolutions.mx*
