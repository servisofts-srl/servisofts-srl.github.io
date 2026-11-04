/* ==========================================================
   COT-2026-001 · App de Sorteo y Rifa
   1) CONFIG      → reglas de la rifa usadas por la demo
   2) COTIZACION  → módulos, horas, tarifa y cronograma
   3) Demo        → app funcional local (localStorage + BroadcastChannel)
   ========================================================== */

const CONFIG = {
  totalTickets: 600,
  precioTicket: 1000,           // coins por ticket
  moneda: "Bs",
  valorCoin: 1,                 // 1 coin = 1 Bs
  premio: { nombre: "Moto 0 km", emoji: "🏍️" },
  paquetes: [
    { coins: 1000 },
    { coins: 2000 },
    { coins: 5000, bonus: 250 },
    { coins: 10000, bonus: 750 },
  ],
};

const COTIZACION = {
  moneda: "Bs",
  tarifaHora: null,             // ← define la tarifa por hora para calcular la inversión (ej. 120)
  modulos: [
    ["Diseño UX/UI y prototipo", "Flujo completo, identidad visual y prototipo navegable", 40],
    ["Usuarios y autenticación", "Registro, inicio de sesión, recuperación de contraseña y perfil", 50],
    ["Billetera de coins", "Saldo, movimientos, historial y conciliación", 40],
    ["Pago con tarjeta", "Integración con pasarela, 3-D Secure y webhooks", 40],
    ["Pago con QR", "Generación de QR dinámico y confirmación automática", 32],
    ["Rifa y selección de tickets", "Grilla de 600 números, reserva atómica y compra", 56],
    ["Sorteo en vivo", "Tiempo real (WebSocket), animación y verificación pública", 56],
    ["Panel de administración", "Rifas, premios, usuarios, pagos y reportes", 48],
    ["App web responsive", "Versión web/PWA para escritorio y celular", 40],
    ["Apps Android e iOS", "React Native, notificaciones push y publicación en tiendas", 64],
    ["QA, seguridad y despliegue", "Pruebas, auditoría básica, servidor y monitoreo", 34],
  ],
  fases: [
    ["Descubrimiento y diseño", "UX/UI y prototipo", 0, 2],
    ["Backend y billetera", "Usuarios, coins, API", 2, 3],
    ["Pagos tarjeta y QR", "Integraciones", 4, 2],
    ["Rifa y sorteo en vivo", "Tiempo real", 5, 3],
    ["Apps web, Android e iOS", "Frontends", 6, 4],
    ["Panel de administración", "Gestión y reportes", 8, 2],
    ["QA, piloto y publicación", "Tiendas y lanzamiento", 10, 3],
  ],
};

/* ---------------- utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => Number(n).toLocaleString("es-BO");
const DIG = String(CONFIG.totalTickets - 1).length;
const pad = (n) => String(n).padStart(DIG, "0");
const initials = (n) => n.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
const toast = (m, t) => window.SS && SS.toast(m, t);
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
const pwHash = (p) => { let h = 5381; for (const c of p) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(36); };

/* ---------------- secciones estáticas ---------------- */
(function renderPropuesta() {
  $("#hTotal").textContent = fmt(CONFIG.totalTickets);
  $("#hTickets").textContent = fmt(CONFIG.totalTickets);
  $("#heroPrize").textContent = CONFIG.premio.nombre;

  const feats = [
    ["👤", "Cuentas y perfil", "Cada persona crea su usuario y, al ingresar, ve su perfil con saldo y tickets.", ["Registro con correo", "Perfil con saldo de coins", "Historial de movimientos"]],
    ["🪙", "Billetera de coins", "Moneda interna para comprar tickets de forma instantánea.", ["Paquetes con bonificación", "Saldo en tiempo real", "Movimientos auditables"]],
    ["💳", "Recarga con tarjeta o QR", "Pagos con tarjeta de crédito/débito o escaneando un QR desde cualquier banco.", ["Confirmación automática", "Comprobante digital", "Sin datos de tarjeta en nuestros servidores"]],
    ["🎟️", `Rifa de ${fmt(CONFIG.totalTickets)} tickets`, "El usuario elige exactamente los números que quiere.", ["Grilla interactiva", "Búsqueda y número al azar", "Reserva sin duplicados"]],
    ["🎰", "Sorteo en vivo", "Al venderse todos los tickets, el sorteo se transmite a todos al mismo tiempo.", ["Animación con rodillos", "Ganador verificable", "Notificación al ganador"]],
    ["🛡️", "Panel de administración", "Control total del negocio desde un panel web.", ["Crear rifas y premios", "Usuarios y pagos", "Reportes de ventas"]],
  ];
  $("#featGrid").innerHTML = feats.map(([e, t, d, l], i) => `
    <article class="card card-hover feat reveal" style="transition-delay:${i * 50}ms">
      <div class="icon-badge">${e}</div><h3>${t}</h3><p>${d}</p>
      <ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("");

  const flow = [
    ["🔒", "Compromiso", "Se publica el hash de una semilla secreta al abrir la rifa."],
    ["🎟️", "Venta", `Los usuarios compran sus números del ${pad(0)} al ${pad(CONFIG.totalTickets - 1)}.`],
    ["✅", "Cierre", `La rifa se cierra sola al vender los ${fmt(CONFIG.totalTickets)} tickets.`],
    ["📡", "Sorteo en vivo", "Todos ven la misma animación al mismo tiempo."],
    ["🔍", "Verificación", "Se revela la semilla: cualquiera puede recalcular el ganador."],
  ];
  $("#flowList").innerHTML = flow.map(([e, t, d]) => `<div class="flow-step"><span class="e">${e}</span><b>${t}</b><small>${d}</small></div>`).join("");

  const weeks = Math.max(...COTIZACION.fases.map((f) => f[2] + f[3]));
  $("#totalWeeks").textContent = `${weeks} semanas`;
  $("#timeline").innerHTML =
    `<div class="tl-weeks"><div></div><div>${Array.from({ length: weeks + 1 }, (_, i) => `<span>S${i}</span>`).join("")}</div></div>` +
    COTIZACION.fases.map(([t, s, start, dur]) => `
      <div class="tl-row"><div><b>${t}</b><small>${s}</small></div>
        <div class="tl-track"><div class="tl-bar" style="left:${(start / weeks) * 100}%;width:${(dur / weeks) * 100}%">${dur} sem</div></div></div>`).join("");

  const rate = COTIZACION.tarifaHora;
  const money = (n) => `${COTIZACION.moneda} ${fmt(Math.round(n))}`;
  const totalH = COTIZACION.modulos.reduce((a, m) => a + m[2], 0);
  $("#investBody").innerHTML = COTIZACION.modulos.map(([t, d, h]) =>
    `<tr><td>${t}<small>${d}</small></td><td class="num">${h} h</td><td class="num">${rate ? money(h * rate) : "—"}</td></tr>`).join("");
  $("#investHours").textContent = `${totalH} h`;
  $("#investTotal").textContent = rate ? money(totalH * rate) : "—";
  $("#investBig").textContent = rate ? money(totalH * rate) : "A confirmar";
  $("#investNote").textContent = rate ? `${totalH} horas estimadas · ${weeks} semanas` : `${totalH} horas estimadas · ${weeks} semanas · precio final según alcance`;
})();

/* ==========================================================
   DEMO — almacenamiento y sincronización entre pestañas
   ========================================================== */
const KEY = "ss-rifa-demo-v1";
const SKEY = "ss-rifa-session";
let memDB = null, memSession = null;
const bc = "BroadcastChannel" in window ? new BroadcastChannel("ss-rifa-demo") : null;

function loadDB() {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
  return memDB;
}
function saveDB(db, broadcast = true) {
  memDB = db;
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {}
  if (broadcast && bc) bc.postMessage({ t: "sync" });
}
function getSession() { try { return sessionStorage.getItem(SKEY) || memSession; } catch (e) { return memSession; } }
function setSession(email) {
  memSession = email;
  try { email ? sessionStorage.setItem(SKEY, email) : sessionStorage.removeItem(SKEY); } catch (e) {}
}

function newRaffle() {
  return {
    id: "R" + Date.now().toString(36).toUpperCase(),
    premio: CONFIG.premio, total: CONFIG.totalTickets, precio: CONFIG.precioTicket,
    sold: {}, feed: [], seed: randHex(16), commit: null, status: "open", startAt: null, winner: null,
  };
}
async function ensureCommit(db) {
  if (db.raffle.commit) return;
  db.raffle.commit = await sha256(db.raffle.seed);
  saveDB(db);
}
function db() {
  let d = loadDB();
  if (!d || !d.raffle) { d = { users: {}, raffle: newRaffle() }; saveDB(d, false); ensureCommit(d); }
  return d;
}
const me = () => { const e = getSession(); return e ? db().users[e] : null; };
const soldCount = (r) => Object.keys(r.sold).length;

/* ==========================================================
   DEMO — estado de UI y render
   ========================================================== */
const app = $("#app");
app.innerHTML = `<div id="appMain" style="display:flex;flex-direction:column;flex:1;min-height:0"></div><div id="drawLayer"></div>`;
const main = $("#appMain");
const drawLayer = $("#drawLayer");

const ui = { screen: "profile", auth: "register", sel: new Set(), range: 0, pack: 0, method: "card", qr: null, card: { num: "", name: "", exp: "", cvc: "" } };

const IC = {
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16" cy="14.5" r="1.3" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
};

function topbar(title, sub) {
  const u = me();
  return `<div class="a-top"><div><small>${sub}</small><h4>${title}</h4></div>
    <button class="coin-pill" data-go="wallet" aria-label="Saldo de coins"><span class="coin"></span><span id="pillCoins">${fmt(u ? u.coins : 0)}</span></button></div>`;
}
function tabbar() {
  const r = db().raffle;
  const t = (k, label, ic) => `<button data-go="${k}" class="${ui.screen === k ? "on" : ""}">${ic}<span>${label}</span>${k === "raffle" && r.status !== "open" ? '<i class="badge"></i>' : ""}</button>`;
  return `<nav class="tabbar">${t("profile", "Perfil", IC.user)}${t("raffle", "Rifa", IC.ticket)}${t("wallet", "Coins", IC.wallet)}</nav>`;
}

function render(keepScroll = true) {
  const prev = $(".app-scroll", main);
  const top = keepScroll && prev && prev.dataset.screen === ui.screen ? prev.scrollTop : 0;
  const u = me();
  if (!u) { main.innerHTML = authView(); }
  else {
    const view = { profile: profileView, raffle: raffleView, wallet: walletView }[ui.screen]();
    main.innerHTML = view + tabbar();
  }
  const sc = $(".app-scroll", main);
  if (sc) { sc.scrollTop = top; if (!keepScroll) sc.classList.add("screen-in"); }
  if (u && ui.screen === "wallet" && ui.method === "qr") drawQR();
}

/* ---------- Auth ---------- */
function authView() {
  const reg = ui.auth === "register";
  return `<div class="auth screen-in">
    ${SS.logoSVG()}
    <h3>${reg ? "Crea tu cuenta" : "Bienvenido de nuevo"}</h3>
    <p>${reg ? "Regístrate y participa por el premio." : "Ingresa para ver tus coins y tickets."}</p>
    <div class="seg"><button data-auth="register" class="${reg ? "on" : ""}">Crear cuenta</button><button data-auth="login" class="${reg ? "" : "on"}">Ingresar</button></div>
    <form id="authForm" novalidate>
      ${reg ? `<label class="field">Nombre completo<input name="name" autocomplete="name" placeholder="Ej. María López" required></label>` : ""}
      <label class="field">Correo<input name="email" type="email" autocomplete="email" placeholder="tu@correo.com" required></label>
      <label class="field">Contraseña<input name="pass" type="password" autocomplete="${reg ? "new-password" : "current-password"}" placeholder="Mínimo 6 caracteres" required></label>
      <button class="a-btn" type="submit">${reg ? "Crear cuenta" : "Ingresar"}</button>
    </form>
    <p class="a-hint">Demo: los datos se guardan solo en este navegador.</p>
  </div>`;
}
function onAuth(form) {
  const f = new FormData(form);
  const email = String(f.get("email") || "").trim().toLowerCase();
  const pass = String(f.get("pass") || "");
  const d = db();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast("Ingresa un correo válido", "err");
  if (pass.length < 6) return toast("La contraseña debe tener al menos 6 caracteres", "err");
  if (ui.auth === "register") {
    const name = String(f.get("name") || "").trim();
    if (name.length < 3) return toast("Ingresa tu nombre", "err");
    if (d.users[email]) return toast("Ese correo ya está registrado. Ingresa.", "err");
    d.users[email] = { name, email, pass: pwHash(pass), coins: 0, tx: [{ ic: "🎉", label: "Cuenta creada", amount: 0, ts: Date.now() }] };
    saveDB(d);
    toast(`¡Bienvenido, ${name.split(" ")[0]}!`, "ok");
  } else {
    const u = d.users[email];
    if (!u || u.pass !== pwHash(pass)) return toast("Correo o contraseña incorrectos", "err");
    toast(`Hola de nuevo, ${u.name.split(" ")[0]}`, "ok");
  }
  setSession(email);
  ui.screen = "profile";
  render(false);
}

/* ---------- Perfil ---------- */
function profileView() {
  const u = me(), r = db().raffle;
  const mine = Object.entries(r.sold).filter(([, v]) => v.u === u.email).map(([k]) => +k).sort((a, b) => a - b);
  const chance = mine.length ? ((mine.length / r.total) * 100).toFixed(2) : "0";
  return topbar("Mi perfil", "Hola 👋") + `<div class="app-scroll" data-screen="profile">
    <div class="profile-head"><div class="avatar">${esc(initials(u.name))}</div><div><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div></div>
    <div class="wallet">
      <small>Saldo disponible</small>
      <div class="bal"><span class="coin lg"></span><b>${fmt(u.coins)}</b></div>
      <div class="w-actions"><button data-go="wallet">+ Recargar</button><button data-go="raffle">🎟️ Comprar tickets</button></div>
    </div>
    <div class="stats">
      <div class="stat"><b>${mine.length}</b><small>Mis tickets</small></div>
      <div class="stat"><b>${chance}%</b><small>Probabilidad</small></div>
      <div class="stat"><b>${fmt(r.total - soldCount(r))}</b><small>Disponibles</small></div>
    </div>
    <div class="a-h"><h5>Mis números</h5>${mine.length ? "" : '<button data-go="raffle">Elegir →</button>'}</div>
    ${mine.length ? `<div class="my-tix">${mine.map((n) => `<span class="tix">${pad(n)}</span>`).join("")}</div>` : '<div class="empty-s">Aún no tienes tickets en esta rifa.</div>'}
    <div class="a-h"><h5>Movimientos</h5></div>
    <div>${u.tx.slice(-8).reverse().map((t) => `<div class="tx"><i>${t.ic}</i><div><b>${esc(t.label)}</b><small>${new Date(t.ts).toLocaleString("es-BO", { dateStyle: "short", timeStyle: "short" })}</small></div>${t.amount ? `<span class="${t.amount > 0 ? "plus" : "minus"}">${t.amount > 0 ? "+" : ""}${fmt(t.amount)}</span>` : ""}</div>`).join("")}</div>
    <button class="a-btn ghost" style="margin-top:18px" data-act="logout">Cerrar sesión</button>
  </div>`;
}

/* ---------- Billetera ---------- */
function walletView() {
  const p = CONFIG.paquetes[ui.pack];
  const price = p.coins * CONFIG.valorCoin;
  const c = ui.card;
  const brand = c.num.startsWith("4") ? "VISA" : c.num.startsWith("5") ? "Mastercard" : "";
  return topbar("Comprar coins", "Billetera") + `<div class="app-scroll" data-screen="wallet">
    <div class="a-h" style="margin-top:4px"><h5>1. Elige un paquete</h5></div>
    <div class="packs">${CONFIG.paquetes.map((k, i) => `
      <button class="pack ${i === ui.pack ? "on" : ""}" data-pack="${i}">${k.bonus ? `<em>+${fmt(k.bonus)} gratis</em>` : ""}
        <b><span class="coin"></span>${fmt(k.coins)}</b><small>${CONFIG.moneda} ${fmt(k.coins * CONFIG.valorCoin)} · ${Math.floor((k.coins + (k.bonus || 0)) / CONFIG.precioTicket)} ticket(s)</small></button>`).join("")}
    </div>
    <div class="a-h"><h5>2. Método de pago</h5></div>
    <div class="methods">
      <button class="method ${ui.method === "card" ? "on" : ""}" data-method="card"><span>💳</span>Tarjeta</button>
      <button class="method ${ui.method === "qr" ? "on" : ""}" data-method="qr"><span>📱</span>QR</button>
    </div>
    ${ui.method === "card" ? `
      <div class="card-prev"><div class="chipc"></div><span class="brand-c" id="cBrand">${brand}</span>
        <div class="num" id="cNum">${esc(c.num || "•••• •••• •••• ••••")}</div>
        <div class="bot"><span id="cName">${esc(c.name || "NOMBRE APELLIDO")}</span><span id="cExp">${esc(c.exp || "MM/AA")}</span></div></div>
      <form id="cardForm" novalidate>
        <label class="field">Número de tarjeta<input name="num" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" value="${esc(c.num)}" maxlength="19"></label>
        <label class="field">Titular<input name="name" autocomplete="cc-name" placeholder="Como aparece en la tarjeta" value="${esc(c.name)}"></label>
        <div class="row2">
          <label class="field">Vence<input name="exp" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA" value="${esc(c.exp)}" maxlength="5"></label>
          <label class="field">CVC<input name="cvc" inputmode="numeric" autocomplete="cc-csc" placeholder="123" value="${esc(c.cvc)}" maxlength="4"></label>
        </div>
        <div class="summary"><span>Total a pagar</span><b>${CONFIG.moneda} ${fmt(price)}</b></div>
        <button class="a-btn" type="submit">Pagar ${CONFIG.moneda} ${fmt(price)}</button>
        <p class="a-hint">Demo: usa 4242 4242 4242 4242, cualquier fecha futura y CVC.</p>
      </form>` : `
      <div class="qr-box">
        <canvas id="qrCanvas" width="190" height="190" aria-label="Código QR de pago"></canvas>
        <b>${CONFIG.moneda} ${fmt(price)}</b>
        <small>Escanea con la app de tu banco · vence en <span class="timer" id="qrTimer">05:00</span></small>
        <small>Esperando confirmación del banco…</small>
      </div>
      <button class="a-btn hot" data-act="qrpay">Simular pago desde mi banco</button>
      <p class="a-hint">En producción el pago se confirma solo, sin presionar nada.</p>`}
  </div>`;
}
function luhn(n) { let s = 0, alt = false; for (let i = n.length - 1; i >= 0; i--) { let d = +n[i]; if (alt) { d *= 2; if (d > 9) d -= 9; } s += d; alt = !alt; } return s % 10 === 0; }
function onCardPay() {
  const c = ui.card, num = c.num.replace(/\s/g, "");
  if (num.length < 15 || !luhn(num)) return toast("Número de tarjeta inválido", "err");
  if (c.name.trim().length < 3) return toast("Ingresa el nombre del titular", "err");
  const m = c.exp.match(/^(\d{2})\/(\d{2})$/);
  if (!m || +m[1] < 1 || +m[1] > 12 || new Date(2000 + +m[2], +m[1], 1) <= new Date()) return toast("Fecha de vencimiento inválida", "err");
  if (!/^\d{3,4}$/.test(c.cvc)) return toast("CVC inválido", "err");
  processPayment("💳", `Recarga con tarjeta •••• ${num.slice(-4)}`);
}
function processPayment(ic, label) {
  const p = CONFIG.paquetes[ui.pack];
  const total = p.coins + (p.bonus || 0);
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.innerHTML = `<div><div class="spinner"></div><h4>Procesando pago…</h4><p>Confirmando con el banco</p></div>`;
  main.appendChild(ov);
  setTimeout(() => {
    const d = db(), u = d.users[getSession()];
    if (!u) return ov.remove();
    u.coins += total;
    u.tx.push({ ic, label, amount: p.coins, ts: Date.now() });
    if (p.bonus) u.tx.push({ ic: "🎁", label: "Bonificación del paquete", amount: p.bonus, ts: Date.now() });
    saveDB(d);
    ui.card = { num: "", name: "", exp: "", cvc: "" };
    ui.qr = null;
    ov.innerHTML = `<div><div class="success-ic">${IC.check}</div><h4>¡Pago aprobado!</h4><p>Se acreditaron <b>${fmt(total)} coins</b> a tu cuenta.</p>
      <button class="a-btn" data-go="raffle">Elegir mis tickets</button><button class="a-btn ghost" style="margin-top:8px" data-go="profile">Ver mi perfil</button></div>`;
  }, 1800);
}

/* QR ilustrativo (patrón pseudoaleatorio con buscadores, no es un QR real) */
let qrInterval = null;
function drawQR() {
  const cv = $("#qrCanvas"); if (!cv) return;
  if (!ui.qr) ui.qr = { id: randHex(6), exp: Date.now() + 5 * 60 * 1000 };
  const ctx = cv.getContext("2d"), N = 29, s = cv.width / N;
  let seed = parseInt(ui.qr.id.slice(0, 8), 16) || 1;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.fillStyle = "#0b0f24";
  const finder = (x, y) => { ctx.fillRect(x * s, y * s, 7 * s, 7 * s); ctx.fillStyle = "#fff"; ctx.fillRect((x + 1) * s, (y + 1) * s, 5 * s, 5 * s); ctx.fillStyle = "#0b0f24"; ctx.fillRect((x + 2) * s, (y + 2) * s, 3 * s, 3 * s); };
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
  const inLogo = (x, y) => Math.abs(x - 14) < 4 && Math.abs(y - 14) < 4;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inFinder(x, y) && !inLogo(x, y) && rnd() > 0.52) ctx.fillRect(x * s, y * s, s + 0.4, s + 0.4);
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
  const g = ctx.createLinearGradient(70, 70, 120, 120); g.addColorStop(0, "#5b4bff"); g.addColorStop(1, "#22d3ee");
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(cv.width / 2 - 20, cv.height / 2 - 20, 40, 40, 10) : ctx.rect(cv.width / 2 - 20, cv.height / 2 - 20, 40, 40); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "700 22px 'Space Grotesk', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("S", cv.width / 2, cv.height / 2 + 1);
  clearInterval(qrInterval);
  const tick = () => {
    const el = $("#qrTimer"); if (!el) return clearInterval(qrInterval);
    const left = Math.max(0, ui.qr.exp - Date.now());
    el.textContent = `${String(Math.floor(left / 60000)).padStart(2, "0")}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}`;
    if (!left) { ui.qr = null; drawQR(); }
  };
  tick(); qrInterval = setInterval(tick, 1000);
}

/* ---------- Rifa ---------- */
function raffleView() {
  const d = db(), r = d.raffle, u = me();
  const sold = soldCount(r), pct = (sold / r.total) * 100;
  const ranges = Math.ceil(r.total / 100);
  const from = ui.range * 100, to = Math.min(r.total, from + 100);
  const last = r.feed[r.feed.length - 1];
  const closed = r.status !== "open";
  let cells = "";
  for (let n = from; n < to; n++) {
    const o = r.sold[n];
    const cls = o ? (o.u === u.email ? "mine" : "sold") : ui.sel.has(n) ? "sel" : "";
    cells += `<button data-t="${n}" class="${cls}" ${o || closed ? "disabled" : ""} aria-label="Ticket ${pad(n)}${o ? " vendido" : ""}">${pad(n)}</button>`;
  }
  return topbar("Rifa activa", `Sorteo ${r.id}`) + `<div class="app-scroll" data-screen="raffle">
    <div class="prize"><span class="pe">${r.premio.emoji}</span>
      <small>Premio</small><h4>${esc(r.premio.nombre)}</h4>
      <div class="prog"><i style="width:${pct}%"></i></div>
      <div class="prog-l"><span id="soldLbl">${fmt(sold)} / ${fmt(r.total)} vendidos</span><span>${fmt(r.precio)} coins c/u</span></div>
    </div>
    <div class="live"><span class="ldot"></span><span>${last ? `${esc(last.n)} compró ${last.q} ticket(s) · ${last.nums}` : "En vivo · esperando las primeras compras"}</span></div>
    ${closed ? `<button class="a-btn hot" data-act="watch" style="margin-bottom:12px">🎰 ${r.status === "done" ? "Ver resultado del sorteo" : "Ver sorteo en vivo"}</button>` : `
    <div class="tools-row"><input id="tSearch" inputmode="numeric" maxlength="${DIG}" placeholder="Buscar N.º" aria-label="Buscar número"><button data-act="random">🎲 Al azar</button>${ui.sel.size ? `<button data-act="clear">Limpiar</button>` : ""}</div>`}
    <div class="seg" style="grid-template-columns:repeat(${ranges},1fr);margin-bottom:10px">${Array.from({ length: ranges }, (_, i) => {
      const a = i * 100, b = Math.min(r.total, a + 100); let free = 0; for (let n = a; n < b; n++) if (!r.sold[n]) free++;
      return `<button data-range="${i}" class="${i === ui.range ? "on" : ""}" style="padding:7px 2px;font-size:.72rem;line-height:1.2">${pad(a).slice(0, DIG - 2) || "0"}xx<br><small style="opacity:.6;font-weight:500">${free} libres</small></button>`;
    }).join("")}</div>
    <div class="legend"><span><i style="background:#1c2145"></i>Libre</span><span><i style="background:#ff4d8d"></i>Seleccionado</span><span><i style="background:linear-gradient(135deg,#5b4bff,#22d3ee)"></i>Míos</span><span><i style="background:#2a3050;opacity:.4"></i>Vendido</span></div>
    <div class="tgrid" id="tgrid" style="grid-template-columns:repeat(10,minmax(0,1fr))">${cells}</div>
    <p class="a-hint">Commit de la rifa: <span class="mono">${r.commit ? r.commit.slice(0, 16) + "…" : "calculando…"}</span></p>
  </div>` + (closed ? "" : buybar());
}
function buybar() {
  const u = me(), n = ui.sel.size, total = n * CONFIG.precioTicket;
  const enough = u.coins >= total;
  return `<div class="buybar" id="buybar"><div><small>${n ? `${n} ticket(s) · ${[...ui.sel].sort((a, b) => a - b).map(pad).join(", ")}` : "Elige uno o más números"}</small>
    <b><span class="coin"></span>${fmt(total)}</b></div>
    ${n && !enough ? `<button class="a-btn hot" data-go="wallet">Recargar</button>` : `<button class="a-btn" data-act="buy" ${n ? "" : "disabled"}>Comprar</button>`}</div>`;
}
function refreshSelection(n) {
  const b = $(`#tgrid button[data-t="${n}"]`); if (b) b.className = ui.sel.has(n) ? "sel" : "";
  const bar = $("#buybar"); if (bar) bar.outerHTML = buybar();
}
function toggleTicket(n) {
  const r = db().raffle;
  if (r.sold[n] || r.status !== "open") return;
  ui.sel.has(n) ? ui.sel.delete(n) : ui.sel.add(n);
  refreshSelection(n);
}
function buy() {
  const d = db(), r = d.raffle, u = d.users[getSession()];
  const nums = [...ui.sel].sort((a, b) => a - b);
  if (!nums.length || r.status !== "open") return;
  const taken = nums.filter((n) => r.sold[n]);
  if (taken.length) { taken.forEach((n) => ui.sel.delete(n)); render(); return toast(`Otro usuario ya compró: ${taken.map(pad).join(", ")}`, "err"); }
  const cost = nums.length * r.precio;
  if (u.coins < cost) return toast("Saldo insuficiente. Recarga coins.", "err");
  u.coins -= cost;
  nums.forEach((n) => (r.sold[n] = { u: u.email, n: u.name }));
  u.tx.push({ ic: "🎟️", label: `Tickets ${nums.map(pad).join(", ")}`, amount: -cost, ts: Date.now() });
  r.feed.push({ n: u.name.split(" ")[0], q: nums.length, nums: nums.map((x) => "#" + pad(x)).join(" "), ts: Date.now() });
  r.feed = r.feed.slice(-20);
  ui.sel.clear();
  checkSoldOut(d);
  saveDB(d);
  toast(`¡Listo! Compraste ${nums.length} ticket(s) 🎉`, "ok");
  render();
  syncDraw();
}

/* ---------- Cierre y sorteo ---------- */
async function checkSoldOut(d) {
  const r = d.raffle;
  if (r.status !== "open" || soldCount(r) < r.total) return;
  r.status = "drawing";
  r.startAt = Date.now() + 1200;
  const h = await sha256(r.seed + ":" + r.id);
  const num = Number(BigInt("0x" + h.slice(0, 12)) % BigInt(r.total));
  const fresh = loadDB() || d;                                // puede haber cambiado mientras se calculaba
  fresh.raffle.status = "drawing"; fresh.raffle.startAt = r.startAt;
  fresh.raffle.winner = { num, ...fresh.raffle.sold[num], hash: h };
  saveDB(fresh);
  syncDraw();
}

const T = { count: 3000, spin: [5200, 6900, 8600], reveal: 9200 };   // línea de tiempo del sorteo (ms)
let drawRun = null;

function syncDraw(replay = false) {
  const r = db().raffle;
  if (!r.winner || !r.startAt) return;
  if (drawRun && drawRun.id === r.id && !replay) return;
  if (r.status === "done" && !replay && !drawLayer.dataset.wantShow) return;
  delete drawLayer.dataset.wantShow;
  runDraw(r, replay ? Date.now() : r.startAt);
}

function runDraw(r, startAt) {
  if (drawRun) cancelAnimationFrame(drawRun.raf);
  const u = me();
  const target = pad(r.winner.num).split("").map(Number);
  const names = [...new Set(Object.values(r.sold).map((o) => o.n))];
  const CELLS = 34;
  const strips = target.map((t, i) => {
    const max = i === 0 && DIG > 1 ? Math.floor((r.total - 1) / 10 ** (DIG - 1)) + 1 : 10;
    return Array.from({ length: CELLS }, (_, k) => (k === CELLS - 1 ? t : Math.floor(Math.random() * max)));
  });
  drawLayer.innerHTML = `<div class="draw" id="drawEl"><div class="rays"></div><canvas class="confetti" id="confetti"></canvas>
    <span class="live-tag">EN VIVO</span>
    <h4>Sorteo · ${esc(r.premio.nombre)}</h4><p class="sub">${fmt(r.total)} tickets vendidos · ${names.length} participantes</p>
    <div id="dStage"></div></div>`;
  const stage = $("#dStage");
  let phase = "";
  drawRun = { id: r.id, raf: 0 };

  const ease = (x) => 1 - Math.pow(1 - x, 4);
  const frame = () => {
    const el = Date.now() - startAt;
    if (el < 0) { if (phase !== "wait") { phase = "wait"; stage.innerHTML = `<div class="count" style="font-size:60px">⏳</div><p class="sub">Preparando el sorteo…</p>`; } }
    else if (el < T.count) {
      const c = 3 - Math.floor(el / 1000);
      if (phase !== "c" + c) { phase = "c" + c; stage.innerHTML = `<div class="count">${c}</div><p class="sub">El sorteo comienza en…</p>`; }
    } else if (el < T.reveal) {
      if (phase !== "spin") {
        phase = "spin";
        stage.innerHTML = `<div class="reels">${strips.map((s) => `<div class="reel"><div class="reel-strip">${s.map((d) => `<div>${d}</div>`).join("")}</div></div>`).join("")}</div><div class="ticker" id="ticker"></div>`;
      }
      const se = el - T.count;
      stage.querySelectorAll(".reel").forEach((reel, i) => {
        const dur = T.spin[i] - T.count;
        const p = Math.min(1, se / dur);
        reel.firstChild.style.transform = `translateY(${-ease(p) * (CELLS - 1) * 104}px)`;
        reel.classList.toggle("stop", p >= 1);
      });
      const tk = $("#ticker");
      if (tk) {
        const slow = Math.min(1, se / (T.spin[2] - T.count));
        if (slow < 1) { if (!tk._n || Date.now() - tk._n > 60 + slow * 260) { tk._n = Date.now(); tk.textContent = names[Math.floor(Math.random() * names.length)] || ""; } }
        else tk.textContent = r.winner.n;
      }
    } else if (phase !== "win") {
      phase = "win";
      const isMe = u && r.winner.u === u.email;
      stage.innerHTML = `<div class="winner"><span class="trophy">🏆</span><div class="wnum">#${pad(r.winner.num)}</div>
        <div class="wname">${esc(r.winner.n)}</div>${isMe ? '<span class="you">¡GANASTE! 🎉</span>' : '<p class="sub" style="margin:0">¡Felicidades al ganador!</p>'}</div>
        <div class="proof"><b>Verificación</b><br>commit = sha256(semilla) = ${r.commit || "—"}<br>semilla = ${r.seed}<br>ganador = sha256(semilla:${r.id})[0..12] mod ${r.total} = ${r.winner.num}</div>
        <div class="d-actions"><button class="a-btn" data-act="newraffle">Nueva rifa (demo)</button><button class="a-btn ghost" data-act="closedraw">Cerrar</button></div>`;
      confetti();
      const d = db();
      if (d.raffle.id === r.id && d.raffle.status !== "done") { d.raffle.status = "done"; saveDB(d); }
      return;
    }
    drawRun.raf = requestAnimationFrame(frame);
  };
  frame();
}

function confetti() {
  const cv = $("#confetti"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = (cv.width = cv.offsetWidth * devicePixelRatio), H = (cv.height = cv.offsetHeight * devicePixelRatio);
  const colors = ["#ff4d8d", "#22d3ee", "#fbbf24", "#7c6cff", "#34d399", "#fff"];
  const ps = Array.from({ length: 180 }, () => ({ x: W / 2, y: H * 0.42, vx: (Math.random() - 0.5) * 22 * devicePixelRatio, vy: (-Math.random() * 18 - 6) * devicePixelRatio, s: (4 + Math.random() * 6) * devicePixelRatio, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[Math.floor(Math.random() * colors.length)] }));
  const t0 = performance.now();
  (function loop(t) {
    if (!document.body.contains(cv)) return;
    ctx.clearRect(0, 0, W, H);
    ps.forEach((p) => { p.vy += 0.45 * devicePixelRatio; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    if (t - t0 < 5000) requestAnimationFrame(loop); else ctx.clearRect(0, 0, W, H);
  })(t0);
}

/* ---------- Herramientas de demo ---------- */
const BOTS = ["Ana Rojas", "Luis Pérez", "Carla Méndez", "Jorge Vargas", "Sofía Gutiérrez", "Diego Flores", "Valeria Cruz", "Marco Suárez", "Paola Rivera", "Andrés Molina", "Lucía Torres", "Rodrigo Salazar", "Camila Ortiz", "Miguel Rocha", "Daniela Aguilar", "Fernando Quispe"];
let filling = false;
function fillRemaining() {
  const r0 = db().raffle;
  if (r0.status !== "open") return toast("La rifa ya está cerrada", "err");
  if (filling) return;
  filling = true;
  ui.screen = me() ? "raffle" : ui.screen; ui.sel.clear(); render();
  toast("Vendiendo tickets restantes en vivo…");
  const iv = setInterval(() => {
    const d = db(), r = d.raffle;
    const free = []; for (let n = 0; n < r.total; n++) if (!r.sold[n]) free.push(n);
    if (!free.length || r.status !== "open") { clearInterval(iv); filling = false; return; }
    const name = BOTS[Math.floor(Math.random() * BOTS.length)];
    const batch = free.sort(() => Math.random() - 0.5).slice(0, 12);
    batch.forEach((n) => (r.sold[n] = { u: "bot:" + name, n: name }));
    r.feed.push({ n: name.split(" ")[0], q: batch.length, nums: batch.slice(0, 3).map((x) => "#" + pad(x)).join(" ") + (batch.length > 3 ? "…" : ""), ts: Date.now() });
    r.feed = r.feed.slice(-20);
    if (free.length - batch.length <= 0) { clearInterval(iv); filling = false; checkSoldOut(d); }
    saveDB(d);
    if (me()) render();
  }, 40);
}
function resetDemo() {
  try { localStorage.removeItem(KEY); sessionStorage.removeItem(SKEY); } catch (e) {}
  memDB = null; memSession = null; drawRun && cancelAnimationFrame(drawRun.raf); drawRun = null; drawLayer.innerHTML = "";
  ui.sel.clear(); ui.screen = "profile"; ui.auth = "register";
  db(); bc && bc.postMessage({ t: "sync" });
  render(false); toast("Demo reiniciada");
}

/* ---------- Eventos ---------- */
app.addEventListener("click", (e) => {
  const t = e.target.closest("button, [data-go]"); if (!t || !app.contains(t)) return;
  if (t.dataset.go) {
    $(".overlay", main)?.remove();
    if (!me()) return;
    ui.screen = t.dataset.go; render(false); return;
  }
  if (t.dataset.auth) { ui.auth = t.dataset.auth; render(false); return; }
  if (t.dataset.pack) { ui.pack = +t.dataset.pack; render(); return; }
  if (t.dataset.method) { ui.method = t.dataset.method; render(); return; }
  if (t.dataset.range) { ui.range = +t.dataset.range; render(); return; }
  if (t.dataset.t) { toggleTicket(+t.dataset.t); return; }
  const act = t.dataset.act;
  if (act === "logout") { setSession(null); ui.sel.clear(); render(false); }
  if (act === "buy") buy();
  if (act === "clear") { ui.sel.clear(); render(); }
  if (act === "random") {
    const r = db().raffle, free = [];
    for (let n = 0; n < r.total; n++) if (!r.sold[n] && !ui.sel.has(n)) free.push(n);
    if (!free.length) return toast("No quedan números libres", "err");
    const n = free[Math.floor(Math.random() * free.length)];
    ui.sel.add(n); ui.range = Math.floor(n / 100); render();
    const b = $(`#tgrid button[data-t="${n}"]`); if (b) { b.classList.add("flash"); b.scrollIntoView({ block: "center", behavior: "smooth" }); }
  }
  if (act === "qrpay") processPayment("📱", "Recarga con QR");
  if (act === "watch") { const r = db().raffle; if (r.status === "done") runDraw(r, Date.now() - T.reveal); else syncDraw(); }
  if (act === "closedraw") { drawLayer.innerHTML = ""; }
  if (act === "newraffle") {
    const d = db(); d.raffle = newRaffle(); saveDB(d); ensureCommit(d);
    drawRun && cancelAnimationFrame(drawRun.raf); drawRun = null; drawLayer.innerHTML = ""; ui.sel.clear(); ui.range = 0; render(false);
    toast("Nueva rifa abierta 🎟️", "ok");
  }
});
app.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "authForm") onAuth(e.target);
  if (e.target.id === "cardForm") onCardPay();
});
app.addEventListener("input", (e) => {
  const el = e.target;
  if (el.closest("#cardForm")) {
    let v = el.value;
    if (el.name === "num") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (el.name === "exp") { v = v.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); }
    if (el.name === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    if (el.name === "name") v = v.toUpperCase();
    el.value = v; ui.card[el.name] = v;
    const map = { num: ["#cNum", "•••• •••• •••• ••••"], name: ["#cName", "NOMBRE APELLIDO"], exp: ["#cExp", "MM/AA"] };
    if (map[el.name]) $(map[el.name][0]).textContent = v || map[el.name][1];
    if (el.name === "num") $("#cBrand").textContent = v.startsWith("4") ? "VISA" : v.startsWith("5") ? "Mastercard" : "";
  }
  if (el.id === "tSearch") {
    const v = el.value.replace(/\D/g, ""); el.value = v;
    if (v.length === DIG) {
      const n = +v, r = db().raffle;
      if (n >= r.total) return toast(`Los números van de ${pad(0)} a ${pad(r.total - 1)}`, "err");
      if (r.sold[n]) return toast(`El ${pad(n)} ya fue vendido`, "err");
      ui.sel.add(n); ui.range = Math.floor(n / 100); render();
      const b = $(`#tgrid button[data-t="${n}"]`); if (b) { b.classList.add("flash"); b.scrollIntoView({ block: "center", behavior: "smooth" }); }
      toast(`Número ${pad(n)} seleccionado`);
    }
  }
});

function onRemoteChange() {
  const r = db().raffle;
  if (drawRun && drawRun.id !== r.id) { cancelAnimationFrame(drawRun.raf); drawRun = null; drawLayer.innerHTML = ""; }
  [...ui.sel].forEach((n) => r.sold[n] && ui.sel.delete(n));
  if (!me() && getSession()) setSession(null);
  const focused = document.activeElement && app.contains(document.activeElement) && document.activeElement.tagName === "INPUT";
  if (ui.screen === "raffle" || !me() ? !focused : false) render();
  else { const p = $("#pillCoins"); if (p && me()) p.textContent = fmt(me().coins); }
  if (r.status === "drawing") syncDraw();
}
bc && (bc.onmessage = onRemoteChange);
window.addEventListener("storage", (e) => { if (e.key === KEY || e.key === null) { memDB = null; onRemoteChange(); } });

$("#toolFill").addEventListener("click", fillRemaining);
$("#toolReset").addEventListener("click", () => { if (confirm("¿Reiniciar la demo? Se borrarán usuarios, coins y tickets de prueba.")) resetDemo(); });
$("#toolTab").addEventListener("click", () => window.open(location.href.split("#")[0] + "#demo", "_blank"));

/* ---------- inicio ---------- */
ensureCommit(db());
if (!me()) setSession(null);
render(false);
if (db().raffle.status === "drawing") syncDraw();
