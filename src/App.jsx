import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  TrendingUp, TrendingDown, ShoppingCart, Play, Home,
  Package, GraduationCap, AlertCircle, Plus, Minus, Check, X,
  DollarSign, Wallet, Boxes, Award, Clock, Users, Search,
  Filter, ChevronRight, Flame, Target, BookOpen, Zap,
  ClipboardList, Receipt, ArrowDownCircle, ArrowUpCircle, Save
} from 'lucide-react';

// ============================================
// BAFAR ALIADOS — Dashboard Maqueta Interactiva
// Diseñado para micro pymes (pizzerías, hamburgueserías, food trucks)
// ============================================

const BRAND = {
  red: '#c8102e',
  redDark: '#8b0a1f',
  redLight: '#fce8ec',
  ink: '#1a1a1a',
  paper: '#fafaf7',
  cream: '#f5f1e8',
  border: '#e8e4d9',
  muted: '#6b6862',
  green: '#0f6e56',
  amber: '#b8860b',
};

const PRODUCTOS = [
  { id: 1, marca: 'BAFAR Carnes', nombre: 'Carne molida de res', presentacion: 'Caja 10 kg', precio: 1580, color: '#fce8ec', textColor: '#8b0a1f' },
  { id: 2, marca: 'BAFAR Carnes', nombre: 'Arrachera marinada', presentacion: 'Pieza 5 kg', precio: 1890, color: '#fce8ec', textColor: '#8b0a1f' },
  { id: 3, marca: 'BURR', nombre: 'Jamón de pavo', presentacion: 'Pieza 4 kg', precio: 680, color: '#fef3d4', textColor: '#7a5a05' },
  { id: 4, marca: 'BURR', nombre: 'Salchicha coctel', presentacion: 'Caja 3 kg', precio: 420, color: '#fef3d4', textColor: '#7a5a05' },
  { id: 5, marca: 'SABORI', nombre: 'Queso manchego', presentacion: 'Bloque 3 kg', precio: 890, color: '#fff4e6', textColor: '#8b4513' },
  { id: 6, marca: 'SABORI', nombre: 'Queso mozzarella rallado', presentacion: 'Bolsa 2.5 kg', precio: 740, color: '#fff4e6', textColor: '#8b4513' },
  { id: 7, marca: 'LA CHONA', nombre: 'Salchicha tipo viena', presentacion: 'Caja 5 kg', precio: 520, color: '#e8f5e0', textColor: '#2d5a0e' },
  { id: 8, marca: 'CAPERUCITA', nombre: 'Tocino ahumado', presentacion: 'Paquete 2.5 kg', precio: 740, color: '#fce8ec', textColor: '#8b0a1f' },
  { id: 9, marca: 'MONTECILLO', nombre: 'Pechuga de pollo', presentacion: 'Caja 8 kg', precio: 1120, color: '#e0f2ec', textColor: '#0a4a36' },
  { id: 10, marca: 'MONTECILLO', nombre: 'Alitas de pollo', presentacion: 'Caja 6 kg', precio: 980, color: '#e0f2ec', textColor: '#0a4a36' },
  { id: 11, marca: 'BAFAR Carnes', nombre: 'Hamburguesa de res 150g', presentacion: 'Caja 30 pzs', precio: 1340, color: '#fce8ec', textColor: '#8b0a1f' },
  { id: 12, marca: 'BURR', nombre: 'Pepperoni rebanado', presentacion: 'Bolsa 1 kg', precio: 380, color: '#fef3d4', textColor: '#7a5a05' },
];

const VIDEOS = [
  { id: 1, titulo: 'Cómo hacer la hamburguesa perfecta', categoria: 'COCINA', duracion: '12:40', vistas: 1840, autor: 'Chef Roberto Méndez', color: '#fce8ec', textColor: '#8b0a1f', nivel: 'Básico' },
  { id: 2, titulo: 'Aprende a calcular la merma en tu restaurante', categoria: 'RENTABILIDAD', duracion: '18:15', vistas: 2310, autor: 'Profit Solutions', color: '#e8eef9', textColor: '#0a3470', nivel: 'Intermedio' },
  { id: 3, titulo: 'Las 10 reglas para hacer un gran marketing local', categoria: 'MARKETING', duracion: '9:50', vistas: 1620, autor: 'Marisol Vega', color: '#fef3d4', textColor: '#7a5a05', nivel: 'Básico' },
  { id: 4, titulo: 'Manejo de inventarios sin Excel', categoria: 'OPERACIÓN', duracion: '14:20', vistas: 980, autor: 'Ing. Castillo', color: '#e8f5e0', textColor: '#2d5a0e', nivel: 'Intermedio' },
  { id: 5, titulo: 'Pizza estilo Nueva York paso a paso', categoria: 'COCINA', duracion: '11:05', vistas: 2540, autor: 'Chef Lucía Hernández', color: '#fce8ec', textColor: '#8b0a1f', nivel: 'Intermedio' },
  { id: 6, titulo: 'Cómo fijar tus precios de menú', categoria: 'RENTABILIDAD', duracion: '22:30', vistas: 1290, autor: 'Profit Solutions', color: '#e8eef9', textColor: '#0a3470', nivel: 'Avanzado' },
  { id: 7, titulo: 'Redes sociales para tu food truck', categoria: 'MARKETING', duracion: '15:45', vistas: 1980, autor: 'Marisol Vega', color: '#fef3d4', textColor: '#7a5a05', nivel: 'Básico' },
  { id: 8, titulo: 'Costeo de recetas en 5 minutos', categoria: 'RENTABILIDAD', duracion: '8:20', vistas: 3120, autor: 'Profit Solutions', color: '#e8eef9', textColor: '#0a3470', nivel: 'Básico' },
  { id: 9, titulo: 'Higiene en cocina: lo que SÍ importa', categoria: 'OPERACIÓN', duracion: '13:10', vistas: 1450, autor: 'Dra. Patricia Ruiz', color: '#e8f5e0', textColor: '#2d5a0e', nivel: 'Básico' },
  { id: 10, titulo: 'Cómo armar tu menú de alitas ganador', categoria: 'COCINA', duracion: '16:30', vistas: 2150, autor: 'Chef Roberto Méndez', color: '#fce8ec', textColor: '#8b0a1f', nivel: 'Básico' },
  { id: 11, titulo: 'Punto de equilibrio: ¿cuánto necesitas vender?', categoria: 'RENTABILIDAD', duracion: '19:40', vistas: 1870, autor: 'Profit Solutions', color: '#e8eef9', textColor: '#0a3470', nivel: 'Intermedio' },
  { id: 12, titulo: 'WhatsApp Business para pedidos a domicilio', categoria: 'MARKETING', duracion: '10:25', vistas: 2680, autor: 'Marisol Vega', color: '#fef3d4', textColor: '#7a5a05', nivel: 'Básico' },
  { id: 13, titulo: 'Control de mermas y caducidades', categoria: 'OPERACIÓN', duracion: '17:50', vistas: 1320, autor: 'Ing. Castillo', color: '#e8f5e0', textColor: '#2d5a0e', nivel: 'Intermedio' },
  { id: 14, titulo: 'Salsas y aderezos que enamoran al cliente', categoria: 'COCINA', duracion: '14:15', vistas: 2960, autor: 'Chef Lucía Hernández', color: '#fce8ec', textColor: '#8b0a1f', nivel: 'Básico' },
  { id: 15, titulo: 'Negociar con proveedores sin perder calidad', categoria: 'RENTABILIDAD', duracion: '21:05', vistas: 1490, autor: 'Profit Solutions', color: '#e8eef9', textColor: '#0a3470', nivel: 'Avanzado' },
];

const VENTAS_SEMANA = [
  { dia: 'Lun', monto: 5800 },
  { dia: 'Mar', monto: 7200 },
  { dia: 'Mié', monto: 6900 },
  { dia: 'Jue', monto: 8100 },
  { dia: 'Vie', monto: 11400 },
  { dia: 'Sáb', monto: 13200 },
  { dia: 'Dom', monto: 8420 },
];

export default function BafarAliadosDashboard() {
  const [tab, setTab] = useState('negocio');
  const [cart, setCart] = useState({});
  const [puntos, setPuntos] = useState(2840);
  const [filtroVideo, setFiltroVideo] = useState('TODOS');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showSerieModal, setShowSerieModal] = useState(false);
  const [showModeloModal, setShowModeloModal] = useState(false);
  const [showAcademyModal, setShowAcademyModal] = useState(false);

  const SERIE_ARQUITECTO = [
    { id: 'a1', titulo: 'Introducción: construye tu propio destino', duracion: '14:30', autor: 'BAFAR Academy', nivel: 'Introducción' },
  ];

  const SERIE_MODELO = [
    { id: 'm1', titulo: 'Fundamentos del Modelo de Gestión BAFAR', duracion: '12:20', autor: 'BAFAR Academy', nivel: 'Episodio 1' },
    { id: 'm2', titulo: 'Cómo definir la propuesta de valor de tu negocio', duracion: '15:40', autor: 'Consultoría AXON', nivel: 'Episodio 2' },
    { id: 'm3', titulo: 'Estructura organizacional simple para micro pymes', duracion: '17:10', autor: 'Profit Solutions', nivel: 'Episodio 3' },
    { id: 'm4', titulo: 'Procesos clave de tu operación diaria', duracion: '19:30', autor: 'Consultoría AXON', nivel: 'Episodio 4' },
    { id: 'm5', titulo: 'KPIs que sí importan en tu negocio', duracion: '14:55', autor: 'Profit Solutions', nivel: 'Episodio 5' },
    { id: 'm6', titulo: 'Gestión financiera para dueños', duracion: '21:15', autor: 'Profit Solutions', nivel: 'Episodio 6' },
    { id: 'm7', titulo: 'Control de inventarios y costos', duracion: '16:45', autor: 'Consultoría AXON', nivel: 'Episodio 7' },
    { id: 'm8', titulo: 'Cultura y liderazgo de equipo', duracion: '18:20', autor: 'BAFAR Academy', nivel: 'Episodio 8' },
    { id: 'm9', titulo: 'Mejora continua y escalamiento del negocio', duracion: '23:05', autor: 'Consultoría AXON', nivel: 'Episodio 9' },
  ];

  // Captura del día
  const [ventasCat, setVentasCat] = useState([
    { id: 1, label: 'Hamburguesas', costo: 35, precio: 80, monto: 3200 },
    { id: 2, label: 'Hot dogs', costo: 15, precio: 40, monto: 980 },
    { id: 3, label: 'Pizzas', costo: 50, precio: 150, monto: 2640 },
    { id: 4, label: 'Boneless / alitas', costo: 40, precio: 110, monto: 1100 },
    { id: 5, label: 'Bebidas', costo: 8, precio: 25, monto: 500 },
  ]);
  const [comprasBafar, setComprasBafar] = useState(1850);
  const [comprasOtros, setComprasOtros] = useState(1330);
  const [gastosFijos, setGastosFijos] = useState([
    { id: 1, label: 'Renta', monto: 400 },
    { id: 2, label: 'Luz', monto: 280 },
    { id: 3, label: 'Teléfono / internet', monto: 120 },
    { id: 4, label: 'Sueldos', monto: 380 },
    { id: 5, label: 'Otros gastos', monto: 60 },
    { id: 6, label: 'Publicidad y mercadotecnia', monto: 180 },
  ]);
  const [cajaInicial, setCajaInicial] = useState(1500);
  const [retiros, setRetiros] = useState(2000);
  const [captureSaved, setCaptureSaved] = useState(false);

  // Modales para alta de producto / gasto
  const [showProdModal, setShowProdModal] = useState(false);
  const [showGastoModal, setShowGastoModal] = useState(false);
  const [newProd, setNewProd] = useState({ label: '', costo: 0, precio: 0 });
  const [newGasto, setNewGasto] = useState({ label: '', monto: 0 });

  // Inventario
  const [inventario, setInventario] = useState([
    // BAFAR
    { id: 1, nombre: 'Carne molida de res 150g', marca: 'BAFAR Carnes', categoria: 'Carnes', unidad: 'piezas', stock: 18, minStock: 10, esBafar: true },
    { id: 2, nombre: 'Hamburguesa de res 150g', marca: 'BAFAR Carnes', categoria: 'Carnes', unidad: 'piezas', stock: 35, minStock: 20, esBafar: true },
    { id: 3, nombre: 'Salchicha tipo viena', marca: 'LA CHONA', categoria: 'Carnes', unidad: 'piezas', stock: 24, minStock: 15, esBafar: true },
    { id: 4, nombre: 'Queso manchego', marca: 'SABORI', categoria: 'Lácteos', unidad: 'bloques', stock: 5, minStock: 6, esBafar: true },
    { id: 5, nombre: 'Tocino ahumado', marca: 'CAPERUCITA', categoria: 'Carnes', unidad: 'paquetes', stock: 4, minStock: 6, esBafar: true },
    { id: 6, nombre: 'Alitas de pollo', marca: 'MONTECILLO', categoria: 'Carnes', unidad: 'cajas', stock: 22, minStock: 10, esBafar: true },
    { id: 7, nombre: 'Jamón de pavo', marca: 'BURR', categoria: 'Carnes', unidad: 'piezas', stock: 9, minStock: 6, esBafar: true },
    { id: 8, nombre: 'Queso mozzarella rallado', marca: 'SABORI', categoria: 'Lácteos', unidad: 'bolsas', stock: 12, minStock: 6, esBafar: true },
    // Pan y vegetales
    { id: 9, nombre: 'Pan para hamburguesa', marca: 'Local', categoria: 'Pan', unidad: 'piezas', stock: 48, minStock: 30, esBafar: false, esCarneMart: true },
    { id: 10, nombre: 'Pan para hot dog', marca: 'Local', categoria: 'Pan', unidad: 'piezas', stock: 22, minStock: 25, esBafar: false, esCarneMart: true },
    { id: 11, nombre: 'Lechuga romana', marca: 'Mercado', categoria: 'Verduras', unidad: 'piezas', stock: 6, minStock: 8, esBafar: false, esCarneMart: true },
    { id: 12, nombre: 'Jitomate bola', marca: 'Mercado', categoria: 'Verduras', unidad: 'kilos', stock: 14, minStock: 10, esBafar: false, esCarneMart: true },
    { id: 13, nombre: 'Cebolla blanca', marca: 'Mercado', categoria: 'Verduras', unidad: 'kilos', stock: 18, minStock: 10, esBafar: false },
    // Salsas
    { id: 14, nombre: 'Catsup 1 L', marca: 'McCormick', categoria: 'Salsas', unidad: 'botes', stock: 7, minStock: 4, esBafar: false, esCarneMart: true },
    { id: 15, nombre: 'Salsa BBQ 500 ml', marca: 'McCormick', categoria: 'Salsas', unidad: 'botes', stock: 3, minStock: 4, esBafar: false },
    // Refrescos
    { id: 16, nombre: 'Coca-Cola 600 ml', marca: 'Coca-Cola', categoria: 'Refrescos', unidad: 'piezas', stock: 48, minStock: 24, esBafar: false, esCarneMart: true },
    { id: 17, nombre: 'Sidral Mundet 600 ml', marca: 'Mundet', categoria: 'Refrescos', unidad: 'piezas', stock: 14, minStock: 12, esBafar: false },
    { id: 18, nombre: 'Jarritos tamarindo 500 ml', marca: 'Jarritos', categoria: 'Refrescos', unidad: 'piezas', stock: 28, minStock: 18, esBafar: false },
    { id: 19, nombre: 'Sangría Señorial 355 ml', marca: 'Señorial', categoria: 'Refrescos', unidad: 'piezas', stock: 9, minStock: 12, esBafar: false },
    // Cervezas
    { id: 20, nombre: 'Corona Extra 355 ml', marca: 'Corona', categoria: 'Cervezas', unidad: 'piezas', stock: 60, minStock: 24, esBafar: false },
    { id: 21, nombre: 'Modelo Especial 355 ml', marca: 'Modelo', categoria: 'Cervezas', unidad: 'piezas', stock: 26, minStock: 24, esBafar: false },
    { id: 22, nombre: 'Tecate 355 ml', marca: 'Tecate', categoria: 'Cervezas', unidad: 'piezas', stock: 15, minStock: 20, esBafar: false },
    { id: 23, nombre: 'Victoria 355 ml', marca: 'Victoria', categoria: 'Cervezas', unidad: 'piezas', stock: 22, minStock: 12, esBafar: false },
  ]);
  const [filtroInv, setFiltroInv] = useState('TODOS');
  const [showInvModal, setShowInvModal] = useState(false);
  const [newInvItem, setNewInvItem] = useState({ nombre: '', marca: '', categoria: 'Carnes', unidad: 'piezas', stock: 0, minStock: 0, esBafar: false });

  const getInvStatus = (item) => {
    if (item.stock <= item.minStock) return 'rojo';
    if (item.stock <= item.minStock * 2) return 'amarillo';
    return 'verde';
  };
  const invRojo = inventario.filter(i => getInvStatus(i) === 'rojo');
  const invAmarillo = inventario.filter(i => getInvStatus(i) === 'amarillo');
  const invVerde = inventario.filter(i => getInvStatus(i) === 'verde');
  const inventarioFiltrado = filtroInv === 'TODOS' ? inventario
    : filtroInv === 'BAFAR' ? inventario.filter(i => i.esBafar)
    : ['verde', 'amarillo', 'rojo'].includes(filtroInv) ? inventario.filter(i => getInvStatus(i) === filtroInv)
    : inventario.filter(i => i.categoria === filtroInv);

  const totalVentasCap = ventasCat.reduce((a, v) => a + v.monto, 0);
  const totalCostosCap = comprasBafar + comprasOtros;
  const totalGastosCap = gastosFijos.reduce((a, g) => a + g.monto, 0);
  const utilidadCap = totalVentasCap - totalCostosCap - totalGastosCap;
  const margenCap = totalVentasCap > 0 ? ((utilidadCap / totalVentasCap) * 100).toFixed(1) : '0.0';
  const flujoCajaCap = cajaInicial + totalVentasCap - totalGastosCap - retiros;

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const prod = PRODUCTOS.find(p => p.id === parseInt(id));
      return { ...prod, qty };
    }).filter(i => i.qty > 0);
  }, [cart]);

  const cartTotal = cartItems.reduce((s, i) => s + i.precio * i.qty, 0);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const puntosGanados = Math.round(cartTotal / 10);

  const addToCart = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart(c => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));

  const confirmOrder = () => {
    if (cartCount === 0) return;
    setPuntos(p => p + puntosGanados);
    setCart({});
    setOrderConfirmed(true);
    setTimeout(() => setOrderConfirmed(false), 2500);
  };

  const videosFiltrados = filtroVideo === 'TODOS' ? VIDEOS : VIDEOS.filter(v => v.categoria === filtroVideo);

  const ventasHoy = 8420;
  const ventasAyer = 7520;
  const variacion = ((ventasHoy - ventasAyer) / ventasAyer * 100).toFixed(1);
  const costos = 3180;
  const gastos = 1240;
  const maxVenta = Math.max(...VENTAS_SEMANA.map(v => v.monto));

  return (
    <div style={{ fontFamily: '"Inter", -apple-system, system-ui, sans-serif', background: BRAND.paper, minHeight: '100vh', color: BRAND.ink }}>
      <style>{`
        * { box-sizing: border-box; }
        .bf-card { background: white; border: 1px solid ${BRAND.border}; border-radius: 14px; }
        .bf-tab-active { color: ${BRAND.ink} !important; border-bottom: 2px solid ${BRAND.red} !important; font-weight: 600 !important; }
        .bf-btn-primary { background: ${BRAND.red}; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 13px; transition: all 0.15s; }
        .bf-btn-primary:hover { background: ${BRAND.redDark}; }
        .bf-btn-primary:disabled { background: #ccc; cursor: not-allowed; }
        .bf-pill { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: 600; letter-spacing: 0.3px; }
        .bf-anim-fade { animation: fade 0.3s ease; }
        @keyframes fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HEADER */}
      <header style={{ background: BRAND.red, padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ height: 42, background: 'white', borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/bafar%20LOGO.png" alt="BAFAR" style={{ height: 30, display: 'block' }} />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 16, letterSpacing: '-0.2px' }}>BAFAR Aliados</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>Pizzería Don Memo · Chihuahua, Chih.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: 'rgba(255,255,255,0.18)', padding: '8px 14px', borderRadius: 24, color: 'white', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={14} />
            {puntos.toLocaleString('es-MX')} pts
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: 13 }}>GM</div>
        </div>
      </header>

      {/* TABS */}
      <nav style={{ background: 'white', borderBottom: `1px solid ${BRAND.border}`, padding: '0 28px', display: 'flex', gap: 4 }}>
        {[
          { id: 'negocio', label: 'Tablero de Control', icon: Home },
          { id: 'capturar', label: 'Capturar día', icon: ClipboardList },
          { id: 'inventario', label: 'Mis Inventarios', icon: Boxes },
          { id: 'pedidos', label: 'Bienvenido a BAFAR', icon: ShoppingCart },
          { id: 'academy', label: 'BAFAR Academy', icon: GraduationCap },
        ].map(t => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={active ? 'bf-tab-active' : ''}
              style={{
                background: 'transparent', border: 'none', padding: '16px 18px',
                fontSize: 13, color: BRAND.muted, fontWeight: 500,
                borderBottom: '2px solid transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit'
              }}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </nav>

      <main style={{ padding: '28px', maxWidth: 1280, margin: '0 auto' }}>

        {/* ============================================ */}
        {/* TAB 1: MI NEGOCIO                              */}
        {/* ============================================ */}
        {tab === 'negocio' && (
          <div className="bf-anim-fade">
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Lunes 6 de abril, 2026</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Resumen del día</h1>
            </div>

            {/* KPI CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
              <div className="bf-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <DollarSign size={18} color={BRAND.muted} />
                  <span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUp size={12} /> +{variacion}%
                  </span>
                </div>
                <div style={{ fontSize: 12, color: BRAND.muted }}>Ventas</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>${ventasHoy.toLocaleString('es-MX')}</div>
                <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>vs ${ventasAyer.toLocaleString('es-MX')} ayer</div>
              </div>

              <div className="bf-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Package size={18} color={BRAND.muted} />
                  <span style={{ fontSize: 11, color: BRAND.muted, fontWeight: 600 }}>{((costos/ventasHoy)*100).toFixed(1)}%</span>
                </div>
                <div style={{ fontSize: 12, color: BRAND.muted }}>Costo</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>${costos.toLocaleString('es-MX')}</div>
                <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>insumos consumidos</div>
              </div>

              <div className="bf-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Wallet size={18} color={BRAND.muted} />
                  <span style={{ fontSize: 11, color: BRAND.muted, fontWeight: 600 }}>{((gastos/ventasHoy)*100).toFixed(1)}%</span>
                </div>
                <div style={{ fontSize: 12, color: BRAND.muted }}>Gastos</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>${gastos.toLocaleString('es-MX')}</div>
                <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>renta, sueldos, luz</div>
              </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* GRÁFICA SEMANA */}
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Ventas de la semana</div>
                    <div style={{ fontSize: 12, color: BRAND.muted }}>Total: ${VENTAS_SEMANA.reduce((s,v)=>s+v.monto,0).toLocaleString('es-MX')}</div>
                  </div>
                  <span className="bf-pill" style={{ background: BRAND.cream, color: BRAND.amber }}>ÚLTIMOS 7 DÍAS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, paddingBottom: 24, position: 'relative' }}>
                  {VENTAS_SEMANA.map((v, i) => {
                    const altura = (v.monto / maxVenta) * 100;
                    const isToday = i === VENTAS_SEMANA.length - 1;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -18, fontSize: 10, fontWeight: 600, color: BRAND.muted }}>${v.monto.toLocaleString('es-MX')}</div>
                        <div style={{
                          width: '100%', height: `${altura}%`,
                          background: isToday ? BRAND.red : BRAND.cream,
                          borderRadius: '8px 8px 0 0',
                          border: isToday ? 'none' : `1px solid ${BRAND.border}`,
                          transition: 'all 0.3s'
                        }} />
                        <div style={{ position: 'absolute', bottom: -22, fontSize: 11, color: BRAND.muted, fontWeight: isToday ? 700 : 500 }}>{v.dia}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CAJA */}
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Caja del día</div>
                  <Wallet size={16} color={BRAND.muted} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: `1px solid ${BRAND.border}` }}>
                    <span style={{ color: BRAND.muted }}>Apertura</span>
                    <span style={{ fontWeight: 600 }}>$1,500</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>Ingresos del día</span>
                    <span style={{ fontWeight: 600, color: BRAND.green }}>+$8,420</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>Gastos pagados</span>
                    <span style={{ fontWeight: 600, color: BRAND.red }}>−$1,240</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>Retiros del dueño</span>
                    <span style={{ fontWeight: 600, color: BRAND.red }}>−$2,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, paddingTop: 12, borderTop: `2px solid ${BRAND.ink}`, marginTop: 4 }}>
                    <span style={{ fontWeight: 700 }}>Saldo en caja</span>
                    <span style={{ fontWeight: 700 }}>$6,680</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INVENTARIO Y TOP PRODUCTOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Inventario clave</div>
                  <Boxes size={16} color={BRAND.muted} />
                </div>
                {[
                  { nombre: 'Carne molida BAFAR', stock: '2 kg', max: 12, actual: 2, alerta: true },
                  { nombre: 'Queso Sabori manchego', stock: '5.4 kg', max: 12, actual: 5.4, alerta: false },
                  { nombre: 'Jamón Burr de pavo', stock: '8 pzs', max: 12, actual: 8, alerta: false },
                  { nombre: 'Pollo Montecillo', stock: '6 kg', max: 16, actual: 6, alerta: false },
                ].map((item, i) => {
                  const pct = (item.actual / item.max) * 100;
                  return (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span style={{ fontWeight: 500 }}>{item.nombre}</span>
                        <span style={{ color: item.alerta ? BRAND.red : BRAND.muted, fontWeight: 600 }}>{item.stock}</span>
                      </div>
                      <div style={{ background: BRAND.cream, height: 6, borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: item.alerta ? BRAND.red : BRAND.green, borderRadius: 4, transition: 'width 0.3s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Los 5 más vendidos hoy</div>
                  <Flame size={16} color={BRAND.red} />
                </div>
                {[
                  { nombre: 'Hamburguesa clásica', cant: 24, monto: 2880 },
                  { nombre: 'Pizza pepperoni grande', cant: 18, monto: 3240 },
                  { nombre: 'Boneless BBQ', cant: 12, monto: 1440 },
                  { nombre: 'Hot dog jumbo', cant: 9, monto: 540 },
                  { nombre: 'Alitas búfalo', cant: 7, monto: 770 },
                ].map((item, i, arr) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BRAND.border}` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: BRAND.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: BRAND.amber }}>{i+1}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{item.nombre}</div>
                        <div style={{ fontSize: 11, color: BRAND.muted }}>{item.cant} unidades</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>${item.monto.toLocaleString('es-MX')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* TAB 1.5: CAPTURAR DÍA                           */}
        {/* ============================================ */}
        {tab === 'capturar' && (
          <div className="bf-anim-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Lunes 6 de abril, 2026</div>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Capturar día</h1>
                <p style={{ fontSize: 13, color: BRAND.muted, margin: '4px 0 0' }}>Registra los movimientos de hoy. Esto alimenta tu tablero automáticamente.</p>
              </div>
              <button
                className="bf-btn-primary"
                onClick={() => { setCaptureSaved(true); setTimeout(() => setCaptureSaved(false), 2500); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {captureSaved ? <><Check size={14} /> Guardado</> : <><Save size={14} /> Guardar día</>}
              </button>
            </div>

            {/* RESUMEN EN VIVO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
              <div className="bf-card" style={{ padding: 16, background: '#e8f5ee', border: 'none' }}>
                <div style={{ fontSize: 11, color: BRAND.green, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Ventas totales</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: BRAND.green, letterSpacing: '-0.5px', marginTop: 4 }}>${totalVentasCap.toLocaleString('es-MX')}</div>
              </div>
              <div className="bf-card" style={{ padding: 16, background: '#fff5f5', border: 'none' }}>
                <div style={{ fontSize: 11, color: BRAND.red, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Costos + gastos</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: BRAND.red, letterSpacing: '-0.5px', marginTop: 4 }}>${(totalCostosCap + totalGastosCap).toLocaleString('es-MX')}</div>
              </div>
              <div className="bf-card" style={{ padding: 16, background: BRAND.cream, border: 'none' }}>
                <div style={{ fontSize: 11, color: BRAND.amber, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Margen</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: BRAND.amber, letterSpacing: '-0.5px', marginTop: 4 }}>{margenCap}%</div>
              </div>
              <div className="bf-card" style={{ padding: 16, background: BRAND.ink, border: 'none' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Utilidad del día</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: '-0.5px', marginTop: 4 }}>${utilidadCap.toLocaleString('es-MX')}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

              {/* VENTAS POR CATEGORÍA */}
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpCircle size={16} color={BRAND.green} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Ventas por categoría</div>
                  </div>
                  <button
                    onClick={() => { setNewProd({ label: '', costo: 0, precio: 0 }); setShowProdModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.cream, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: BRAND.ink, fontFamily: 'inherit' }}
                  >
                    <Plus size={12} /> Nuevo producto
                  </button>
                </div>
                <p style={{ fontSize: 12, color: BRAND.muted, margin: '0 0 16px 40px' }}>¿Cuánto vendiste hoy de cada cosa?</p>

                {ventasCat.map((item, i) => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: i < ventasCat.length - 1 ? `1px solid ${BRAND.border}` : 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={item.monto.toLocaleString('es-MX')}
                        onChange={e => {
                          const v = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                          setVentasCat(ventasCat.map(p => p.id === item.id ? { ...p, monto: v } : p));
                        }}
                        style={{ width: 80, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, textAlign: 'right', outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                      />
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: `2px solid ${BRAND.ink}` }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Total ventas</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.green }}>${totalVentasCap.toLocaleString('es-MX')}</span>
                </div>
              </div>

              {/* COMPRAS DE INSUMOS */}
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={16} color={BRAND.red} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Compras de insumos</div>
                </div>
                <p style={{ fontSize: 12, color: BRAND.muted, margin: '0 0 16px 40px' }}>¿En qué gastaste para producir?</p>

                <div style={{ background: BRAND.cream, borderRadius: 10, padding: 14, marginBottom: 12, border: `1px solid ${BRAND.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.red }}>Compras BAFAR</div>
                      <div style={{ fontSize: 11, color: BRAND.muted }}>Carne, jamón, queso, pollo</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '6px 12px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={comprasBafar.toLocaleString('es-MX')}
                        onChange={e => setComprasBafar(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                        style={{ width: 90, border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, textAlign: 'right', outline: 'none', fontFamily: 'inherit', color: BRAND.red }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ background: BRAND.paper, borderRadius: 10, padding: 14, border: `1px solid ${BRAND.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>Otros insumos</div>
                      <div style={{ fontSize: 11, color: BRAND.muted }}>Pan, verduras, salsas, empaque</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '6px 12px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={comprasOtros.toLocaleString('es-MX')}
                        onChange={e => setComprasOtros(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                        style={{ width: 90, border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, textAlign: 'right', outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, paddingTop: 14, borderTop: `2px solid ${BRAND.ink}` }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Total costos</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.red }}>${totalCostosCap.toLocaleString('es-MX')}</span>
                </div>
                <div style={{ marginTop: 12, padding: '10px 12px', background: '#fff5f5', borderRadius: 8, fontSize: 11, color: BRAND.red, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Target size={12} />
                  Tu costo representa {((totalCostosCap / Math.max(totalVentasCap, 1)) * 100).toFixed(1)}% de tus ventas
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

              {/* GASTOS FIJOS */}
              <div className="bf-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff9eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Receipt size={16} color={BRAND.amber} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Gastos del día</div>
                  </div>
                  <button
                    onClick={() => { setNewGasto({ label: '', monto: 0 }); setShowGastoModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.cream, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: BRAND.ink, fontFamily: 'inherit' }}
                  >
                    <Plus size={12} /> Nuevo gasto
                  </button>
                </div>
                <p style={{ fontSize: 12, color: BRAND.muted, margin: '0 0 16px 40px' }}>Renta, luz, sueldos, publicidad y demás</p>

                {gastosFijos.map((item, i) => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', padding: '9px 0', borderBottom: i < gastosFijos.length - 1 ? `1px solid ${BRAND.border}` : 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={item.monto.toLocaleString('es-MX')}
                        onChange={e => {
                          const v = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                          setGastosFijos(gastosFijos.map(g => g.id === item.id ? { ...g, monto: v } : g));
                        }}
                        style={{ width: 80, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, textAlign: 'right', outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                      />
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: `2px solid ${BRAND.ink}` }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Total gastos fijos</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.amber }}>${totalGastosCap.toLocaleString('es-MX')}</span>
                </div>
              </div>

              {/* FLUJO DE CAJA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div className="bf-card" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Wallet size={16} color={BRAND.green} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Flujo de caja del día</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', padding: '8px 0', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>Caja inicial</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input type="text" inputMode="numeric" value={cajaInicial.toLocaleString('es-MX')} onChange={e => setCajaInicial(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                        style={{ width: 80, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, textAlign: 'right', outline: 'none', fontFamily: 'inherit' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>+ Ingresos del día</span>
                    <span style={{ fontWeight: 700, color: BRAND.green }}>+${totalVentasCap.toLocaleString('es-MX')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>− Gastos pagados</span>
                    <span style={{ fontWeight: 700, color: BRAND.red }}>−${totalGastosCap.toLocaleString('es-MX')}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', padding: '8px 0', fontSize: 13 }}>
                    <span style={{ color: BRAND.muted }}>− Retiro del dueño</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ fontSize: 12, color: BRAND.muted }}>$</span>
                      <input type="text" inputMode="numeric" value={retiros.toLocaleString('es-MX')} onChange={e => setRetiros(parseInt(e.target.value.replace(/\D/g, '')) || 0)}
                        style={{ width: 80, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, textAlign: 'right', outline: 'none', fontFamily: 'inherit', color: BRAND.red }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 14, borderTop: `2px solid ${BRAND.ink}` }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Saldo final en caja</span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: flujoCajaCap >= 0 ? BRAND.green : BRAND.red, letterSpacing: '-0.5px' }}>${flujoCajaCap.toLocaleString('es-MX')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AYUDA / TIP */}
            <div style={{ marginTop: 8, padding: 18, background: BRAND.cream, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${BRAND.border}` }}>
              <div style={{ width: 40, height: 40, background: BRAND.red, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={18} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Captura cada noche al cerrar tu negocio</div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>2 minutos al día son suficientes. Tu tablero, tus alertas y tus puntos BAFAR se actualizan automáticamente con esta información.</div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================ */}
        {/* TAB 1.7: MIS INVENTARIOS                       */}
        {/* ============================================ */}
        {tab === 'inventario' && (
          <div className="bf-anim-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Tu almacén en tiempo real</div>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Mis Inventarios</h1>
                <p style={{ fontSize: 13, color: BRAND.muted, margin: '4px 0 0' }}>Lo que tienes hoy en piezas. Cuando algo baje del mínimo, lo marcamos en rojo.</p>
              </div>
              <button
                className="bf-btn-primary"
                onClick={() => { setNewInvItem({ nombre: '', marca: '', categoria: 'Carnes', unidad: 'piezas', stock: 0, minStock: 0, esBafar: false }); setShowInvModal(true); }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Plus size={14} /> Agregar producto
              </button>
            </div>

            {/* RESUMEN SEMÁFORO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
              <button onClick={() => setFiltroInv('TODOS')} className="bf-card" style={{ padding: 16, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', outline: filtroInv === 'TODOS' ? `2px solid ${BRAND.ink}` : 'none', outlineOffset: -2, transition: 'outline 0.15s' }}>
                <div style={{ fontSize: 11, color: BRAND.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Productos en inventario</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 4, color: BRAND.ink }}>{inventario.length}</div>
              </button>
              <button onClick={() => setFiltroInv('verde')} className="bf-card" style={{ padding: 16, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', background: '#e8f5ee', border: 'none', outline: filtroInv === 'verde' ? `2px solid ${BRAND.green}` : 'none', outlineOffset: -2, transition: 'outline 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.green, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: BRAND.green, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Bien stock</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: BRAND.green, letterSpacing: '-0.5px', marginTop: 4 }}>{invVerde.length}</div>
              </button>
              <button onClick={() => setFiltroInv('amarillo')} className="bf-card" style={{ padding: 16, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', background: '#fff9eb', border: 'none', outline: filtroInv === 'amarillo' ? `2px solid ${BRAND.amber}` : 'none', outlineOffset: -2, transition: 'outline 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.amber, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: BRAND.amber, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Hay que pedir</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: BRAND.amber, letterSpacing: '-0.5px', marginTop: 4 }}>{invAmarillo.length}</div>
              </button>
              <button onClick={() => setFiltroInv('rojo')} className="bf-card" style={{ padding: 16, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', background: '#fff5f5', border: 'none', outline: filtroInv === 'rojo' ? `2px solid ${BRAND.red}` : 'none', outlineOffset: -2, transition: 'outline 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND.red, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: BRAND.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Pedir YA</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: BRAND.red, letterSpacing: '-0.5px', marginTop: 4 }}>{invRojo.length}</div>
              </button>
            </div>

            {/* FILTROS */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {['TODOS', 'BAFAR', 'Carnes', 'Lácteos', 'Pan', 'Verduras', 'Salsas', 'Refrescos', 'Cervezas'].map(cat => {
                const active = filtroInv === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFiltroInv(cat)}
                    className="bf-pill"
                    style={{
                      background: active ? BRAND.ink : 'white',
                      color: active ? 'white' : BRAND.muted,
                      border: active ? 'none' : `1px solid ${BRAND.border}`,
                      cursor: 'pointer',
                      padding: '6px 12px',
                      fontFamily: 'inherit',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* GRID DE INVENTARIO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {inventarioFiltrado.map(item => {
                const status = getInvStatus(item);
                const color = status === 'rojo' ? BRAND.red : status === 'amarillo' ? BRAND.amber : BRAND.green;
                const bg = status === 'rojo' ? '#fff5f5' : status === 'amarillo' ? '#fff9eb' : '#e8f5ee';
                const statusLabel = status === 'rojo' ? 'Pedir YA' : status === 'amarillo' ? 'Hay que pedir' : 'Bien stock';
                const pct = Math.min(100, Math.round((item.stock / Math.max(item.minStock * 3, 1)) * 100));
                return (
                  <div key={item.id} className="bf-card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', overflow: 'hidden' }}>
                    {item.esBafar && (
                      <div style={{ position: 'absolute', top: 0, right: 0, background: BRAND.red, color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: 0.6, padding: '4px 12px', borderRadius: '0 14px 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Flame size={10} /> BAFAR
                      </div>
                    )}
                    {item.esCarneMart && !item.esBafar && (
                      <div style={{ position: 'absolute', top: 0, right: 0, background: BRAND.green, color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: 0.6, padding: '4px 12px', borderRadius: '0 14px 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Flame size={10} /> CarneMart
                      </div>
                    )}
                    <div style={{ paddingRight: (item.esBafar || item.esCarneMart) ? 90 : 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{item.nombre}</div>
                      <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>{item.marca} · {item.categoria}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1, color }}>{item.stock}</div>
                        <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2 }}>{item.unidad} · mín {item.minStock}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          onClick={() => setInventario(inventario.map(p => p.id === item.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p))}
                          style={{ background: BRAND.cream, border: `1px solid ${BRAND.border}`, width: 28, height: 28, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => setInventario(inventario.map(p => p.id === item.id ? { ...p, stock: p.stock + 1 } : p))}
                          style={{ background: BRAND.ink, color: 'white', border: 'none', width: 28, height: 28, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Barra de status */}
                    <div>
                      <div style={{ height: 6, borderRadius: 3, background: BRAND.cream, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: bg, padding: '4px 10px', borderRadius: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 0.3 }}>{statusLabel}</span>
                        </div>
                        {status !== 'verde' && item.esBafar && (
                          <button onClick={() => setTab('pedidos')} style={{ background: 'transparent', border: 'none', color: BRAND.red, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 2 }}>
                            Pedir <ChevronRight size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {inventarioFiltrado.length === 0 && (
              <div className="bf-card" style={{ padding: 32, textAlign: 'center', color: BRAND.muted, fontSize: 13 }}>
                No tienes productos en esta categoría todavía.
              </div>
            )}
          </div>
        )}

        {/* ============================================ */}
        {/* TAB 2: BIENVENIDO A BAFAR (PEDIDOS)            */}
        {/* ============================================ */}
        {tab === 'pedidos' && (
          <div className="bf-anim-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Bienvenido a BAFAR</h1>
                <p style={{ fontSize: 13, color: BRAND.muted, margin: '4px 0 0' }}>Levanta tu pedido directamente con planta. Entrega en 24-48 hrs.</p>
              </div>
              <div style={{ background: BRAND.ink, padding: '14px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <Award size={22} color="#f5d76e" />
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>BAFAR Puntos</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>{puntos.toLocaleString('es-MX')}</div>
                  <div style={{ fontSize: 10, color: '#f5d76e' }}>≈ ${(puntos/10).toFixed(0)} en producto</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
              {/* PRODUCTOS */}
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {['Todas las marcas', 'BAFAR Carnes', 'BURR', 'SABORI', 'LA CHONA', 'CAPERUCITA', 'MONTECILLO'].map((m, i) => (
                    <span key={i} className="bf-pill" style={{
                      background: i === 0 ? BRAND.ink : 'white',
                      color: i === 0 ? 'white' : BRAND.muted,
                      border: i === 0 ? 'none' : `1px solid ${BRAND.border}`,
                      cursor: 'pointer', padding: '6px 12px'
                    }}>{m}</span>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  {PRODUCTOS.map(p => {
                    const qty = cart[p.id] || 0;
                    return (
                      <div key={p.id} className="bf-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: p.color, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: p.textColor, letterSpacing: '0.5px' }}>{p.marca}</div>
                          {qty > 0 && (
                            <div style={{ position: 'absolute', top: 8, right: 8, background: BRAND.red, color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{qty}</div>
                          )}
                        </div>
                        <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{p.nombre}</div>
                          <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 3 }}>{p.presentacion}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BRAND.border}` }}>
                            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>${p.precio.toLocaleString('es-MX')}</span>
                            {qty === 0 ? (
                              <button onClick={() => addToCart(p.id)} style={{ background: BRAND.red, color: 'white', border: 'none', width: 28, height: 28, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={14} />
                              </button>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <button onClick={() => removeFromCart(p.id)} style={{ background: BRAND.cream, border: 'none', width: 24, height: 24, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Minus size={12} />
                                </button>
                                <span style={{ fontSize: 13, fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{qty}</span>
                                <button onClick={() => addToCart(p.id)} style={{ background: BRAND.red, color: 'white', border: 'none', width: 24, height: 24, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CARRITO */}
              <div className="bf-card" style={{ padding: 20, height: 'fit-content', position: 'sticky', top: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <ShoppingCart size={18} />
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Tu pedido</div>
                  {cartCount > 0 && <span className="bf-pill" style={{ background: BRAND.red, color: 'white', marginLeft: 'auto' }}>{cartCount}</span>}
                </div>

                {orderConfirmed ? (
                  <div style={{ background: '#e0f2ec', padding: 24, borderRadius: 10, textAlign: 'center' }}>
                    <Check size={32} color={BRAND.green} style={{ marginBottom: 8 }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.green }}>¡Pedido enviado!</div>
                    <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 4 }}>Te llegará en 24-48 hrs</div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: BRAND.muted, fontSize: 13 }}>
                    Agrega productos para empezar
                  </div>
                ) : (
                  <>
                    <div style={{ maxHeight: 280, overflowY: 'auto', marginBottom: 14 }}>
                      {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${BRAND.border}` }}>
                          <div style={{ flex: 1, paddingRight: 8 }}>
                            <div style={{ fontSize: 12, fontWeight: 600 }}>{item.nombre}</div>
                            <div style={{ fontSize: 11, color: BRAND.muted }}>{item.qty} × ${item.precio.toLocaleString('es-MX')}</div>
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700 }}>${(item.precio * item.qty).toLocaleString('es-MX')}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, color: BRAND.muted }}>
                      <span>Subtotal</span>
                      <span>${cartTotal.toLocaleString('es-MX')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12, color: BRAND.muted }}>
                      <span>Envío</span>
                      <span>Gratis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, paddingTop: 12, borderTop: `2px solid ${BRAND.ink}`, marginBottom: 8 }}>
                      <span>Total</span>
                      <span>${cartTotal.toLocaleString('es-MX')}</span>
                    </div>
                    <div style={{ background: BRAND.cream, padding: '8px 12px', borderRadius: 8, fontSize: 11, color: BRAND.amber, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Award size={12} />
                      Ganarás {puntosGanados.toLocaleString('es-MX')} puntos con este pedido
                    </div>
                    <button className="bf-btn-primary" onClick={confirmOrder} style={{ width: '100%' }}>
                      Confirmar pedido
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* TAB 3: BAFAR ACADEMY                           */}
        {/* ============================================ */}
        {tab === 'academy' && (
          <div className="bf-anim-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>BAFAR Academy</h1>
                <p style={{ fontSize: 13, color: BRAND.muted, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Users size={13} /> 3,200 aliados ya están aprendiendo · Contenido gratuito para ti
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div className="bf-card" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BookOpen size={16} color={BRAND.muted} />
                  <div>
                    <div style={{ fontSize: 11, color: BRAND.muted }}>Tus videos vistos</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>12 / 47</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERIE EXCLUSIVA: ARQUITECTO DE TU PROPIO DESTINO */}
            <button
              onClick={() => setShowSerieModal(true)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${BRAND.ink} 0%, #2d2d2d 60%, ${BRAND.amber} 100%)`,
                border: 'none',
                borderRadius: 14,
                padding: '32px 32px',
                marginBottom: 24,
                cursor: 'pointer',
                color: 'white',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 24,
                alignItems: 'center',
                textAlign: 'left',
                fontFamily: 'inherit',
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.18)'; }}
            >
              <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.15)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
                <Play size={32} fill="white" color="white" />
              </div>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white', marginBottom: 10 }}>SERIE EXCLUSIVA · INTRODUCCIÓN</span>
                <div style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 6px', letterSpacing: '-0.5px', lineHeight: 1.1 }}>ARQUITECTO DE TU PROPIO DESTINO</div>
                <div style={{ fontSize: 13, opacity: 0.9, maxWidth: 620 }}>
                  Una serie inédita con los aprendizajes de Grupo BAFAR para que tomes el control de tu negocio y construyas tu propio futuro. Toca para abrir la serie.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', color: BRAND.ink, padding: '12px 20px', borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
                ENTRAR A LA APP <ChevronRight size={16} />
              </div>
            </button>

            {/* SERIE EXCLUSIVA: MODELO DE GESTIÓN BAFAR */}
            <button
              onClick={() => setShowModeloModal(true)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${BRAND.ink} 0%, #1a3d2e 60%, ${BRAND.green} 100%)`,
                border: 'none',
                borderRadius: 14,
                padding: '32px 32px',
                marginBottom: 24,
                cursor: 'pointer',
                color: 'white',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 24,
                alignItems: 'center',
                textAlign: 'left',
                fontFamily: 'inherit',
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.18)'; }}
            >
              <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.15)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
                <Play size={32} fill="white" color="white" />
              </div>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white', marginBottom: 10 }}>SERIE EXCLUSIVA · 9 EPISODIOS</span>
                <div style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 6px', letterSpacing: '-0.5px', lineHeight: 1.1 }}>MODELO DE GESTIÓN BAFAR</div>
                <div style={{ fontSize: 13, opacity: 0.9, maxWidth: 620 }}>
                  Una serie completa con la metodología que usamos para profesionalizar tu negocio: procesos, indicadores, finanzas y liderazgo. Toca para abrir la serie.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', color: BRAND.ink, padding: '12px 20px', borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
                VER SERIE <ChevronRight size={16} />
              </div>
            </button>

            {/* SERIE: BAFAR ACADEMY (biblioteca completa) */}
            <button
              onClick={() => setShowAcademyModal(true)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${BRAND.ink} 0%, #5a0a17 60%, ${BRAND.red} 100%)`,
                border: 'none',
                borderRadius: 14,
                padding: '32px 32px',
                marginBottom: 24,
                cursor: 'pointer',
                color: 'white',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 24,
                alignItems: 'center',
                textAlign: 'left',
                fontFamily: 'inherit',
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.18)'; }}
            >
              <div style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.15)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
                <BookOpen size={32} color="white" />
              </div>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white', marginBottom: 10 }}>BIBLIOTECA · {VIDEOS.length} VIDEOS</span>
                <div style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 6px', letterSpacing: '-0.5px', lineHeight: 1.1 }}>BAFAR Academy</div>
                <div style={{ fontSize: 13, opacity: 0.9, maxWidth: 620 }}>
                  Cocina, rentabilidad, marketing y operación. Todos los videos de la academia en un solo lugar, filtrables por categoría.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', color: BRAND.ink, padding: '12px 20px', borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
                VER VIDEOS <ChevronRight size={16} />
              </div>
            </button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BRAND.border}`, padding: '20px 28px', textAlign: 'center', fontSize: 11, color: BRAND.muted, background: 'white' }}>
        BAFAR Aliados · Tu socio estratégico de cocina · v1.0 · www.bafar.com.mx
        <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: BRAND.ink }}>Powered by AXON B2B</div>
      </footer>

      {/* MODAL: SERIE ARQUITECTO DE TU PROPIO DESTINO */}
      {showSerieModal && createPortal(
        <div onClick={() => setShowSerieModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 0, width: 720, maxWidth: '100%', maxHeight: 'calc(100vh - 32px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(135deg, ${BRAND.ink} 0%, #2d2d2d 60%, ${BRAND.amber} 100%)`, color: 'white', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white' }}>SERIE EXCLUSIVA · INTRODUCCIÓN</span>
                <div style={{ fontSize: 22, fontWeight: 800, margin: '10px 0 4px', letterSpacing: '-0.5px' }}>ARQUITECTO DE TU PROPIO DESTINO</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Aprendizajes del Grupo BAFAR para construir tu propio futuro como empresario.</div>
              </div>
              <button onClick={() => setShowSerieModal(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', padding: 8, borderRadius: 8 }}><X size={18} /></button>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', background: BRAND.paper }}>
              {SERIE_ARQUITECTO.map((v, i) => (
                <div key={v.id} className="bf-card" style={{ padding: 14, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s' }}
                     onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
                     onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${BRAND.ink} 0%, ${BRAND.amber} 100%)`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Play size={20} fill="white" color="white" />
                    <span style={{ position: 'absolute', top: -6, left: -6, background: 'white', color: BRAND.ink, fontSize: 10, fontWeight: 800, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BRAND.border}` }}>{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: BRAND.muted, fontWeight: 600, letterSpacing: 0.3 }}>{v.nivel.toUpperCase()}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, margin: '2px 0 4px', lineHeight: 1.3 }}>{v.titulo}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: BRAND.muted }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {v.duracion}</span>
                      <span>{v.autor}</span>
                    </div>
                  </div>
                  <button style={{ background: BRAND.ink, color: 'white', border: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Play size={12} fill="white" /> Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL: BAFAR ACADEMY (biblioteca completa) */}
      {showAcademyModal && createPortal(
        <div onClick={() => setShowAcademyModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 0, width: 960, maxWidth: '100%', maxHeight: 'calc(100vh - 32px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(135deg, ${BRAND.ink} 0%, #5a0a17 60%, ${BRAND.red} 100%)`, color: 'white', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white' }}>BIBLIOTECA · {VIDEOS.length} VIDEOS</span>
                <div style={{ fontSize: 22, fontWeight: 800, margin: '10px 0 4px', letterSpacing: '-0.5px' }}>BAFAR Academy</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Contenido gratuito para aliados: cocina, rentabilidad, marketing y operación.</div>
              </div>
              <button onClick={() => setShowAcademyModal(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', padding: 8, borderRadius: 8 }}><X size={18} /></button>
            </div>
            <div style={{ padding: 20, overflowY: 'auto', background: BRAND.paper }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                {['TODOS', 'COCINA', 'RENTABILIDAD', 'MARKETING', 'OPERACIÓN'].map(cat => (
                  <button key={cat} onClick={() => setFiltroVideo(cat)} className="bf-pill" style={{
                    background: filtroVideo === cat ? BRAND.ink : 'white',
                    color: filtroVideo === cat ? 'white' : BRAND.muted,
                    border: filtroVideo === cat ? 'none' : `1px solid ${BRAND.border}`,
                    cursor: 'pointer', padding: '8px 14px', fontFamily: 'inherit'
                  }}>{cat}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {videosFiltrados.map(v => (
                  <div key={v.id} className="bf-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                       onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                       onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ background: v.color, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: 48, height: 48, background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                        <Play size={18} fill={v.textColor} color={v.textColor} />
                      </div>
                      <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>{v.duracion}</span>
                      <span className="bf-pill" style={{ position: 'absolute', top: 10, left: 10, background: 'white', color: v.textColor }}>{v.categoria}</span>
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, marginBottom: 8 }}>{v.titulo}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: BRAND.muted }}>
                        <span>{v.autor}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={11} /> {v.vistas.toLocaleString('es-MX')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL: SERIE MODELO DE GESTIÓN BAFAR */}
      {showModeloModal && createPortal(
        <div onClick={() => setShowModeloModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 0, width: 720, maxWidth: '100%', maxHeight: 'calc(100vh - 32px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(135deg, ${BRAND.ink} 0%, #1a3d2e 60%, ${BRAND.green} 100%)`, color: 'white', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div>
                <span className="bf-pill" style={{ background: 'rgba(255,255,255,0.22)', color: 'white' }}>SERIE EXCLUSIVA · 9 EPISODIOS</span>
                <div style={{ fontSize: 22, fontWeight: 800, margin: '10px 0 4px', letterSpacing: '-0.5px' }}>MODELO DE GESTIÓN BAFAR</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>La metodología BAFAR para profesionalizar tu negocio paso a paso.</div>
              </div>
              <button onClick={() => setShowModeloModal(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', padding: 8, borderRadius: 8 }}><X size={18} /></button>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', background: BRAND.paper }}>
              {SERIE_MODELO.map((v, i) => (
                <div key={v.id} className="bf-card" style={{ padding: 14, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s' }}
                     onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
                     onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${BRAND.ink} 0%, ${BRAND.green} 100%)`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Play size={20} fill="white" color="white" />
                    <span style={{ position: 'absolute', top: -6, left: -6, background: 'white', color: BRAND.ink, fontSize: 10, fontWeight: 800, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BRAND.border}` }}>{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: BRAND.muted, fontWeight: 600, letterSpacing: 0.3 }}>{v.nivel.toUpperCase()}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, margin: '2px 0 4px', lineHeight: 1.3 }}>{v.titulo}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: BRAND.muted }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {v.duracion}</span>
                      <span>{v.autor}</span>
                    </div>
                  </div>
                  <button style={{ background: BRAND.ink, color: 'white', border: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Play size={12} fill="white" /> Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL: NUEVO PRODUCTO */}
      {showProdModal && createPortal(
        <div onClick={() => setShowProdModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 24, width: 400, maxWidth: 'calc(100vw - 32px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Nuevo producto</div>
              <button onClick={() => setShowProdModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: BRAND.muted, display: 'flex', padding: 0 }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Nombre del producto</div>
                <input
                  type="text"
                  value={newProd.label}
                  onChange={e => setNewProd({ ...newProd, label: e.target.value })}
                  placeholder="Ej. Quesadillas"
                  style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Costo unitario</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px' }}>
                    <span style={{ fontSize: 13, color: BRAND.muted }}>$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={newProd.costo.toLocaleString('es-MX')}
                      onChange={e => setNewProd({ ...newProd, costo: parseInt(e.target.value.replace(/\D/g, '')) || 0 })}
                      style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Precio de venta</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px' }}>
                    <span style={{ fontSize: 13, color: BRAND.muted }}>$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={newProd.precio.toLocaleString('es-MX')}
                      onChange={e => setNewProd({ ...newProd, precio: parseInt(e.target.value.replace(/\D/g, '')) || 0 })}
                      style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                    />
                  </div>
                </div>
              </div>
              <button
                className="bf-btn-primary"
                disabled={!newProd.label.trim()}
                onClick={() => {
                  const id = Math.max(0, ...ventasCat.map(p => p.id)) + 1;
                  setVentasCat([...ventasCat, { id, label: newProd.label.trim(), costo: newProd.costo, precio: newProd.precio, monto: 0 }]);
                  setShowProdModal(false);
                }}
                style={{ marginTop: 6 }}
              >
                Agregar producto
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL: NUEVO GASTO */}
      {showGastoModal && createPortal(
        <div onClick={() => setShowGastoModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 24, width: 400, maxWidth: 'calc(100vw - 32px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Nuevo gasto</div>
              <button onClick={() => setShowGastoModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: BRAND.muted, display: 'flex', padding: 0 }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Concepto</div>
                <input
                  type="text"
                  value={newGasto.label}
                  onChange={e => setNewGasto({ ...newGasto, label: e.target.value })}
                  placeholder="Ej. Mantenimiento"
                  style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink }}
                />
              </div>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Monto</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: BRAND.paper, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px' }}>
                  <span style={{ fontSize: 13, color: BRAND.muted }}>$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newGasto.monto.toLocaleString('es-MX')}
                    onChange={e => setNewGasto({ ...newGasto, monto: parseInt(e.target.value.replace(/\D/g, '')) || 0 })}
                    style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, outline: 'none', fontFamily: 'inherit', color: BRAND.ink }}
                  />
                </div>
              </div>
              <button
                className="bf-btn-primary"
                disabled={!newGasto.label.trim()}
                onClick={() => {
                  const id = Math.max(0, ...gastosFijos.map(g => g.id)) + 1;
                  setGastosFijos([...gastosFijos, { id, label: newGasto.label.trim(), monto: newGasto.monto }]);
                  setShowGastoModal(false);
                }}
                style={{ marginTop: 6 }}
              >
                Agregar gasto
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL: NUEVO PRODUCTO DE INVENTARIO */}
      {showInvModal && createPortal(
        <div onClick={() => setShowInvModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} className="bf-card" style={{ padding: 24, width: 440, maxWidth: 'calc(100vw - 32px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Agregar producto al inventario</div>
              <button onClick={() => setShowInvModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: BRAND.muted, display: 'flex', padding: 0 }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Nombre del producto</div>
                <input
                  type="text"
                  value={newInvItem.nombre}
                  onChange={e => setNewInvItem({ ...newInvItem, nombre: e.target.value })}
                  placeholder="Ej. Salchicha jumbo BAFAR"
                  style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Marca</div>
                  <input
                    type="text"
                    value={newInvItem.marca}
                    onChange={e => setNewInvItem({ ...newInvItem, marca: e.target.value })}
                    placeholder="Ej. BAFAR / Mercado"
                    style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Categoría</div>
                  <select
                    value={newInvItem.categoria}
                    onChange={e => setNewInvItem({ ...newInvItem, categoria: e.target.value })}
                    style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink, cursor: 'pointer' }}
                  >
                    {['Carnes', 'Lácteos', 'Pan', 'Verduras', 'Salsas', 'Refrescos', 'Cervezas', 'Otros'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Unidad</div>
                  <select
                    value={newInvItem.unidad}
                    onChange={e => setNewInvItem({ ...newInvItem, unidad: e.target.value })}
                    style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink, cursor: 'pointer' }}
                  >
                    {['piezas', 'kilos', 'cajas', 'paquetes', 'bolsas', 'botes', 'bloques'].map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Stock actual</div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newInvItem.stock.toLocaleString('es-MX')}
                    onChange={e => setNewInvItem({ ...newInvItem, stock: parseInt(e.target.value.replace(/\D/g, '')) || 0 })}
                    style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, fontWeight: 600, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink, textAlign: 'right' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginBottom: 4 }}>Mínimo</div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newInvItem.minStock.toLocaleString('es-MX')}
                    onChange={e => setNewInvItem({ ...newInvItem, minStock: parseInt(e.target.value.replace(/\D/g, '')) || 0 })}
                    style={{ width: '100%', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, fontWeight: 600, outline: 'none', fontFamily: 'inherit', background: BRAND.paper, color: BRAND.ink, textAlign: 'right' }}
                  />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '4px 0' }}>
                <input
                  type="checkbox"
                  checked={newInvItem.esBafar}
                  onChange={e => setNewInvItem({ ...newInvItem, esBafar: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <Flame size={13} color={BRAND.red} />
                Es producto BAFAR
              </label>
              <button
                className="bf-btn-primary"
                disabled={!newInvItem.nombre.trim()}
                onClick={() => {
                  const id = Math.max(0, ...inventario.map(p => p.id)) + 1;
                  setInventario([...inventario, { id, ...newInvItem, nombre: newInvItem.nombre.trim(), marca: newInvItem.marca.trim() || '—' }]);
                  setShowInvModal(false);
                }}
                style={{ marginTop: 6 }}
              >
                Agregar al inventario
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
