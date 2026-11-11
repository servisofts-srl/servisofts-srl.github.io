/* ==========================================================
   COT-2026-003 · Plataforma de Raspaditas Digitales y Físicas
   1) PROPUESTA → contenido comercial de la cotización
   2) MODOS     → las cinco modalidades (usadas en la sección y en la demo)
   3) Demo      → app Raspaditas funcional local (localStorage)
   ========================================================== */

const PROPUESTA = {
  plazoMeses: 4,
  mantenimiento: 300,
  descripcion: [
    "Venta de raspaditas por canales digitales y en puntos de venta físicos.",
    "Cinco modalidades de juego en un único ecosistema.",
    "Motor centralizado de resultados y premios.",
    "Tarjetas físicas con código único y QR validable.",
    "Gestión de distribuidores, vendedores, inventarios y comisiones.",
    "Reportes, control financiero y auditoría de operaciones.",
  ],
  componentes: [
    ["📱", "Aplicaciones para usuarios", ["Aplicación móvil Android", "Aplicación móvil iOS", "Plataforma web adaptable a móviles", "Registro e inicio de sesión", "Billetera digital", "Gestión de compras y transacciones", "Historial de participaciones y premios", "Consulta de resultados"]],
    ["🎫", "Cinco modalidades de raspaditas", ["Raspadita clásica", "Raspadita de números", "Raspadita multiplicador", "Raspadita de fortuna", "Raspadita especial", "Identidad visual, mecánica y reglas propias", "Motor centralizado de resultados y premios"]],
    ["🖥️", "Panel administrativo web", ["Administración de juegos y emisiones", "Gestión de tarjetas y resultados", "Administración de usuarios", "Gestión de premios", "Control de ventas", "Gestión de distribuidores y vendedores", "Administración de inventarios", "Reportes y estadísticas", "Control financiero", "Configuración general del sistema"]],
    ["🧾", "Sistema de raspaditas físicas", ["Generación y administración de tarjetas", "Generación de códigos QR únicos", "Validación digital de tarjetas", "Control de lotes y emisiones", "Gestión de inventarios", "Registro de distribución", "Integración con puntos de venta físicos"]],
    ["🏪", "Aplicación para vendedores", ["Inicio de sesión", "Registro y consulta de ventas", "Escaneo y validación de tarjetas", "Consulta de premios", "Gestión de inventarios asignados", "Control de comisiones", "Consulta de liquidaciones"]],
    ["🛡️", "Infraestructura y seguridad", ["Backend centralizado", "Diseño e implementación de base de datos", "Motor de juegos y resultados", "Integración de medios de pago", "Sistema de auditoría", "Seguridad de operaciones", "Configuración de servidores", "Despliegue y puesta en funcionamiento"]],
  ],
  flujoFisico: [
    ["🗂️", "Emisión de lote", "Generación de tarjetas, códigos únicos y QR"],
    ["🖨️", "Impresión", "Producción en la imprenta elegida por el cliente"],
    ["📦", "Distribución", "Asignación de inventario a distribuidores y vendedores"],
    ["🏪", "Venta", "Registro de la venta en la app de vendedores"],
    ["✅", "Validación", "Escaneo del QR, consulta y pago del premio"],
  ],
  meses: [
    ["Mes 1", "Análisis, arquitectura, diseño UX/UI y desarrollo inicial del backend."],
    ["Mes 2", "Motor de juegos, panel administrativo y plataforma web."],
    ["Mes 3", "Aplicaciones Android, iOS, aplicación de vendedores y modalidades de raspaditas."],
    ["Mes 4", "Integraciones, pruebas funcionales, seguridad, despliegue y entrega."],
  ],
  pagos: [
    ["Primer pago", "Inicio del proyecto", 3100],
    ["Segundo pago", "Avance del desarrollo", 2800],
    ["Tercer pago", "Entrega de aplicaciones y funcionalidades", 2800],
    ["Cuarto pago", "Pruebas, despliegue y entrega final", 2800],
  ],
  incluyeMantenimiento: ["Monitoreo del funcionamiento de la plataforma", "Mantenimiento correctivo", "Corrección de errores", "Supervisión de respaldos", "Actualizaciones menores", "Soporte técnico"],
  entrega: ["Plataforma web para usuarios", "Aplicación Android", "Aplicación iOS", "Aplicación para vendedores", "Panel administrativo web", "Backend y motor central de raspaditas", "Cinco modalidades de juego implementadas", "Sistema de administración de tarjetas físicas", "Sistema de validación mediante códigos QR", "Base de datos", "Documentación técnica", "Manual de administración", "Capacitación para el uso de la plataforma", "Código fuente y repositorios del proyecto"],
  imprenta: ["Diseño y preparación de archivos para impresión", "Tipo y calidad de papel o material", "Impresión a color", "Recubrimiento especial raspable", "Elementos de seguridad", "Numeración y códigos QR individuales", "Acabados, corte y empaquetado", "Cantidad de unidades por tiraje"],
  externos: ["Adquisición de equipos para puntos de venta", "Costos recurrentes de servidores e infraestructura", "Comisiones de pasarelas de pago", "Servicios externos de SMS, correo y notificaciones sujetos a consumo"],
  consideraciones: [
    "Diseñada para iniciar operaciones en Santa Cruz de la Sierra y permitir una futura expansión a otros departamentos de Bolivia.",
    "Arquitectura modular y escalable: nuevas modalidades, puntos de venta y funcionalidades sin reconstruir la plataforma.",
    "Los cambios sustanciales en los requerimientos aprobados se evaluarán y cotizarán por separado.",
  ],
};

/* ---------------- modalidades (precios y premios de ejemplo) ---------------- */
const MODOS = {
  clasica: {
    nombre: "Raspadita Clásica", tag: "Gana hasta Bs 5.000", precio: 5, icon: "⭐",
    desc: "Encuentra 3 símbolos iguales y gana el premio.", regla: "Raspa las 3 casillas y descubre tu premio",
    grad: "linear-gradient(160deg,#4c1d95 0%,#7c3aed 55%,#a855f7 100%)",
  },
  numeros: {
    nombre: "Raspadita de Números", tag: "Gana hasta Bs 3.000", precio: 5, icon: "123",
    desc: "Descubre el número ganador.", regla: "Si encuentras el número ganador, ¡ganas el premio de esa casilla!",
    grad: "linear-gradient(160deg,#1e3a8a 0%,#2563eb 55%,#38bdf8 100%)",
  },
  multiplicador: {
    nombre: "Raspadita Multiplicador", tag: "Multiplica tu premio hasta x10", precio: 10, icon: "x10",
    desc: "Descubre un premio y un multiplicador.", regla: "Tu premio se multiplica por el valor que descubras",
    grad: "linear-gradient(160deg,#9f1239 0%,#e11d48 50%,#f97316 100%)",
  },
  fortuna: {
    nombre: "Raspadita de Fortuna", tag: "Gana hasta Bs 4.000", precio: 5, icon: "🍀",
    desc: "Descubre combinaciones de la suerte.", regla: "Encuentra 3 símbolos iguales y gana el premio",
    grad: "linear-gradient(160deg,#14532d 0%,#16a34a 55%,#4ade80 100%)",
  },
  especial: {
    nombre: "Raspadita Especial", tag: "Más oportunidades de ganar", precio: 10, icon: "👑",
    desc: "Combina el juego principal y la zona bonus.", regla: "3 diamantes, zona bonus y premio especial: ¡todo suma!",
    grad: "linear-gradient(160deg,#3b0764 0%,#6d28d9 50%,#c026d3 100%)",
  },
};
const ORDEN = ["clasica", "numeros", "multiplicador", "fortuna", "especial"];
const RECARGA = { montos: [50, 100, 200, 500] };
const FISICAS = {
  "RSP-0001-4821": { premio: 50 },
  "RSP-0002-7390": { premio: 0 },
  "RSP-0003-1157": { premio: 200 },
};

/* ---------------- utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const usd = (n) => `USD ${fmt(n)}`;
const bs = (n) => `Bs ${fmt(n)}`;
const bsDec = (n) => `Bs ${fmt(n)},00`;
const toast = (m, t) => window.SS && SS.toast(m, t);
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
const pesado = (tabla) => {            // [[valor, peso], …]
  let r = Math.random() * tabla.reduce((a, t) => a + t[1], 0);
  for (const t of tabla) { if ((r -= t[1]) < 0) return t[0]; }
  return tabla[0][0];
};
const barajar = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = rnd(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fecha = (ts) => {
  const d = new Date(ts), mes = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][d.getMonth()];
  return `${String(d.getDate()).padStart(2, "0")} ${mes}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const arte = (k, cls = "") => {
  const m = MODOS[k];
  return `<div class="r-art ${cls}" style="--g:${m.grad}"><span class="r-art-ic">${m.icon}</span><b>${m.nombre.replace("Raspadita ", "Raspadita<br>")}</b><em>${m.tag}</em></div>`;
};

/* ---------------- secciones estáticas ---------------- */
(function renderPropuesta() {
  const P = PROPUESTA;
  const total = P.pagos.reduce((a, p) => a + p[2], 0);
  const plazo = `${P.plazoMeses} meses`;
  const lista = (sel, items) => { $(sel).innerHTML = items.map((x) => `<li>${x}</li>`).join(""); };

  $("#kTotal").textContent = usd(total);
  $("#kPlazo").textContent = plazo;
  $("#kMant").textContent = usd(P.mantenimiento);
  $("#hPlazo").textContent = `${plazo} (${P.plazoMeses * 4} semanas)`;
  $("#cTotal").textContent = usd(total);
  $("#cPlazo").textContent = plazo;
  $("#cMant").textContent = usd(P.mantenimiento);

  $("#heroCards").innerHTML = ["fortuna", "numeros", "clasica"].map((k, i) => `<div class="hc hc${i}">${arte(k)}</div>`).join("");

  lista("#descList", P.descripcion);

  $("#modeGrid").innerHTML = ORDEN.map((k, i) => {
    const m = MODOS[k];
    return `<article class="mode reveal" style="transition-delay:${i * 60}ms">
      ${arte(k, "lg")}
      <h3>${m.nombre}</h3><p>${m.desc}</p>
      <button class="btn btn-sm" type="button" data-play="${k}">Jugar en la demo</button>
    </article>`;
  }).join("");
  $("#modeGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-play]"); if (!b) return;
    abrirModo(b.dataset.play);
    $("#demo").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#featGrid").innerHTML = P.componentes.map(([e, t, l], i) => `
    <article class="card card-hover feat reveal" style="transition-delay:${i * 50}ms">
      <div class="icon-badge">${e}</div><h3>${t}</h3>
      <ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("");

  $("#flowFisica").innerHTML = P.flujoFisico.map(([e, t, d]) => `<div class="flow-step"><span class="e">${e}</span><b>${t}</b><small>${d}</small></div>`).join("");
  $("#monthList").innerHTML = P.meses.map(([m, t], i) => `<li><span>${i + 1}</span><div><b>${m}</b><p>${t}</p></div></li>`).join("");

  $("#pagoList").innerHTML = P.pagos.map(([n, d, v]) => `<li class="pago"><b>${n}</b><span>${d}</span><strong>${usd(v)}</strong></li>`).join("");
  $("#investTotal").textContent = usd(total);
  $("#investBig").textContent = usd(total);
  $("#mantBig").textContent = usd(P.mantenimiento);
  lista("#mantList", P.incluyeMantenimiento);
  lista("#entregaList", P.entrega);
  lista("#imprentaList", P.imprenta);
  lista("#externosList", P.externos);
  lista("#consideraList", P.consideraciones);
})();

/* ==========================================================
   DEMO — motor de juego (resultados predeterminados por tarjeta)
   ========================================================== */
const cel = (html, cls = "") => ({ html, cls });
const MOTOR = {
  clasica() {
    const tabla = [["💎", 5000], ["⭐", 100], ["💰", 50], ["🔔", 10]];
    const premioDe = Object.fromEntries(tabla);
    let s;
    if (Math.random() < 0.4) { const x = pesado([["💎", 1], ["⭐", 4], ["💰", 8], ["🔔", 14]]); s = [x, x, x]; }
    else { do { s = [0, 0, 0].map(() => pick(tabla)[0]); } while (s[0] === s[1] && s[1] === s[2]); }
    const premio = s[0] === s[1] && s[1] === s[2] ? premioDe[s[0]] : 0;
    return {
      layout: "row3", premio, detalle: premio ? `3 × ${s[0]}` : "",
      cells: s.map((x) => cel(`<span class="sym">${x}</span>`)),
      leyenda: tabla.map(([x, v]) => `${x} ${bs(v)}`),
    };
  },
  numeros() {
    const ganador = 1 + rnd(40);
    const premios = [0, 0, 0].map(() => pesado([[10, 10], [20, 8], [50, 5], [100, 2], [3000, 0.3]]));
    let tus = [];
    while (tus.length < 3) { const n = 1 + rnd(40); if (n !== ganador && !tus.includes(n)) tus.push(n); }
    const gana = Math.random() < 0.35;
    if (gana) tus[rnd(3)] = ganador;
    const premio = tus.reduce((a, n, i) => a + (n === ganador ? premios[i] : 0), 0);
    return {
      layout: "num", premio, detalle: premio ? `Número ganador ${ganador}` : "",
      cells: [
        cel(`<small>Número ganador</small><b class="big">${ganador}</b>`, "wide gold"),
        ...tus.map((n, i) => cel(`<b>${String(n).padStart(2, "0")}</b><small>${bs(premios[i])}</small>`)),
      ],
    };
  },
  multiplicador() {
    const gana = Math.random() < 0.4;
    const base = gana ? pesado([[5, 8], [10, 6], [20, 4], [50, 2]]) : 0;
    const mult = pesado([[2, 8], [3, 6], [5, 4], [10, 1]]);
    const premio = base * mult;
    return {
      layout: "mult", premio, detalle: premio ? `${bs(base)} × ${mult}` : "",
      cells: [
        cel(`<small>Premio</small><b>${base ? bs(base) : "Sin premio"}</b>`, "gold"),
        cel(`<small>Multiplicador</small><b>x${mult}</b>`, "gold"),
      ],
      extra: `<div class="r-mult-out"><small>Tu premio</small><b data-final>Bs ?</b></div>`,
      final: premio ? bs(premio) : "Bs 0",
    };
  },
  fortuna() {
    const tabla = [["🍀", 4000], ["💰", 100], ["🐞", 20], ["🌈", 10]];
    const premioDe = Object.fromEntries(tabla);
    const simbolos = tabla.map((t) => t[0]);
    let s;
    if (Math.random() < 0.38) {
      const x = pesado([["🍀", 1], ["💰", 5], ["🐞", 10], ["🌈", 14]]);
      const otros = barajar(simbolos.filter((y) => y !== x));
      s = barajar([x, x, x, otros[0], otros[0], otros[1]]);
    } else {
      const o = barajar(simbolos);
      s = barajar([o[0], o[0], o[1], o[1], o[2], o[3]]);
    }
    const cuenta = s.reduce((a, x) => ((a[x] = (a[x] || 0) + 1), a), {});
    const ganador = Object.keys(cuenta).find((x) => cuenta[x] >= 3);
    const premio = ganador ? premioDe[ganador] : 0;
    return {
      layout: "grid6", premio, detalle: premio ? `3 × ${ganador}` : "",
      cells: s.map((x) => cel(`<span class="sym">${x}</span>`)),
      leyenda: tabla.map(([x, v]) => `${x} ${bs(v)}`),
    };
  },
  especial() {
    let s;
    if (Math.random() < 0.3) s = ["💎", "💎", "💎"];
    else { do { s = [0, 0, 0].map(() => pick(["💎", "💍", "⭐"])); } while (s[0] === s[1] && s[1] === s[2]); }
    const principal = s.every((x) => x === "💎") ? 100 : 0;
    const bonus = Math.random() < 0.3 ? pick([10, 20, 50]) : 0;
    const especial = Math.random() < 0.08 ? 500 : 0;
    const premio = principal + bonus + especial;
    const partes = [principal && "3 × 💎", bonus && "Zona bonus", especial && "Premio especial"].filter(Boolean);
    return {
      layout: "esp", premio, detalle: partes.join(" + "),
      cells: [
        ...s.map((x) => cel(`<span class="sym">${x}</span>`)),
        cel(`<small>Zona bonus</small><b>${bonus ? `🎁 ${bs(bonus)}` : "✖"}</b>`, "wide gold"),
        cel(`<small>Premio especial</small><b>${especial ? `👑 ${bs(especial)}` : "Sigue intentando"}</b>`, "wide gold"),
      ],
      leyenda: ["3 × 💎 Bs 100", "🎁 Bonus", "👑 Bs 500"],
    };
  },
};

/* ==========================================================
   DEMO — estado
   ========================================================== */
const KEY = "ss-raspaditas-demo-v1";
const nuevoEstado = () => ({
  user: null, saldo: 150, juegos: [], premios: [], fisicas: [],
  notif: [{ t: "🎉 ¡Bienvenido a Raspaditas!", s: "Recibiste Bs 150 de saldo de prueba.", ts: Date.now() }],
});
function cargar() {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
  return nuevoEstado();
}
function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

let S = cargar();
const uiInicial = () => ({ screen: S.user ? "home" : "splash", auth: "login", modo: "clasica", qty: 1, monto: 100, metodo: "qr", play: null, scan: null });
let ui = uiInicial();

const primerNombre = (n) => n.trim().split(/\s+/)[0];
const iniciales = (n) => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
const pendientes = () => S.premios.filter((p) => p.estado === "pendiente");
const notificar = (t, s) => { S.notif.unshift({ t, s, ts: Date.now() }); S.notif = S.notif.slice(0, 20); };

/* ==========================================================
   DEMO — iconos
   ========================================================== */
const IC = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5z"/></svg>',
  games: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 20h6M12 14v6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
};
const tabbar = (on) => `
  <nav class="r-tab">
    <button data-go="home" class="${on === "home" ? "on" : ""}">${IC.home}<span>Inicio</span></button>
    <button data-go="catalogo" class="${on === "catalogo" ? "on" : ""}">${IC.games}<span>Juegos</span></button>
    <button data-go="scan" class="r-tab-qr" aria-label="Validar raspadita física">${IC.qr}</button>
    <button data-go="premios" class="${on === "premios" ? "on" : ""}">${IC.trophy}<span>Premios</span>${pendientes().length ? '<i class="dot"></i>' : ""}</button>
    <button data-go="cuenta" class="${on === "cuenta" ? "on" : ""}">${IC.user}<span>Mi cuenta</span></button>
  </nav>`;
const barra = (titulo, back = "home") => `<div class="r-top"><button data-go="${back}" aria-label="Volver">${IC.back}</button><h4>${titulo}</h4><span></span></div>`;
const logo = (cls = "") => `<div class="r-logo ${cls}"><span>⭐</span><b>Raspaditas</b></div>`;

/* ==========================================================
   DEMO — pantallas
   ========================================================== */
const V = {
  splash: () => ({ tone: "dark", html: `
    <div class="r-splash">
      ${logo("xl")}
      <p>Raspa, juega y gana</p>
      <div class="r-splash-card"><span>⭐</span></div>
      <button class="r-btn gold" data-go="login">Comenzar</button>
    </div>` }),

  login: () => {
    const reg = ui.auth === "registro";
    return { tone: "dark", html: `
    <div class="r-auth">
      <div class="r-auth-head">${logo()}</div>
      <form class="r-auth-body" id="authForm" autocomplete="off">
        <h3>${reg ? "Crea tu cuenta" : "Inicia sesión"}</h3>
        ${reg ? `<label class="r-field">${IC.user}<input name="nombre" placeholder="Nombre completo" required></label>` : ""}
        <label class="r-field">${IC.mail}<input name="contacto" placeholder="Correo o celular" required></label>
        <label class="r-field">${IC.lock}<input name="clave" type="password" placeholder="Contraseña" required></label>
        ${reg ? "" : '<a class="r-link r-right" data-toast="Te enviaríamos un enlace para recuperarla.">¿Olvidaste tu contraseña?</a>'}
        <button class="r-btn" type="submit">${reg ? "Registrarme" : "Ingresar"}</button>
        <div class="r-sep"><span>o continúa con</span></div>
        <div class="r-social"><button type="button" data-social="Apple">Apple</button><button type="button" data-social="Google"><b>G</b> Google</button></div>
        <p class="r-center">${reg ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}<br><a class="r-link" data-auth="${reg ? "login" : "registro"}"><b>${reg ? "Inicia sesión" : "Regístrate"}</b></a></p>
      </form>
    </div>` };
  },

  home: () => ({ tone: "light", tab: "home", html: `
    <div class="r-scroll">
      <div class="r-hello">
        <div class="r-ava">${iniciales(S.user.name)}</div>
        <b>¡Hola, ${esc(primerNombre(S.user.name))}!</b>
        <button class="r-ic" data-go="notif" aria-label="Notificaciones">${IC.bell}</button>
      </div>
      <div class="r-wallet">
        <div><small>Mi billetera</small><b>${bsDec(S.saldo)}</b></div>
        <button data-go="recarga" aria-label="Recargar">${IC.plus}</button>
      </div>
      <div class="r-quick">
        <button data-go="catalogo"><i style="--c:#10b981">🛒</i><span>Comprar raspaditas</span></button>
        <button data-go="juegos"><i style="--c:#7c3aed">🎫</i><span>Mis juegos</span></button>
        <button data-go="premios"><i style="--c:#f59e0b">🏆</i><span>Premios</span></button>
        <button data-go="recarga"><i style="--c:#16a34a">💵</i><span>Recargar</span></button>
      </div>
      <button class="r-banner" data-go="catalogo"><b>¡Raspa y gana premios increíbles!</b><span>🎁</span></button>
      <div class="r-h"><h5>Juegos disponibles</h5><button data-go="catalogo">Ver todos</button></div>
      <div class="r-minis">${ORDEN.map((k) => `<button data-modo="${k}">${arte(k, "sm")}</button>`).join("")}</div>
    </div>` }),

  catalogo: () => ({ tone: "dark", tab: "catalogo", html: `
    ${barra("Raspaditas")}
    <div class="r-scroll r-list">
      ${ORDEN.map((k) => {
        const m = MODOS[k];
        return `<button class="r-row" data-modo="${k}"><i style="--g:${m.grad}">${m.icon}</i><div><b>${m.nombre}</b><small>${m.tag} · ${bs(m.precio)}</small></div>${IC.next}</button>`;
      }).join("")}
    </div>` }),

  compra: () => {
    const m = MODOS[ui.modo], total = m.precio * ui.qty, alcanza = S.saldo >= total;
    return { tone: "light", html: `
    ${barra(m.nombre, "catalogo")}
    <div class="r-scroll r-buy">
      ${arte(ui.modo, "lg")}
      <p class="r-center r-muted">Precio por juego</p>
      <p class="r-center r-price">${bsDec(m.precio)}</p>
      <label class="r-lbl">Cantidad</label>
      <div class="r-stepper">
        <button data-qty="-1" aria-label="Menos" ${ui.qty <= 1 ? "disabled" : ""}>${IC.minus}</button>
        <b>${ui.qty}</b>
        <button data-qty="1" aria-label="Más" ${ui.qty >= 10 ? "disabled" : ""}>${IC.plus}</button>
      </div>
      <div class="r-sum"><span>Total a pagar</span><b>${bsDec(total)}</b></div>
      <div class="r-sum r-sum-s"><span>Saldo en billetera</span><span>${bsDec(S.saldo)}</span></div>
      ${alcanza ? `<button class="r-btn" data-act="pagar">Pagar y jugar</button>` : `<button class="r-btn gold" data-go="recarga">Saldo insuficiente · Recargar</button>`}
      <button class="r-link r-center r-block" data-go="catalogo">Cancelar</button>
    </div>` };
  },

  juego: () => {
    const p = ui.play, c = p.cards[p.idx], m = MODOS[p.modo];
    return { tone: "game", grad: m.grad, html: `
    <div class="r-top on-dark"><button data-act="salir" aria-label="Salir">${IC.back}</button><h4>${m.nombre}</h4><span class="r-count">${p.cards.length > 1 ? `${p.idx + 1}/${p.cards.length}` : ""}</span></div>
    <div class="r-scroll r-game">
      <div class="r-game-title"><b>${m.nombre.replace("Raspadita ", "Raspadita<br>")}</b><em>${m.tag}</em></div>
      <p class="r-game-rule">${m.regla}</p>
      <div class="sc-area sc-${c.layout}" id="scArea">
        ${c.cells.map((x, i) => `<div class="sc-cell ${x.cls}" data-i="${i}"><div class="sc-face">${x.html}</div><canvas></canvas></div>`).join("")}
      </div>
      ${c.extra || ""}
      ${c.leyenda ? `<div class="r-ley">${c.leyenda.map((l) => `<span>${l}</span>`).join("")}</div>` : ""}
      <button class="r-btn ghost-l" data-act="rasparTodo">Raspar todo</button>
      ${p.preview ? '<p class="r-note">Vista previa: este juego no descuenta saldo.</p>' : ""}
    </div>` };
  },

  resultado: () => {
    const p = ui.play, c = p.cards[p.idx], quedan = p.cards.length - p.idx - 1;
    const sigue = quedan > 0 ? `<button class="r-btn ${c.premio ? "ghost-l" : "gold"}" data-act="siguiente">Siguiente raspadita (${p.idx + 2} de ${p.cards.length})</button>` : "";
    if (c.premio) {
      const reclamado = c.reclamado;
      return { tone: "dark", html: `
      <div class="r-result win">
        <div class="r-confetti">${Array.from({ length: 18 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div>
        <div class="r-trophy">🏆</div>
        <h3>¡Felicidades!<br><span>¡Ganaste!</span></h3>
        <div class="r-prize">${bsDec(c.premio)}</div>
        <p>${esc(c.detalle)}</p>
        ${reclamado ? `<div class="r-ok">${IC.check} Premio acreditado a tu billetera</div>` : `<button class="r-btn gold" data-act="reclamar">Reclamar premio</button>`}
        ${sigue}
        <button class="r-link light r-block" data-go="juegos">Ver mis juegos</button>
      </div>` };
    }
    return { tone: "dark", html: `
      <div class="r-result">
        <div class="r-trophy sad">🍀</div>
        <h3>¡Sigue intentando!</h3>
        <p>Esta vez no hubo premio. La suerte puede estar en la próxima raspadita.</p>
        ${sigue || `<button class="r-btn gold" data-modo="${p.modo}">Jugar otra vez</button>`}
        <button class="r-link light r-block" data-go="juegos">Ver mis juegos</button>
      </div>` };
  },

  recarga: () => ({ tone: "light", html: `
    ${barra("Recargar billetera")}
    <div class="r-scroll">
      <div class="r-wallet sm"><div><small>Saldo actual</small><b>${bsDec(S.saldo)}</b></div></div>
      <label class="r-lbl">Monto</label>
      <div class="r-chips">${RECARGA.montos.map((v) => `<button data-monto="${v}" class="${ui.monto === v ? "on" : ""}">${bs(v)}</button>`).join("")}</div>
      <label class="r-lbl">Método de pago</label>
      <div class="r-chips two">
        <button data-metodo="qr" class="${ui.metodo === "qr" ? "on" : ""}">📲 QR simple</button>
        <button data-metodo="tarjeta" class="${ui.metodo === "tarjeta" ? "on" : ""}">💳 Tarjeta</button>
      </div>
      <p class="r-note">Pago simulado: no se solicitan datos reales.</p>
      <button class="r-btn" data-act="recargar">Recargar ${bs(ui.monto)}</button>
    </div>` }),

  juegos: () => ({ tone: "light", tab: "home", html: `
    ${barra("Mis juegos")}
    <div class="r-scroll">
      ${S.juegos.length ? S.juegos.map((j) => `
        <div class="r-tx"><i style="--g:${MODOS[j.modo].grad}">${MODOS[j.modo].icon}</i>
          <div><b>${MODOS[j.modo].nombre}</b><small>${fecha(j.ts)} · ${bs(j.costo)}</small></div>
          <span class="${j.premio ? "win" : ""}">${j.premio ? `+${bs(j.premio)}` : "Sin premio"}</span></div>`).join("")
        : `<div class="r-empty">🎫<p>Aún no jugaste. ¡Elige una raspadita!</p><button class="r-btn" data-go="catalogo">Ver juegos</button></div>`}
    </div>` }),

  premios: () => {
    const pend = pendientes(), cobrados = S.premios.filter((p) => p.estado !== "pendiente");
    const fila = (p) => `<div class="r-tx"><i class="gold">${p.origen === "fisica" ? "🧾" : "🏆"}</i><div><b>${esc(p.titulo)}</b><small>${fecha(p.ts)}</small></div>
      ${p.estado === "pendiente" ? `<button class="r-mini-btn" data-reclamar="${p.id}">Reclamar ${bs(p.monto)}</button>` : `<span class="win">${bs(p.monto)}</span>`}</div>`;
    return { tone: "light", tab: "premios", html: `
    ${barra("Premios")}
    <div class="r-scroll">
      <div class="r-h"><h5>Por reclamar</h5></div>
      ${pend.length ? pend.map(fila).join("") : '<p class="r-empty-s">No tienes premios pendientes.</p>'}
      <div class="r-h"><h5>Acreditados</h5></div>
      ${cobrados.length ? cobrados.map(fila).join("") : '<p class="r-empty-s">Tus premios cobrados aparecerán aquí.</p>'}
    </div>` };
  },

  scan: () => {
    const r = ui.scan;
    return { tone: "dark", tab: "scan", html: `
    ${barra("Validar raspadita física")}
    <div class="r-scroll r-scan">
      <div class="r-viewfinder ${r ? "done" : ""}"><i></i><i></i><i></i><i></i>${r ? "" : '<span class="r-laser"></span>'}<b>${IC.qr}</b></div>
      ${r ? `<div class="r-scan-res ${r.tipo}"><b>${esc(r.titulo)}</b><small>${esc(r.texto)}</small></div>` : '<p class="r-center r-muted-d">Apunta la cámara al código QR de la tarjeta o ingresa el código impreso.</p>'}
      <button class="r-btn gold" data-act="simularScan">Simular escaneo</button>
      <form class="r-code" id="codeForm"><input name="code" placeholder="RSP-0000-0000" autocomplete="off" aria-label="Código de la tarjeta"><button class="r-btn" type="submit">Validar</button></form>
      <p class="r-note dark">Códigos de prueba: ${Object.keys(FISICAS).join(" · ")}</p>
    </div>` };
  },

  notif: () => ({ tone: "light", html: `
    ${barra("Notificaciones")}
    <div class="r-scroll">${S.notif.map((n) => `<div class="r-notif"><b>${esc(n.t)}</b><small>${esc(n.s)}</small><em>${fecha(n.ts)}</em></div>`).join("")}</div>` }),

  cuenta: () => ({ tone: "light", tab: "cuenta", html: `
    ${barra("Mi cuenta")}
    <div class="r-scroll">
      <div class="r-profile"><div class="r-ava lg">${iniciales(S.user.name)}</div><div><b>${esc(S.user.name)}</b><small>${esc(S.user.contacto)}</small></div></div>
      <div class="r-wallet sm"><div><small>Mi billetera</small><b>${bsDec(S.saldo)}</b></div><button data-go="recarga" aria-label="Recargar">${IC.plus}</button></div>
      <div class="r-menu">
        <button data-go="juegos">🎫 Historial de juegos</button>
        <button data-go="premios">🏆 Gestión y reclamo de premios</button>
        <button data-go="scan">🔍 Validar raspadita física</button>
        <button data-go="notif">🔔 Notificaciones y promociones</button>
        <button data-toast="Soporte por chat y WhatsApp en la versión final.">💬 Soporte</button>
        <button data-act="logout">↩️ Cerrar sesión</button>
      </div>
    </div>` }),
};

/* ==========================================================
   DEMO — render y acciones
   ========================================================== */
const app = $("#app");
function render() {
  const v = V[ui.screen]();
  app.dataset.tone = v.tone;
  app.style.setProperty("--g", v.grad || "none");
  app.innerHTML = `<div class="r-screen screen-in">${v.html}</div>${v.tab ? tabbar(v.tab) : ""}`;
  if (ui.screen === "juego") iniciarRaspado();
  if (ui.screen === "resultado" && ui.play.cards[ui.play.idx].premio) setTimeout(() => app.querySelector(".r-prize")?.classList.add("pop"), 50);
}
const ir = (screen) => {
  if (!S.user && !["splash", "login"].includes(screen)) screen = "login";
  ui.screen = screen; ui.scan = screen === "scan" ? ui.scan : null;
  render();
};

function abrirModo(k) {
  if (!MODOS[k]) return;
  ui.modo = k; ui.qty = 1;
  ir("compra");
}
function nuevaPartida(modo, qty, preview = false) {
  ui.play = { modo, preview, idx: 0, cards: Array.from({ length: qty }, () => ({ ...MOTOR[modo](), revelado: false, reclamado: false })) };
}
function pagar() {
  const m = MODOS[ui.modo], total = m.precio * ui.qty;
  if (S.saldo < total) return toast("Saldo insuficiente", "err");
  S.saldo -= total;
  nuevaPartida(ui.modo, ui.qty);
  guardar();
  ir("juego");
}
function registrar(modo, c) {
  c.revelado = true;
  const id = c.id = `j${Date.now()}${rnd(100000)}`;
  S.juegos.unshift({ id, modo, ts: Date.now(), costo: MODOS[modo].precio, premio: c.premio });
  S.juegos = S.juegos.slice(0, 40);
  if (c.premio) S.premios.unshift({ id, titulo: MODOS[modo].nombre, monto: c.premio, ts: Date.now(), estado: "pendiente", origen: "digital" });
}
function terminarCarta() {
  const p = ui.play, c = p.cards[p.idx];
  if (c.revelado) return;
  c.revelado = true;
  const out = app.querySelector("[data-final]"); if (out && c.final) out.textContent = c.final;
  if (!p.preview) { registrar(p.modo, c); guardar(); }
  setTimeout(() => { if (ui.screen === "juego" && ui.play === p) ir("resultado"); }, 900);
}
function reclamar(id) {
  const pr = S.premios.find((x) => x.id === id && x.estado === "pendiente");
  if (!pr) return false;
  pr.estado = "acreditado"; S.saldo += pr.monto;
  notificar("🏆 Premio acreditado", `${bs(pr.monto)} de ${pr.titulo} ya están en tu billetera.`);
  guardar(); toast(`${bs(pr.monto)} acreditados a tu billetera`, "ok");
  return true;
}
function validarFisica(code) {
  code = code.trim().toUpperCase();
  const t = FISICAS[code];
  if (!t) ui.scan = { tipo: "err", titulo: "Código no válido", texto: `${code || "El código"} no corresponde a ninguna tarjeta emitida.` };
  else if (S.fisicas.includes(code)) ui.scan = { tipo: "warn", titulo: "Tarjeta ya validada", texto: `${code} fue validada anteriormente y no puede cobrarse de nuevo.` };
  else {
    S.fisicas.push(code);
    if (t.premio) {
      const id = `f${Date.now()}`;
      S.premios.unshift({ id, titulo: `Raspadita física ${code}`, monto: t.premio, ts: Date.now(), estado: "pendiente", origen: "fisica" });
      reclamar(id);
      ui.scan = { tipo: "ok", titulo: `¡Tarjeta premiada! ${bs(t.premio)}`, texto: `${code} validada. El premio se acreditó a tu billetera.` };
    } else ui.scan = { tipo: "info", titulo: "Tarjeta válida sin premio", texto: `${code} es auténtica, pero no tiene premio. ¡Gracias por jugar!` };
    guardar();
  }
  render();
}

app.addEventListener("click", (e) => {
  const t = e.target.closest("button, a"); if (!t || !app.contains(t)) return;
  const d = t.dataset;
  if (d.go) return ir(d.go);
  if (d.modo) return abrirModo(d.modo);
  if (d.toast) return toast(d.toast);
  if (d.auth) { ui.auth = d.auth; return render(); }
  if (d.social) { S.user = { name: "Ana Rojas", contacto: `ana@${d.social === "Apple" ? "icloud" : "gmail"}.com` }; guardar(); toast(`Ingresaste con ${d.social}`, "ok"); return ir("home"); }
  if (d.qty) { ui.qty = Math.min(10, Math.max(1, ui.qty + +d.qty)); return render(); }
  if (d.monto) { ui.monto = +d.monto; return render(); }
  if (d.metodo) { ui.metodo = d.metodo; return render(); }
  if (d.reclamar) { reclamar(d.reclamar); return render(); }
  switch (d.act) {
    case "pagar": return pagar();
    case "rasparTodo": return rasparTodo();
    case "salir":
      if (!ui.play.preview) {
        const quedan = ui.play.cards.slice(ui.play.idx).filter((c) => !c.revelado);
        if (quedan.length && !confirm("¿Salir sin raspar? Las raspaditas compradas se revelarán y los premios quedarán en Premios.")) return;
        quedan.forEach((c) => registrar(ui.play.modo, c));
        guardar();
      }
      return ir("juegos");
    case "reclamar": {
      const c = ui.play.cards[ui.play.idx];
      if (ui.play.preview) { c.reclamado = true; toast("Vista previa: el premio no se acredita"); return render(); }
      if (reclamar(c.id)) c.reclamado = true;
      return render();
    }
    case "siguiente": ui.play.idx++; return ir("juego");
    case "recargar": {
      const monto = ui.monto;
      app.insertAdjacentHTML("beforeend", `<div class="overlay"><div><div class="spinner"></div><h4>Procesando pago</h4><p>${ui.metodo === "qr" ? "Confirmando pago QR…" : "Autorizando tarjeta…"}</p></div></div>`);
      setTimeout(() => {
        S.saldo += monto; notificar("💵 Recarga exitosa", `Se acreditaron ${bs(monto)} a tu billetera.`); guardar();
        toast(`Recarga de ${bs(monto)} exitosa`, "ok"); ir("home");
      }, 1200);
      return;
    }
    case "simularScan": {
      const libres = Object.keys(FISICAS).filter((k) => !S.fisicas.includes(k));
      return validarFisica(libres.length ? pick(libres) : pick(Object.keys(FISICAS)));
    }
    case "logout": S.user = null; guardar(); ui = uiInicial(); return render();
  }
});
app.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  if (e.target.id === "authForm") {
    const contacto = String(f.get("contacto")).trim();
    const nombre = String(f.get("nombre") || "").trim() || (contacto.includes("@") ? contacto.split("@")[0] : "Ana Rojas");
    S.user = { name: nombre.charAt(0).toUpperCase() + nombre.slice(1), contacto };
    guardar(); ir("home");
  }
  if (e.target.id === "codeForm") validarFisica(String(f.get("code")));
});

/* ---------------- raspado (canvas por casilla) ---------------- */
let raspado = null;
function iniciarRaspado() {
  const area = $("#scArea", app); if (!area) return;
  const celdas = [...area.querySelectorAll(".sc-cell")].map((el) => {
    const cv = el.querySelector("canvas"), r = el.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr);
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#e5e7eb"); g.addColorStop(0.5, "#9ca3af"); g.addColorStop(1, "#d1d5db");
    ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = "rgba(255,255,255,.35)";
    for (let y = 8; y < r.height; y += 14) for (let x = (y / 14) % 2 ? 4 : 11; x < r.width; x += 14) ctx.fillRect(x, y, 2, 2);
    ctx.fillStyle = "rgba(55,65,81,.55)"; ctx.font = `700 ${Math.min(26, r.height * 0.42)}px system-ui`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(el.classList.contains("wide") ? "RASPA AQUÍ" : "★", r.width / 2, r.height / 2);
    ctx.globalCompositeOperation = "destination-out";
    return { el, cv, ctx, w: r.width, h: r.height, done: false, n: 0 };
  });
  raspado = { area, celdas, activo: false };
  const punto = (ev) => {
    celdas.forEach((c) => {
      if (c.done) return;
      const r = c.cv.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
      if (x < -18 || y < -18 || x > r.width + 18 || y > r.height + 18) return;
      c.ctx.beginPath(); c.ctx.arc(x, y, 17, 0, Math.PI * 2); c.ctx.fill();
      if (++c.n % 6 === 0 && limpio(c) > 0.5) revelar(c);
    });
  };
  area.addEventListener("pointerdown", (ev) => { raspado.activo = true; area.setPointerCapture(ev.pointerId); punto(ev); });
  area.addEventListener("pointermove", (ev) => { if (raspado.activo) punto(ev); });
  const fin = () => { raspado.activo = false; celdas.forEach((c) => { if (!c.done && c.n && limpio(c) > 0.42) revelar(c); }); };
  area.addEventListener("pointerup", fin);
  area.addEventListener("pointercancel", fin);
}
function limpio(c) {
  const d = c.ctx.getImageData(0, 0, c.cv.width, c.cv.height).data;
  let vacio = 0, total = 0;
  for (let i = 3; i < d.length; i += 64) { total++; if (d[i] === 0) vacio++; }
  return total ? vacio / total : 1;
}
function revelar(c) {
  if (c.done) return;
  c.done = true; c.cv.classList.add("gone"); c.el.classList.add("open");
  if (raspado.celdas.every((x) => x.done)) terminarCarta();
}
function rasparTodo() { if (raspado) raspado.celdas.forEach(revelar); }

/* ---------------- controles de la demo ---------------- */
const SALTOS = [
  ["Inicio", () => { ui.screen = "splash"; render(); }],
  ["Inicio de sesión", () => { ui.auth = "login"; ui.screen = "login"; render(); }],
  ["Menú principal", () => { asegurarUsuario(); ir("home"); }],
  ["Catálogo", () => { asegurarUsuario(); ir("catalogo"); }],
  ["Compra", () => { asegurarUsuario(); abrirModo("clasica"); }],
  ["Juego", () => { asegurarUsuario(); nuevaPartida("clasica", 1, true); ir("juego"); }],
  ["Resultado", () => {
    asegurarUsuario();
    ui.play = { modo: "clasica", preview: true, idx: 0, cards: [{ premio: 100, detalle: "3 × ⭐", revelado: true, reclamado: false, cells: [] }] };
    ir("resultado");
  }],
  ["Validar QR", () => { asegurarUsuario(); ir("scan"); }],
];
function asegurarUsuario() { if (!S.user) { S.user = { name: "Ana Rojas", contacto: "ana@correo.com" }; guardar(); } }
$("#jumpBtns").innerHTML = SALTOS.map(([t], i) => `<button class="btn btn-sm" type="button" data-j="${i}">${t}</button>`).join("");
$("#jumpBtns").addEventListener("click", (e) => { const b = e.target.closest("[data-j]"); if (b) SALTOS[+b.dataset.j][1](); });
$("#toolReset").addEventListener("click", () => {
  S = nuevoEstado(); guardar(); ui = uiInicial(); render(); toast("Demo reiniciada", "ok");
});

render();
