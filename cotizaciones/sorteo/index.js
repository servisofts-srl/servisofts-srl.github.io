/* ==========================================================
   COT-2026-001 · Plataforma de Rifas, Sorteos y Raspaditas
   1) PROPUESTA → contenido comercial de la cotización
   2) RIFA      → reglas de la rifa usadas por la demo
   3) Demo      → app SorteoYa funcional local (localStorage)
   ========================================================== */

const PROPUESTA = {
  tipoCambio: 12.09,
  mantenimiento: { sinServidores: 300, conServidores: 450 },
  objetivos: [
    "Implementar una aplicación móvil multiplataforma.",
    "Incorporar una billetera digital para los usuarios.",
    "Integrar pagos mediante QR y tarjetas.",
    "Automatizar la gestión de tickets y participaciones.",
    "Implementar diferentes modalidades de raspaditas.",
    "Gestionar la acreditación y entrega de premios.",
    "Incorporar un motor de gestión de riesgos.",
    "Centralizar la administración mediante un panel web.",
    "Generar reportes financieros y operativos.",
    "Implementar controles de seguridad, trazabilidad y prevención de fraude.",
  ],
  componentes: [
    ["📱", "Aplicación móvil Android e iOS", ["Registro e inicio de sesión", "Perfil de usuario", "Verificación de identidad", "Página principal y catálogo de juegos", "Rifas y sorteos disponibles", "Compra de tickets", "Selección de números", "Consulta de resultados", "Raspaditas digitales", "Historial de participaciones", "Historial de premios", "Billetera digital", "Notificaciones", "Atención y soporte"]],
    ["🎟️", "Sistema de rifas y sorteos", ["Creación de campañas", "Configuración de premios", "Registro del valor comercial del premio", "Precio por ticket", "Cantidad de tickets disponibles", "Numeración automática", "Control de tickets vendidos", "Fechas de inicio y finalización", "Programación del sorteo", "Registro verificable de resultados", "Identificación de ganadores", "Gestión de entrega de premios"]],
    ["👛", "Billetera digital", ["Saldo disponible", "Recarga mediante QR", "Recarga mediante tarjetas", "Historial de movimientos", "Compra de participaciones", "Acreditación de premios", "Solicitudes de retiro", "Validación de operaciones", "Límites de transacción", "Conciliación de movimientos"]],
    ["💳", "Sistema de pagos", ["Integración con pasarela externa", "Procesamiento de pagos QR", "Procesamiento de tarjetas", "Confirmación automática de operaciones", "Registro de transacciones", "Control de pagos duplicados", "Configuración de comisiones", "Reglas de recarga", "Reglas de retiro", "Autorización de pagos de premios"]],
    ["🖥️", "Panel administrativo web", ["Dashboard general", "Administración de usuarios", "Gestión de rifas y sorteos", "Gestión de raspaditas", "Administración de billeteras", "Gestión de pagos y retiros", "Gestión de ganadores", "Configuración de reglas de pago", "Gestión de presupuestos", "Risk Management Engine", "Reportes financieros", "Auditoría y seguridad", "Configuración general"]],
    ["📊", "Reportes y estadísticas", ["Ingresos por ventas", "Tickets vendidos", "Participaciones por juego", "Premios generados", "Premios pendientes", "Premios pagados", "Recargas y retiros", "Exposición financiera", "Presupuestos ejecutados", "Resultados por período", "Historial administrativo"]],
  ],
  riesgoModulos: ["Risk Management", "Purchase Limits", "Payout Limits", "Exposure Limits", "Liability Management", "Player Limits", "Budget Management", "Fraud Management"],
  riesgoReglas: ["Presupuesto global semanal", "Presupuesto independiente por juego", "Límites de compra por usuario", "Límites de pago por premio", "Exposición financiera máxima", "Control de obligaciones pendientes", "Alertas automáticas", "Bloqueo de nuevas participaciones al alcanzar límites", "Historial de cambios y auditoría"],
  riesgoEjemplo: [
    ["Presupuesto global semanal", 38200, 50000],
    ["Gran Rifa Hilux", 12400, 20000],
    ["Raspaditas", 8600, 10000],
    ["Cofres del tesoro", 5000, 5000],
  ],
  fases: ["Análisis, arquitectura y diseño UX/UI", "Backend y seguridad", "Usuarios y billetera", "Aplicaciones móviles y pagos", "Rifas, sorteos y tickets", "Raspaditas digitales", "Risk Management y panel administrativo", "Integraciones y pruebas", "Implementación y capacitación"],
  pagos: ["1er mes", "2do mes", "3er mes", "4to mes", "5to mes", "6to mes"],
  pagoMensual: 2000,
  incluyeMantenimiento: ["Mantenimiento correctivo", "Actualizaciones de seguridad", "Monitoreo técnico", "Respaldo de información", "Corrección de errores", "Soporte técnico", "Mantenimiento de integraciones"],
  entrega: ["Aplicaciones móviles", "Panel administrativo", "Backend y API", "Código fuente según contrato", "Documentación técnica", "Manual administrativo", "Manual de usuario", "Capacitación para administradores"],
  externos: ["Servidores y consumo de infraestructura (salvo en el mantenimiento con servidores)", "Comisiones de pasarelas de pago", "Dominio y servicios externos", "Mensajería SMS", "Licencias y autorizaciones regulatorias", "Certificaciones técnicas externas", "Auditorías independientes", "Asesoramiento jurídico", "Capital destinado a premios", "Gastos de operación comercial"],
};

const RIFA = {
  id: "HILUX-01",
  titulo: "Camioneta Toyota Hilux 4x4",
  corto: "Camioneta Hilux",
  img: "img/hilux.jpg",
  valor: 320000,
  precio: 50,
  total: 10000,
  vendidos: 7850,
  libres: 2150,                 // los tickets 0000–2149 quedan libres en la demo
  inicioAuto: 248,
  maxCompra: 50,
};
const RASPADITA = { precio: 10, simbolos: ["💎", "⭐", "🍀", "🍒", "🔔"], premios: { "💎": 100, "⭐": 20 } };
const RECARGA = { montos: [50, 100, 200], min: 10, max: 5000 };

/* ---------------- utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const bs = (n) => `Bs ${fmt(n)}`;
const bsDec = (n) => `Bs ${fmt(n)},00`;
const usd = (n) => `USD ${fmt(n)}`;
const pad = (n) => String(n).padStart(4, "0");
const toast = (m, t) => window.SS && SS.toast(m, t);
const barajar = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fecha = (ts) => {
  const d = new Date(ts), mes = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][d.getMonth()];
  return `${String(d.getDate()).padStart(2, "0")} ${mes} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const randHex = (bytes = 16) => {
  const a = new Uint8Array(bytes);
  (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach((_, i) => (a[i] = Math.random() * 256));
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
};
async function sha256(text) {
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 2166136261 >>> 0, out = "";               // respaldo sin crypto.subtle
  for (let r = 0; r < 8; r++) { for (const c of text + r) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } out += h.toString(16).padStart(8, "0"); }
  return out;
}

/* ---------------- secciones estáticas ---------------- */
(function renderPropuesta() {
  const P = PROPUESTA;
  const total = P.pagos.length * P.pagoMensual;
  const lista = (sel, items) => { $(sel).innerHTML = items.map((x) => `<li>${x}</li>`).join(""); };

  $("#kTotal").textContent = usd(total);
  $("#kMant").textContent = `Desde ${usd(P.mantenimiento.sinServidores)}`;
  $("#cTotal").textContent = usd(total);
  $("#cMant").textContent = `${usd(P.mantenimiento.sinServidores)} o ${usd(P.mantenimiento.conServidores)} con servidores`;

  lista("#goalList", P.objetivos);
  $("#featGrid").innerHTML = P.componentes.map(([e, t, l], i) => `
    <article class="card card-hover feat reveal" style="transition-delay:${i * 50}ms">
      <div class="icon-badge">${e}</div><h3>${t}</h3>
      <ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("");

  $("#riskMods").innerHTML = P.riesgoModulos.map((m) => `<span class="chip">${m}</span>`).join("");
  lista("#riskRules", P.riesgoReglas);
  $("#riskMeters").innerHTML = P.riesgoEjemplo.map(([t, usado, limite]) => {
    const pct = Math.round((usado / limite) * 100);
    const nivel = pct >= 100 ? ["stop", "Bloqueado"] : pct >= 80 ? ["warn", "En alerta"] : ["ok", "Normal"];
    return `<div class="meter"><div class="meter-top"><b>${t}</b><span class="meter-state ${nivel[0]}">${nivel[1]}</span></div>
      <div class="meter-bar"><i class="${nivel[0]}" style="width:${pct}%"></i></div>
      <small>${bs(usado)} de ${bs(limite)} · ${pct}%</small></div>`;
  }).join("");

  $("#phaseList").innerHTML = P.fases.map((f, i) => `<li><span>${i + 1}</span><b>${f}</b></li>`).join("");

  $("#pagoList").innerHTML = P.pagos.map((m) => `<li class="pago"><b>${m}</b><span>Monto a pagar</span><strong>${usd(P.pagoMensual)}</strong></li>`).join("");
  $("#investTotal").textContent = usd(total);
  $("#investBig").textContent = usd(total);
  $("#investBs").textContent = `Equivalencia referencial: ${bs(total * P.tipoCambio)}`;

  $("#mantPlans").innerHTML = `<div><small>Sin servidores</small><b>${usd(P.mantenimiento.sinServidores)}</b></div><div><small>Con servidores</small><b>${usd(P.mantenimiento.conServidores)}</b></div>`;
  lista("#mantList", P.incluyeMantenimiento);
  lista("#entregaList", P.entrega);
  lista("#externosList", P.externos);
})();

/* ==========================================================
   DEMO — estado
   ========================================================== */
const KEY = "ss-sorteoya-demo-v1";

function nuevoEstado() {
  return {
    user: null, saldo: 250, verificado: false, tickets: [], premios: [],
    mov: [{ k: "carga", tipo: "carga", titulo: "Carga de saldo", sub: bs(250), ts: Date.now() }],
    rifa: { vendidos: RIFA.vendidos, seed: randHex(16), commit: null, status: "open", ganador: null, ts: null },
  };
}
function cargar() {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
  return nuevoEstado();
}
function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
async function asegurarCommit() {
  if (S.rifa.commit) return;
  S.rifa.commit = await sha256(S.rifa.seed);
  guardar();
}

let S = cargar();
const uiInicial = () => ({ screen: S.user ? "home" : "splash", auth: "login", qty: 5, picks: [], pay: "wallet", recarga: "qr", monto: 100, tTab: "rifas", hTab: "compras", scratch: null, win: null });
let ui = uiInicial();

const vendidos = () => (S.rifa.status === "open" ? S.rifa.vendidos + S.tickets.length : RIFA.total);
const ocupado = (n) => n >= RIFA.libres || S.tickets.includes(n);
const iniciales = (n) => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
const primerNombre = (n) => n.trim().split(/\s+/)[0];
const pendientes = () => S.premios.filter((p) => p.estado === "pendiente");

/* ---------- datos de ejemplo de las pantallas de referencia ---------- */
const SEMILLA_EJEMPLO = { seed: "526cda7f4e76ee093b0f39bf4799ceaf", commit: "626a668e5553cd162b18cdef09098c25c295904c191bb04853cad7b319ead3aa" };   // sha256(seed:HILUX-01) mod 10000 = 5789
function ejemplo(cerrada = false) {
  return {
    user: { name: "María", contacto: "maria@correo.com" }, saldo: 250, verificado: true,
    tickets: [248, 249, 250, 251, 252],
    premios: [{ id: "p1", titulo: "Raspadita", monto: 100, ts: +new Date(2026, 10, 1, 18, 31), estado: "pagado" }],
    mov: [
      { k: "carga", tipo: "carga", titulo: "Carga de saldo", sub: bs(300), ts: +new Date(2026, 10, 1, 18, 10) },
      { k: "compra", tipo: "rasp", titulo: "Raspadita", sub: `(${bs(10)})`, ts: +new Date(2026, 10, 1, 18, 30), badge: 100 },
      { k: "compra", tipo: "rifa", titulo: `Rifa: ${RIFA.corto}`, sub: `5 tickets (${bs(250)})`, ts: +new Date(2026, 10, 3, 10, 24) },
    ],
    rifa: cerrada
      ? { vendidos: RIFA.total, ...SEMILLA_EJEMPLO, status: "done", ganador: 5789, ts: +new Date(2026, 10, 4, 20, 0) }
      : { vendidos: RIFA.vendidos - 5, seed: randHex(16), commit: null, status: "open", ganador: null, ts: null },
  };
}

/* ==========================================================
   DEMO — iconos e ilustraciones
   ========================================================== */
const IC = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5z"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16" cy="14.5" r="1.3" fill="currentColor"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2M14 20h2M18 18h2v2"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V5a1.5 1.5 0 0 1 3 0v5l5 1.2a2 2 0 0 1 1.5 2.2L18 18a3 3 0 0 1-3 3h-3a4 4 0 0 1-3.2-1.6L5.5 15a1.6 1.6 0 0 1 2.4-2z"/></svg>',
  google: '<svg viewBox="0 0 24 24"><path fill="#4285f4" d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path fill="#34a853" d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path fill="#fbbc05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z"/><path fill="#ea4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1877f2"/><path fill="#fff" d="M13.5 21.9v-7h2.3l.4-2.8h-2.7v-1.8c0-.8.4-1.5 1.6-1.5h1.2V6.4s-1.1-.2-2.2-.2c-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.8h2.4v7c1 .2 2.1.2 3.1 0z"/></svg>',
};
const ticketArt = () => `<svg class="art-ticket" viewBox="0 0 120 90" aria-hidden="true">
  <defs><linearGradient id="tA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b92fe8"/><stop offset="1" stop-color="#5d12c4"/></linearGradient><linearGradient id="tB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd24d"/><stop offset="1" stop-color="#ff9d1c"/></linearGradient></defs>
  <g transform="rotate(-20 60 45)"><rect x="16" y="10" width="92" height="56" rx="8" fill="url(#tB)"/></g>
  <g transform="rotate(-8 60 45)"><path d="M14 22a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v10a9 9 0 0 0 0 18v10a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V50a9 9 0 0 0 0-18z" fill="url(#tA)" stroke="#fff" stroke-width="3"/>
  <path d="m62 25 5.5 11.2 12.3 1.8-8.9 8.7 2.1 12.3L62 53.2l-11 5.8 2.1-12.3-8.9-8.7 12.3-1.8z" fill="url(#tB)"/></g></svg>`;
const giftArt = () => `<svg class="art-gift" viewBox="0 0 160 150" aria-hidden="true">
  <defs><linearGradient id="gA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e05aff"/><stop offset="1" stop-color="#7a1fd6"/></linearGradient><linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ff9f1c"/></linearGradient></defs>
  <path d="M80 36C60 6 34 12 40 28c4 10 24 12 40 8zM80 36c20-30 46-24 40-8-4 10-24 12-40 8z" fill="url(#gB)" stroke="#d97706" stroke-width="2"/>
  <rect x="26" y="62" width="108" height="78" rx="8" fill="url(#gA)"/><rect x="66" y="62" width="28" height="78" fill="url(#gB)"/>
  <rect x="16" y="36" width="128" height="32" rx="7" fill="url(#gA)" stroke="#fff" stroke-opacity=".35"/><rect x="64" y="36" width="32" height="32" fill="url(#gB)"/></svg>`;
const raspaArt = () => `<svg class="art-rasp" viewBox="0 0 64 44" aria-hidden="true"><g transform="rotate(-8 32 22)"><rect x="6" y="6" width="52" height="32" rx="5" fill="#8a2be2" stroke="#fff" stroke-width="2"/><rect x="13" y="13" width="38" height="18" rx="3" fill="#c9b6e8"/><path d="M15 26c6-8 9 4 14-3s7 4 12-2 6 2 8 0" fill="none" stroke="#5d12c4" stroke-width="2.5" stroke-linecap="round"/></g></svg>`;
const rifaArt = () => `<svg class="art-rasp" viewBox="0 0 64 44" aria-hidden="true"><g transform="rotate(-10 32 22)"><path d="M6 12a4 4 0 0 1 4-4h44a4 4 0 0 1 4 4v5a5 5 0 0 0 0 10v5a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-5a5 5 0 0 0 0-10z" fill="#ff8a1f" stroke="#fff" stroke-width="2"/><path d="m32 13 2.8 5.8 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" fill="#ffe27a"/></g></svg>`;
const walletArt = () => `<svg class="art-rasp" viewBox="0 0 64 44" aria-hidden="true"><rect x="10" y="6" width="44" height="33" rx="6" fill="#17b26a" stroke="#fff" stroke-width="2"/><rect x="38" y="17" width="19" height="12" rx="4" fill="#0e8a50" stroke="#fff" stroke-width="2"/></svg>`;
const bandas = () => `<div class="bits" aria-hidden="true">${[[4, 22, "#ffc62e", -30], [86, 16, "#ff5fc4", 25], [14, 44, "#49d8ff", 15], [90, 48, "#ffc62e", -20], [8, 76, "#ff5fc4", 40], [88, 80, "#49d8ff", -35], [50, 5, "#fff", 10]].map(([x, y, c, r]) => `<i style="left:${x}%;top:${y}%;background:${c};transform:rotate(${r}deg)"></i>`).join("")}</div>`;

/* ==========================================================
   DEMO — pantallas
   ========================================================== */
function cabecera(titulo, { back, menu, bell, logo } = {}) {
  const n = pendientes().length + (S.rifa.status === "done" ? 1 : 0);
  const izq = back ? `<button class="a-ico" data-go="${back}" aria-label="Volver">${IC.back}</button>` : menu ? `<button class="a-ico" data-go="perfil" aria-label="Abrir menú">${IC.menu}</button>` : '<span class="a-ico"></span>';
  const der = bell ? `<button class="a-ico" data-go="avisos" aria-label="Notificaciones">${IC.bell}${n ? `<em>${n}</em>` : ""}</button>` : '<span class="a-ico"></span>';
  return `<header class="a-head">${izq}<h4 class="${logo ? "sy-logo" : ""}">${titulo}</h4>${der}</header>`;
}
function tabbar(activo) {
  const t = (k, label, ic) => `<button data-go="${k}" class="${activo === k ? "on" : ""}">${ic}<span>${label}</span></button>`;
  return `<nav class="tabbar">${t("home", "Inicio", IC.home)}${t("tickets", "Mis tickets", IC.ticket)}${t("wallet", "Billetera", IC.wallet)}${t("history", "Historial", IC.clock)}</nav>`;
}
const pantalla = (cab, cuerpo, nombre, pie = "") => `<div class="a-screen">${cab}<div class="app-scroll" data-screen="${nombre}">${cuerpo}</div>${pie}</div>`;

const VIEWS = {
  splash: () => `<div class="v-promo v-splash screen-in">${bandas()}
    ${ticketArt()}
    <div class="sy-logo big">SorteoYa</div>
    <p class="sy-tag">Rifas • Sorteos • Raspaditas</p>
    <div class="glow">${giftArt()}</div>
    <button class="a-pill" data-go="login">Comenzar</button>
    <p class="sy-foot">Compra, raspa, participa<br>y gana premios increíbles</p>
  </div>`,

  login: () => {
    const reg = ui.auth === "register";
    return `<div class="v-login screen-in">
      <div class="login-mark">${ticketArt()}<div class="sy-logo color">SorteoYa</div></div>
      <div class="seg"><button data-auth="login" class="${reg ? "" : "on"}">Iniciar sesión</button><button data-auth="register" class="${reg ? "on" : ""}">Crear cuenta</button></div>
      <form id="authForm" novalidate>
        ${reg ? `<label class="field"><span class="sr-only">Nombre</span>${IC.user}<input name="name" autocomplete="name" placeholder="Nombre completo"></label>` : ""}
        <label class="field"><span class="sr-only">Correo o celular</span>${IC.user}<input name="contacto" autocomplete="username" placeholder="Correo o celular"></label>
        <label class="field"><span class="sr-only">Contraseña</span>${IC.lock}<input name="pass" type="password" autocomplete="${reg ? "new-password" : "current-password"}" placeholder="Contraseña"><button type="button" class="eye" data-act="eye" aria-label="Mostrar contraseña">${IC.eye}</button></label>
        ${reg ? "" : `<button type="button" class="a-link" data-act="olvide">¿Olvidaste tu contraseña?</button>`}
        <button class="a-btn" type="submit">${reg ? "Crear cuenta" : "Ingresar"}</button>
      </form>
      <div class="or"><span>o continúa con</span></div>
      <div class="social"><button data-act="social">${IC.google}Google</button><button data-act="social">${IC.facebook}Facebook</button></div>
      <p class="a-hint">Demo: escribe cualquier dato, no se envía ni se guarda ninguna contraseña.</p>
    </div>`;
  },

  home: () => pantalla(cabecera("SorteoYa", { menu: true, bell: true, logo: true }), `
    <div class="hello"><div class="avatar">${esc(iniciales(S.user.name))}</div><b>¡Hola, ${esc(primerNombre(S.user.name))}!</b></div>
    <div class="wallet-card">${IC.wallet}<div><small>Mi billetera</small><b>${bsDec(S.saldo)}</b></div><button class="gold-btn" data-go="wallet">+ Cargar</button></div>
    <div class="tiles">
      <button class="tile" data-go="detail">${rifaArt()}<b>Sorteos /<br>Rifas</b></button>
      <button class="tile" data-go="scratch">${raspaArt()}<b>Raspaditas</b></button>
    </div>
    <h5 class="a-h">Sorteos destacados</h5>
    <div class="carousel">
      <button class="banner" data-go="detail"><img src="${RIFA.img}" alt=""><span><b>Gran Rifa</b>Camioneta<br>Toyota Hilux 4x4</span></button>
      <button class="banner b2" data-go="scratch"><span><b>Raspadita</b>Raspa y gana<br>de inmediato · ${bs(RASPADITA.precio)}</span>${raspaArt()}</button>
    </div>
    <div class="dots"><i class="on"></i><i></i></div>`, "home", tabbar("home")),

  detail: () => {
    const v = vendidos(), pct = (v / RIFA.total) * 100, abierta = S.rifa.status === "open";
    return pantalla(cabecera("Detalle de la rifa", { back: "home" }), `
      <div class="d-hero"><img src="${RIFA.img}" alt="${RIFA.titulo}"></div>
      <div class="d-body">
        <h3>Gran Rifa<br>${RIFA.titulo}</h3>
        <div class="d-vals"><div><small>Valor del premio</small><b>${bs(RIFA.valor)}</b></div><div><small>Precio por rifa</small><b>${bs(RIFA.precio)}</b></div></div>
        <div class="d-sold"><div><b>Tickets vendidos<br>${fmt(v)} de ${fmt(RIFA.total)}</b><span>${Math.floor(pct)}%</span></div><div class="prog"><i style="width:${pct}%"></i></div></div>
        <p class="d-when">${IC.cal}Sorteo: al venderse todos los tickets</p>
        <details class="d-more"><summary>Detalles</summary>
          <p>Compra de 1 a ${RIFA.maxCompra} tickets por operación. Numeración del ${pad(0)} al ${pad(RIFA.total - 1)}. El resultado queda en un acta verificable.</p>
        </details>
      </div>`, "detail", `<div class="a-foot">${abierta ? `<button class="a-btn" data-go="buy">Comprar rifas</button>` : `<button class="a-btn" data-go="result">Ver resultado del sorteo</button>`}</div>`);
  },

  buy: () => {
    const total = ui.qty * RIFA.precio;
    const pago = (k, ic, label) => `<button class="pay-opt ${ui.pay === k ? "on" : ""}" data-pay="${k}" role="radio" aria-checked="${ui.pay === k}">${ic}<span>${label}</span><i></i></button>`;
    return pantalla(cabecera("Comprar rifas", { back: "detail" }), `
      <div class="b-sum"><img src="${RIFA.img}" alt=""><div><b>${RIFA.titulo}</b><small>Precio por rifa: <strong>${bs(RIFA.precio)}</strong></small></div></div>
      <h5 class="a-h">¿Cuántas rifas deseas?<small>(1 a ${RIFA.maxCompra})</small></h5>
      <div class="stepper"><button data-act="menos" aria-label="Quitar uno">−</button><b aria-live="polite">${ui.qty}</b><button data-act="mas" aria-label="Agregar uno">+</button></div>
      <div class="b-total"><span>Total a pagar</span><b>${bs(total)}</b></div>
      <h5 class="a-h">Tus números <small>(opcional)</small></h5>
      <div class="pick-row"><input id="pickInput" inputmode="numeric" maxlength="4" placeholder="Ej. ${pad(RIFA.inicioAuto)}" aria-label="Número preferido"><button data-act="pick">Agregar</button></div>
      <div class="pick-list">${ui.picks.length ? ui.picks.map((n) => `<button data-unpick="${n}" aria-label="Quitar ${pad(n)}">${pad(n)} ×</button>`).join("") : ""}<small>${ui.picks.length >= ui.qty ? "Elegiste todos tus números." : `${ui.qty - ui.picks.length} se asignará${ui.qty - ui.picks.length === 1 ? "" : "n"} automáticamente.`}</small></div>
      <h5 class="a-h">Pagar con:</h5>
      <div class="pay-list" role="radiogroup" aria-label="Medio de pago">
        ${pago("wallet", IC.wallet, `Mi billetera <small>(Saldo: ${bsDec(S.saldo)})</small>`)}
        ${pago("card", IC.card, "Tarjeta de crédito / débito")}
        ${pago("qr", IC.qr, "Código QR (banco o billetera)")}
      </div>`, "buy", `<div class="a-foot"><button class="a-btn" data-act="confirmar">Confirmar compra</button></div>`);
  },

  tickets: () => {
    const rifas = ui.tTab === "rifas";
    const estado = S.rifa.status === "open" ? ["ok", "En participación"] : S.tickets.includes(S.rifa.ganador) ? ["win", "¡Ticket ganador!"] : ["end", "Sorteo finalizado"];
    const jugadas = S.mov.filter((m) => m.tipo === "rasp").reverse();
    return pantalla(cabecera("Mis tickets", { back: "home" }), `
      <div class="seg"><button data-ttab="rifas" class="${rifas ? "on" : ""}">Sorteos / Rifas</button><button data-ttab="rasp" class="${rifas ? "" : "on"}">Raspaditas</button></div>
      ${rifas ? (S.tickets.length ? `<article class="t-card">
        <div class="t-top"><img src="${RIFA.img}" alt=""><b>${RIFA.titulo}</b></div>
        <small class="t-lbl">Mis números (${S.tickets.length})</small>
        <div class="t-nums">${[...S.tickets].sort((a, b) => a - b).map((n) => `<span>${pad(n)}</span>`).join("")}</div>
        <div class="t-state">Estado: <em class="${estado[0]}">${estado[1]}</em></div>
        <button class="a-btn ghost" data-go="${S.rifa.status === "open" ? "detail" : "result"}">Ver detalles</button>
      </article>` : `<div class="empty-s"><p>Aún no tienes tickets en esta rifa.</p><button class="a-btn" data-go="detail">Ver la Gran Rifa</button></div>`)
      : (jugadas.length ? jugadas.map(filaMov).join("") : `<div class="empty-s"><p>Aún no has jugado raspaditas.</p><button class="a-btn" data-go="scratch">Jugar ahora</button></div>`)}`, "tickets", tabbar("tickets"));
  },

  scratch: () => {
    const r = ui.scratch;
    const fin = r && r.fin;
    return `<div class="v-promo v-scratch screen-in">${bandas()}
      <header class="a-head clear"><button class="a-ico" data-go="home" aria-label="Volver">${IC.back}</button><h4>Raspaditas</h4><span class="a-ico"></span></header>
      <div class="r-title"><b>Raspadita</b><span>¡Raspa y gana<br>de inmediato!</span></div>
      <div class="r-frame">
        <div class="r-card">
          ${r ? `<div class="r-cells">${r.celdas.map((c) => `<span class="${fin && r.premio && c === r.simbolo ? "hit" : ""}">${c}</span>`).join("")}</div>` : ""}
          ${!r || !fin ? `<div class="foil" id="foil"><span class="foil-tip">${IC.hand}${r ? "Raspa aquí" : "Compra para raspar"}</span></div>` : ""}
        </div>
      </div>
      ${fin && !r.premio ? `<p class="r-msg">Esta vez no hubo tres iguales. ¡Prueba otra vez!</p>` : `<p class="r-msg">${r ? "Encuentra tres símbolos iguales" : "Cada raspadita por"}</p>`}
      ${r && !fin ? `<button class="a-pill ghost-pill" data-act="revelar">Revelar todo</button>` : `<button class="price-pill" data-act="jugar">${r ? "Otra por " : "Comprar · "}${bs(RASPADITA.precio)}</button>`}
      <small class="r-odds">Saldo: ${bsDec(S.saldo)} · Ejemplo: 💎💎💎 ${bs(100)} (1 de 10) · ⭐⭐⭐ ${bs(20)} (1 de 3)</small>
    </div>`;
  },

  win: () => {
    const w = ui.win || { monto: 100 };
    return `<div class="v-promo v-win screen-in">${bandas()}<canvas class="confetti"></canvas>
      <h3 class="w-title">¡Felicidades!</h3>
      <div class="glow">${giftArt()}</div>
      <div class="w-amt"><span>Ganaste</span><b>${bs(w.monto)}</b></div>
      <button class="a-pill" data-act="reclamar">Reclamar premio</button>
      <button class="a-link light" data-act="volverwin">Volver</button>
    </div>`;
  },

  wallet: () => {
    const m = (k, ic, t, s) => `<button class="w-method ${ui.recarga === k ? "on" : ""}" data-recarga="${k}"><span class="w-ic ic-${k}">${ic}</span><div><b>${t}</b><small>${s}</small></div>${IC.chev}</button>`;
    const fijo = RECARGA.montos.includes(ui.monto);
    return pantalla(cabecera("Cargar mi billetera", { back: "home" }), `
      <div class="w-now">${IC.wallet}<div><small>Saldo actual</small><b>${bsDec(S.saldo)}</b></div></div>
      <h5 class="a-h">Elige un método de carga</h5>
      ${m("qr", IC.qr, "Código QR", "(Paga desde tu banco o billetera digital)")}
      ${m("card", IC.card, "Tarjeta de crédito / débito", "Visa, Mastercard, etc.")}
      <h5 class="a-h">Monto a cargar</h5>
      <div class="w-amts">${RECARGA.montos.map((v) => `<button data-monto="${v}" class="${ui.monto === v ? "on" : ""}">${bs(v)}</button>`).join("")}</div>
      <label class="w-other"><span>Otro monto</span><div><em>Bs</em><input id="otroMonto" inputmode="numeric" maxlength="5" placeholder="0,00" value="${fijo ? "" : ui.monto || ""}"></div></label>`, "wallet",
      `<div class="a-foot"><button class="a-btn" data-act="cargar">Cargar saldo</button></div>${tabbar("wallet")}`);
  },

  history: () => {
    const tab = ui.hTab;
    const tb = (k, l) => `<button data-htab="${k}" class="${tab === k ? "on" : ""}">${l}</button>`;
    let filas;
    if (tab === "premios") {
      filas = [...S.premios].reverse().map((p) => `<div class="h-row">${raspaArt()}<div><b>${esc(p.titulo)}</b><small>${fecha(p.ts)}</small></div>${p.estado === "pendiente" ? `<button class="h-claim" data-claim="${p.id}">Reclamar ${bs(p.monto)}</button>` : `<em>Pagado<br>${bs(p.monto)}</em>`}</div>`).join("");
    } else {
      filas = S.mov.filter((m) => m.k === (tab === "compras" ? "compra" : "carga")).reverse().map(filaMov).join("");
    }
    return pantalla(cabecera("Historial", { back: "home" }), `
      <div class="seg three">${tb("compras", "Compras")}${tb("cargas", "Cargas")}${tb("premios", "Premios")}</div>
      ${filas || `<div class="empty-s"><p>Sin movimientos todavía.</p></div>`}`, "history", tabbar("history"));
  },

  result: () => {
    const r = S.rifa, gano = S.tickets.includes(r.ganador);
    return `<div class="a-screen v-result screen-in"><canvas class="confetti"></canvas>${cabecera("Resultado del sorteo", { back: "home" })}
      <div class="res-hero"><img src="${RIFA.img}" alt="${RIFA.titulo}"></div>
      <div class="res-body">
        <div class="res-tag">Sorteo finalizado</div>
        <small>Número ganador</small>
        <div class="res-num">${r.ganador === null ? "----" : pad(r.ganador)}</div>
        <p>${gano ? "¡Felicidades, es tu número!" : "¡Felicidades al ganador!"}</p>
        <button class="a-pill outline" data-act="acta">Ver acta del sorteo</button>
      </div></div>`;
  },

  perfil: () => pantalla(cabecera("Mi perfil", { back: "home" }), `
    <div class="hello big"><div class="avatar">${esc(iniciales(S.user.name))}</div><div><b>${esc(S.user.name)}</b><small>${esc(S.user.contacto)}</small></div></div>
    <button class="p-row" data-act="verificar"><span>${IC.user}Verificación de identidad</span><em class="${S.verificado ? "ok" : "pend"}">${S.verificado ? "Verificada" : "Pendiente"}</em></button>
    <button class="p-row" data-go="tickets"><span>${IC.ticket}Mis participaciones</span>${IC.chev}</button>
    <button class="p-row" data-act="vpremios"><span>${IC.clock}Historial de premios</span>${IC.chev}</button>
    <button class="p-row" data-act="tema" role="switch" aria-checked="${oscuro}"><span>${IC.moon}Modo oscuro</span><em class="${oscuro ? "ok" : "off"}">${oscuro ? "Activado" : "Desactivado"}</em></button>
    <button class="p-row" data-act="soporte"><span>${IC.bell}Atención y soporte</span>${IC.chev}</button>
    <button class="a-btn ghost" data-act="salir">Cerrar sesión</button>`, "perfil"),

  avisos: () => {
    const lista = [];
    pendientes().forEach((p) => lista.push(["🎁", `Tienes ${bs(p.monto)} por reclamar`, fecha(p.ts)]));
    if (S.rifa.status === "done") lista.push(["🏆", `Sorteo finalizado: número ${pad(S.rifa.ganador)}`, fecha(S.rifa.ts)]);
    if (S.tickets.length) lista.push(["🎟️", `Participas con ${S.tickets.length} ticket(s) en la Gran Rifa`, ""]);
    lista.push(["👋", "Bienvenida a SorteoYa", ""]);
    return pantalla(cabecera("Notificaciones", { back: "home" }), lista.map(([e, t, s]) => `<div class="h-row"><span class="n-ic">${e}</span><div><b>${t}</b>${s ? `<small>${s}</small>` : ""}</div></div>`).join(""), "avisos");
  },
};
function filaMov(m) {
  const art = { rifa: rifaArt, rasp: raspaArt, carga: walletArt }[m.tipo]();
  return `<div class="h-row">${art}<div><b>${esc(m.titulo)}</b><small>${esc(m.sub)}</small><small>${fecha(m.ts)}</small></div>${m.badge ? `<em>Ganaste<br>${bs(m.badge)}</em>` : IC.chev}</div>`;
}

/* ==========================================================
   DEMO — render
   ========================================================== */
const app = $("#app");
app.innerHTML = `<div id="appMain"></div>`;
const main = $("#appMain");

/* ---------- Tema de la app (independiente del tema del sitio) ---------- */
const TEMA_KEY = "ss-sorteoya-tema";
let oscuro = SS.store.get(TEMA_KEY) === "dark";
function aplicarTema(valor) {
  oscuro = valor;
  app.classList.toggle("dark", oscuro);
  SS.store.set(TEMA_KEY, oscuro ? "dark" : "light");
  const b = $("#toolTheme");
  b.textContent = oscuro ? "Ver versión clara" : "Ver versión oscura";
  b.setAttribute("aria-pressed", oscuro);
}

function render(keepScroll = true) {
  const prev = $(".app-scroll", main);
  const top = keepScroll && prev && prev.dataset.screen === ui.screen ? prev.scrollTop : 0;
  main.innerHTML = VIEWS[ui.screen]();
  const sc = $(".app-scroll", main);
  if (sc) sc.scrollTop = top;
  if (ui.screen === "scratch") iniciarRaspado();
  if (ui.screen === "win" || (ui.screen === "result" && ui.festejar)) { confeti(); ui.festejar = false; }
}
function ir(screen) {
  if (!S.user && !["splash", "login"].includes(screen)) screen = "login";
  if (screen !== "scratch" && ui.scratch && ui.scratch.fin) ui.scratch = null;
  ui.screen = screen;
  render(false);
}

/* ---------- Pantallas de referencia (mini) ---------- */
const GALERIA = [
  ["splash", "Bienvenida"], ["login", "Inicio de sesión"], ["home", "Inicio"], ["detail", "Detalle de la rifa"], ["buy", "Comprar rifas"], ["tickets", "Mis tickets"],
  ["scratch", "Raspaditas"], ["win", "Premio ganado"], ["wallet", "Cargar billetera"], ["history", "Historial"], ["result", "Resultado del sorteo"],
];
function vistaEjemplo(key) {
  const sS = S, sU = ui;
  S = ejemplo(key === "result");
  ui = { screen: key, auth: "login", qty: 5, picks: [], pay: "wallet", recarga: "qr", monto: 100, tTab: "rifas", hTab: "compras", scratch: null, win: { monto: 100 } };
  const html = VIEWS[key]();
  S = sS; ui = sU;
  return html;
}
const mini = (key, dark) => `<div class="mini-app" inert><div class="app${dark ? " dark" : ""}">${vistaEjemplo(key)}</div></div>`;
const galeria = (dark) => GALERIA.map(([k, t]) => `<figure class="shot"><div class="mini-phone">${mini(k, dark)}</div><figcaption>${t}</figcaption><button class="shot-open" data-shot="${k}" data-dark="${dark ? 1 : ""}" aria-label="Abrir ${t} en la demo, versión ${dark ? "oscura" : "clara"}"></button></figure>`).join("");

$("#heroPhones").innerHTML = ["splash", "home"].map((k, i) => `<div class="mini-phone hp${i + 1}">${mini(k, i === 1)}</div>`).join("");
$("#gallery").innerHTML = galeria(false);
$("#galleryDark").innerHTML = galeria(true);
$("#pantallas").addEventListener("click", (e) => {
  const b = e.target.closest("[data-shot]"); if (!b) return;
  const k = b.dataset.shot;
  aplicarTema(!!b.dataset.dark);
  S = ejemplo(k === "result");
  if (k === "buy") { S.tickets = []; S.rifa.vendidos = RIFA.vendidos; }
  ui = uiInicial();
  if (k === "win") { const p = { id: "p" + Date.now(), titulo: "Raspadita", monto: 100, ts: Date.now(), estado: "pendiente" }; S.premios.push(p); ui.win = p; }
  guardar(); asegurarCommit();
  ui.screen = k;
  render(false);
  $("#demo").scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ---------- Ingreso ---------- */
function entrar(name, contacto) {
  S.user = { name, contacto };
  guardar();
  toast(`¡Hola, ${primerNombre(name)}!`, "ok");
  ir("home");
}
function onAuth(form) {
  const f = new FormData(form);
  const contacto = String(f.get("contacto") || "").trim();
  const name = String(f.get("name") || "").trim();
  if (ui.auth === "register" && name.length < 3) return toast("Ingresa tu nombre", "err");
  if (!contacto) return toast("Ingresa tu correo o celular", "err");
  if (!String(f.get("pass") || "")) return toast("Ingresa una contraseña", "err");
  entrar(name || "María", contacto);
}

/* ---------- Pagos simulados ---------- */
let qrInterval = null;
function cerrarOverlay() { clearInterval(qrInterval); $(".overlay", main)?.remove(); }
function overlay(html) {
  cerrarOverlay();
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.innerHTML = html;
  main.appendChild(ov);
  return ov;
}
let pagoEnCurso = null;
function pagar(metodo, monto, ok) {
  pagoEnCurso = ok;
  if (metodo === "qr") {
    overlay(`<div class="qr-box"><h4>Paga con QR</h4><canvas class="qr" width="190" height="190" aria-label="Código QR de ejemplo"></canvas><b>${bs(monto)}</b>
      <small>Vence en <span class="timer" id="qrTimer">05:00</span> · esperando confirmación…</small>
      <button class="a-btn" data-act="qrpay">Simular pago desde mi banco</button><button class="a-link" data-act="cancelpay">Cancelar</button>
      <p class="a-hint">En producción el pago se confirma solo.</p></div>`);
    dibujarQR();
    return;
  }
  overlay(`<div><div class="spinner"></div><h4>Procesando pago…</h4><p>Tarjeta de prueba •••• 4242 · ${bs(monto)}</p></div>`);
  setTimeout(() => { cerrarOverlay(); ok(); }, 1400);
}
function acreditar(monto, etiqueta) {
  S.saldo += monto;
  S.mov.push({ k: "carga", tipo: "carga", titulo: "Carga de saldo", sub: `${bs(monto)} · ${etiqueta}`, ts: Date.now() });
  guardar();
  toast(`Se cargaron ${bs(monto)} a tu billetera`, "ok");
  render();
}

/* QR ilustrativo (patrón pseudoaleatorio con buscadores, no es un QR real) */
function dibujarQR() {
  const cv = $("canvas.qr", main); if (!cv) return;
  const venceEn = Date.now() + 5 * 60 * 1000;
  const ctx = cv.getContext("2d"), N = 29, s = cv.width / N;
  let seed = parseInt(randHex(4), 16) || 1;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.fillStyle = "#1d1437";
  const finder = (x, y) => { ctx.fillRect(x * s, y * s, 7 * s, 7 * s); ctx.fillStyle = "#fff"; ctx.fillRect((x + 1) * s, (y + 1) * s, 5 * s, 5 * s); ctx.fillStyle = "#1d1437"; ctx.fillRect((x + 2) * s, (y + 2) * s, 3 * s, 3 * s); };
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inFinder(x, y) && rnd() > 0.52) ctx.fillRect(x * s, y * s, s + 0.4, s + 0.4);
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
  const tick = () => {
    const el = $("#qrTimer"); if (!el) return clearInterval(qrInterval);
    const left = Math.max(0, venceEn - Date.now());
    el.textContent = `${String(Math.floor(left / 60000)).padStart(2, "0")}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}`;
    if (!left) { cerrarOverlay(); toast("El QR venció, genera uno nuevo", "err"); }
  };
  tick(); qrInterval = setInterval(tick, 1000);
}

/* ---------- Compra de tickets ---------- */
function asignarNumeros() {
  const nums = [...ui.picks];
  let n = RIFA.inicioAuto, vueltas = 0;
  while (nums.length < ui.qty && vueltas < RIFA.libres) {
    if (!ocupado(n) && !nums.includes(n)) nums.push(n);
    n = (n + 1) % RIFA.libres; vueltas++;
  }
  return nums.length === ui.qty ? nums : null;
}
function agregarNumero() {
  const el = $("#pickInput");
  const v = el.value.replace(/\D/g, "");
  if (v.length !== 4) return toast("Escribe un número de 4 dígitos", "err");
  const n = +v;
  if (ui.picks.includes(n)) return toast(`Ya elegiste el ${pad(n)}`, "err");
  if (ocupado(n)) return toast(`El ${pad(n)} ya fue vendido. Libres en la demo: ${pad(0)} a ${pad(RIFA.libres - 1)}`, "err");
  if (ui.picks.length >= ui.qty) return toast("Aumenta la cantidad de rifas para agregar más números", "err");
  ui.picks.push(n);
  render();
}
function confirmarCompra() {
  if (S.rifa.status !== "open") return toast("El sorteo ya finalizó", "err");
  const nums = asignarNumeros();
  if (!nums) return toast("No quedan suficientes números libres", "err");
  const total = nums.length * RIFA.precio;
  const emitir = () => {
    S.tickets.push(...nums);
    S.mov.push({ k: "compra", tipo: "rifa", titulo: `Rifa: ${RIFA.corto}`, sub: `${nums.length} ticket${nums.length === 1 ? "" : "s"} (${bs(total)})`, ts: Date.now() });
    guardar();
    ui.picks = []; ui.tTab = "rifas";
    toast(`¡Listo! Compraste ${nums.length} ticket${nums.length === 1 ? "" : "s"}`, "ok");
    ir("tickets");
  };
  if (ui.pay !== "wallet") return pagar(ui.pay, total, emitir);
  if (S.saldo < total) { toast("Saldo insuficiente. Carga tu billetera.", "err"); ui.monto = Math.max(total - S.saldo, RECARGA.min); return ir("wallet"); }
  S.saldo -= total;
  emitir();
}

/* ---------- Raspadita ---------- */
function nuevaJugada() {
  const primera = !S.mov.some((m) => m.tipo === "rasp");
  const r = Math.random();
  const simbolo = primera || r < 0.1 ? "💎" : r < 0.1 + 1 / 3 ? "⭐" : null;     // la primera siempre gana para mostrar el flujo
  const resto = RASPADITA.simbolos.filter((s) => s !== simbolo);
  const celdas = simbolo
    ? barajar([simbolo, simbolo, simbolo, ...barajar(resto.flatMap((s) => [s, s])).slice(0, 6)])
    : barajar(RASPADITA.simbolos.flatMap((s) => [s, s])).slice(0, 9);
  return { celdas, simbolo, premio: simbolo ? RASPADITA.premios[simbolo] : 0, fin: false };
}
function jugar() {
  if (S.saldo < RASPADITA.precio) { toast("Saldo insuficiente. Carga tu billetera.", "err"); return ir("wallet"); }
  S.saldo -= RASPADITA.precio;
  ui.scratch = nuevaJugada();
  ui.scratch.ts = Date.now();
  S.mov.push({ k: "compra", tipo: "rasp", titulo: "Raspadita", sub: `(${bs(RASPADITA.precio)})`, ts: ui.scratch.ts });
  guardar();
  render();
}
function terminarRaspado() {
  const r = ui.scratch;
  if (!r || r.fin) return;
  r.fin = true;
  if (r.premio) {
    const m = S.mov.find((x) => x.ts === r.ts && x.tipo === "rasp");
    if (m) m.badge = r.premio;
    const p = { id: "p" + r.ts, titulo: "Raspadita", monto: r.premio, ts: Date.now(), estado: "pendiente" };
    S.premios.push(p);
    ui.win = p;
    guardar();
    render();
    setTimeout(() => { if (ui.screen === "scratch" && ui.win === p) { ui.scratch = null; ir("win"); } }, 1100);
  } else render();
}
function iniciarRaspado() {
  const foil = $("#foil", main);
  if (!foil || !ui.scratch) return;
  const box = foil.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const cv = document.createElement("canvas");
  cv.className = "foil-canvas";
  cv.width = box.width * dpr; cv.height = box.height * dpr;
  cv.setAttribute("role", "img"); cv.setAttribute("aria-label", "Área para raspar");
  foil.style.background = "none";
  foil.prepend(cv);
  const ctx = cv.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, cv.width, cv.height);
  g.addColorStop(0, "#b9b9c4"); g.addColorStop(0.5, "#8d8d9a"); g.addColorStop(1, "#b0b0bc");
  ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 3 * dpr;
  for (let i = -cv.height; i < cv.width; i += 16 * dpr) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + cv.height, cv.height); ctx.stroke(); }
  ctx.globalCompositeOperation = "destination-out";
  ctx.strokeStyle = "#000"; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 42 * dpr;

  const tip = $(".foil-tip", foil);
  let previo = null, trazos = 0;
  const pos = (e) => { const b = cv.getBoundingClientRect(); return [((e.clientX - b.left) / b.width) * cv.width, ((e.clientY - b.top) / b.height) * cv.height]; };
  const raspado = () => {
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let claros = 0, total = 0;
    for (let i = 3; i < d.length; i += 4 * 32) { total++; if (d[i] < 40) claros++; }
    return claros / total;
  };
  cv.addEventListener("pointerdown", (e) => { cv.setPointerCapture(e.pointerId); previo = pos(e); if (tip) tip.style.opacity = 0; });
  cv.addEventListener("pointermove", (e) => {
    if (!previo) return;
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(previo[0], previo[1]); ctx.lineTo(p[0] + 0.1, p[1]); ctx.stroke();
    previo = p;
    if (++trazos % 10 === 0 && raspado() > 0.55) terminarRaspado();
  });
  const soltar = () => { previo = null; if (ui.scratch && !ui.scratch.fin && raspado() > 0.55) terminarRaspado(); };
  cv.addEventListener("pointerup", soltar);
  cv.addEventListener("pointercancel", soltar);
}
function reclamar(p) {
  if (!p || p.estado !== "pendiente") return;
  p.estado = "pagado";
  S.saldo += p.monto;
  guardar();
  toast(`Se acreditaron ${bs(p.monto)} a tu billetera`, "ok");
}

/* ---------- Sorteo ---------- */
const T = { conteo: 2400, giro: [3800, 4400, 5000, 5600], fin: 6300 };   // línea de tiempo del sorteo (ms)
let sorteoRaf = 0;
async function venderRestantesYSortear() {
  if (S.rifa.status !== "open") { if (S.user) ir("result"); return toast("El sorteo ya se realizó. Reinicia la demo para repetirlo.", "err"); }
  if (!S.user) S.user = { name: "María", contacto: "maria@correo.com" };
  await asegurarCommit();
  const h = await sha256(`${S.rifa.seed}:${RIFA.id}`);
  S.rifa.ganador = Number(BigInt("0x" + h.slice(0, 12)) % BigInt(RIFA.total));
  S.rifa.status = "done";
  S.rifa.ts = Date.now();
  guardar();
  $("#demo").scrollIntoView({ behavior: "smooth", block: "start" });
  animarSorteo();
}
function animarSorteo() {
  cancelAnimationFrame(sorteoRaf);
  ui.festejar = true;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return ir("result");
  const objetivo = pad(S.rifa.ganador).split("").map(Number);
  const CELDAS = 30, ALTO = 90;
  const tiras = objetivo.map((t) => Array.from({ length: CELDAS }, (_, k) => (k === CELDAS - 1 ? t : Math.floor(Math.random() * 10))));
  main.innerHTML = `<div class="draw"><div class="rays"></div><span class="live-tag">SORTEO</span><h4>${RIFA.titulo}</h4><p class="sub">${fmt(RIFA.total)} tickets vendidos</p><div id="dStage"></div></div>`;
  const stage = $("#dStage");
  const t0 = Date.now();
  let fase = "";
  const ease = (x) => 1 - Math.pow(1 - x, 4);
  const frame = () => {
    const el = Date.now() - t0;
    if (!stage.isConnected) return;
    if (el < T.conteo) {
      const c = 3 - Math.floor(el / 800);
      if (fase !== "c" + c) { fase = "c" + c; stage.innerHTML = `<div class="count">${c}</div>`; }
    } else if (el < T.fin) {
      if (fase !== "giro") {
        fase = "giro";
        stage.innerHTML = `<div class="reels">${tiras.map((s) => `<div class="reel"><div class="reel-strip">${s.map((d) => `<div>${d}</div>`).join("")}</div></div>`).join("")}</div>`;
      }
      stage.querySelectorAll(".reel").forEach((reel, i) => {
        const p = Math.min(1, (el - T.conteo) / (T.giro[i] - T.conteo));
        reel.firstChild.style.transform = `translateY(${-ease(p) * (CELDAS - 1) * ALTO}px)`;
        reel.classList.toggle("stop", p >= 1);
      });
    } else return ir("result");
    sorteoRaf = requestAnimationFrame(frame);
  };
  frame();
}
function verActa() {
  const r = S.rifa, propio = S.tickets.includes(r.ganador);
  overlay(`<div class="acta"><h4>Acta del sorteo</h4>
    <dl><dt>Sorteo</dt><dd>${RIFA.id} · ${RIFA.titulo}</dd><dt>Fecha</dt><dd>${fecha(r.ts)}</dd><dt>Tickets</dt><dd>${fmt(RIFA.total)} vendidos</dd>
    <dt>Número ganador</dt><dd><b>${pad(r.ganador)}</b>${propio ? " (tu ticket)" : ""}</dd>
    <dt>Compromiso (publicado al abrir)</dt><dd class="mono">sha256(semilla) = ${r.commit || "—"}</dd><dt>Semilla (revelada al cerrar)</dt><dd class="mono">${r.seed}</dd>
    <dt>Cálculo</dt><dd class="mono">sha256(semilla:${RIFA.id})[0..12] mod ${RIFA.total} = ${r.ganador}</dd></dl>
    <button class="a-btn" data-act="cerraracta">Cerrar</button></div>`);
}
function confeti() {
  const cv = $("canvas.confetti", main);
  if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const dpr = devicePixelRatio;
  const ctx = cv.getContext("2d");
  const W = (cv.width = cv.offsetWidth * dpr), H = (cv.height = cv.offsetHeight * dpr);
  const colors = ["#ff4dc4", "#49d8ff", "#ffc62e", "#b05cff", "#34d399", "#fff"];
  const ps = Array.from({ length: 140 }, () => ({ x: W / 2, y: H * 0.42, vx: (Math.random() - 0.5) * 20 * dpr, vy: (-Math.random() * 16 - 6) * dpr, s: (4 + Math.random() * 6) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[Math.floor(Math.random() * colors.length)] }));
  const t0 = performance.now();
  (function loop(t) {
    if (!document.body.contains(cv)) return;
    ctx.clearRect(0, 0, W, H);
    ps.forEach((p) => { p.vy += 0.45 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    if (t - t0 < 4000) requestAnimationFrame(loop); else ctx.clearRect(0, 0, W, H);
  })(t0);
}

function reiniciar() {
  cancelAnimationFrame(sorteoRaf);
  try { localStorage.removeItem(KEY); } catch (e) {}
  S = nuevoEstado();
  ui = uiInicial();
  asegurarCommit();
  render(false);
  toast("Demo reiniciada");
}

/* ---------- Eventos ---------- */
app.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t || !app.contains(t)) return;
  const d = t.dataset;
  if (d.go) return ir(d.go);
  if (d.auth) { ui.auth = d.auth; return render(false); }
  if (d.pay) { ui.pay = d.pay; return render(); }
  if (d.ttab) { ui.tTab = d.ttab; return render(); }
  if (d.htab) { ui.hTab = d.htab; return render(); }
  if (d.recarga) { ui.recarga = d.recarga; return render(); }
  if (d.monto) { ui.monto = +d.monto; return render(); }
  if (d.unpick) { ui.picks = ui.picks.filter((n) => n !== +d.unpick); return render(); }
  if (d.claim) { reclamar(S.premios.find((p) => p.id === d.claim)); return render(); }
  const act = d.act;
  if (act === "eye") { const inp = t.parentElement.querySelector("input"); inp.type = inp.type === "password" ? "text" : "password"; }
  if (act === "olvide") toast("En la app real recibirás un enlace para recuperarla");
  if (act === "social") entrar("María", "maria@correo.com");
  if (act === "menos") { ui.qty = Math.max(1, ui.qty - 1); ui.picks = ui.picks.slice(0, ui.qty); render(); }
  if (act === "mas") { if (ui.qty >= RIFA.maxCompra) return toast(`Límite de compra: ${RIFA.maxCompra} rifas por operación`, "err"); ui.qty++; render(); }
  if (act === "pick") agregarNumero();
  if (act === "confirmar") confirmarCompra();
  if (act === "cargar") {
    if (!ui.monto || ui.monto < RECARGA.min || ui.monto > RECARGA.max) return toast(`El monto debe estar entre ${bs(RECARGA.min)} y ${bs(RECARGA.max)}`, "err");
    const monto = ui.monto, metodo = ui.recarga;
    pagar(metodo, monto, () => acreditar(monto, metodo === "qr" ? "QR" : "tarjeta"));
  }
  if (act === "qrpay") { cerrarOverlay(); const ok = pagoEnCurso; pagoEnCurso = null; ok && ok(); }
  if (act === "cancelpay") { pagoEnCurso = null; cerrarOverlay(); }
  if (act === "jugar") jugar();
  if (act === "revelar") terminarRaspado();
  if (act === "reclamar") { reclamar(ui.win); ui.win = null; ir("wallet"); }
  if (act === "volverwin") { ui.win = null; toast("Tu premio quedó pendiente en Historial › Premios"); ui.hTab = "premios"; ir("home"); }
  if (act === "acta") verActa();
  if (act === "cerraracta") cerrarOverlay();
  if (act === "verificar") { S.verificado = !S.verificado; guardar(); render(); toast(S.verificado ? "Identidad verificada (simulado)" : "Verificación pendiente"); }
  if (act === "vpremios") { ui.hTab = "premios"; ir("history"); }
  if (act === "tema") { aplicarTema(!oscuro); render(); }
  if (act === "soporte") toast("En la app real se abrirá el canal de atención");
  if (act === "salir") { S.user = null; guardar(); ui = uiInicial(); render(false); }
});
app.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "authForm") onAuth(e.target);
});
app.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "otroMonto") {
    el.value = el.value.replace(/\D/g, "");
    ui.monto = +el.value;
    app.querySelectorAll("[data-monto]").forEach((b) => b.classList.toggle("on", +b.dataset.monto === ui.monto));
  }
  if (el.id === "pickInput") el.value = el.value.replace(/\D/g, "");
});
app.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "pickInput") { e.preventDefault(); agregarNumero(); } });

$("#toolFill").addEventListener("click", venderRestantesYSortear);
$("#toolTheme").addEventListener("click", () => { aplicarTema(!oscuro); render(); });
$("#toolReset").addEventListener("click", () => { if (confirm("¿Reiniciar la demo? Se borrarán tus tickets y movimientos de prueba.")) reiniciar(); });

/* ---------- inicio ---------- */
aplicarTema(oscuro);
asegurarCommit();
render(false);
