/* ==========================================================
   COT-2026-002 · Sistema de Adelantos
   1) MODELO      → reglas del piloto (usadas por demo y simulador)
   2) COTIZACION  → módulos, horas, tarifa y cronograma
   3) Demo por rol, simulador y render de la propuesta
   ========================================================== */

const MODELO = {
  moneda: "Bs",
  clientesPiloto: 100,
  linea: 300,
  comision: 0.03,             // 3% por ciclo de compra
  cicloDias: 15,              // quincenal por defecto
  antiguedadMinMeses: 6,      // requisito de elegibilidad (ejemplo)
  comisionCaptador: 10,       // por cliente activado (ejemplo, configurable)
  comisionCobrador: 0.10,     // % de lo recuperado (ejemplo, configurable)
  diasVisita: 7,              // días de atraso antes de enviar cobrador físico
};

const COTIZACION = {
  moneda: "Bs",
  modulos: [
    ["Descubrimiento y diseño UX/UI", "Reglas del modelo, flujos por rol y prototipo", 40],
    ["Núcleo de crédito", "Clientes, líneas, ciclos, comisión configurable y estados de cuenta", 70],
    ["Integración con Renova", "Historial de compras, sponsor y pago al contado de pedidos", 48],
    ["App cliente", "Línea disponible, solicitud de adelanto, pagos y historial", 56],
    ["App captador", "Registro en campo, evaluación de elegibilidad y seguimiento", 40],
    ["App cobrador", "Cartera asignada, gestiones, promesas de pago y GPS", 48],
    ["Cobranza digital", "Recordatorios por WhatsApp/SMS/push y pago por QR", 40],
    ["Motor de comisiones", "Captadores por activación y cobradores por recuperación", 32],
    ["Panel administrativo", "Aprobaciones, cartera, mora, rotación y reportes", 56],
    ["QA, seguridad y despliegue", "Pruebas, auditoría, servidor y monitoreo", 34],
  ],
  fases: [
    ["Descubrimiento y diseño", "Reglas y prototipo", 0, 3],
    ["Núcleo de crédito", "Líneas, ciclos, API", 2, 4],
    ["Integración Renova", "Historial y pagos", 5, 3],
    ["Apps cliente, captador y cobrador", "Web + móvil", 6, 5],
    ["Cobranza y comisiones", "Automatizaciones", 9, 3],
    ["Panel administrativo", "Reportes", 10, 3],
    ["QA y piloto con 100 clientes", "Operación asistida", 13, 3],
  ],
  pagos: [                    // inversión del proyecto en USD, dividida en 4 meses
    ["1er mes", 1900],
    ["2do mes", 1700],
    ["3er mes", 1700],
    ["4to mes", 1700],
  ],
};

/* ---------------- utilidades ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nf = (n, d = 0) => Number(n).toLocaleString("es-BO", { minimumFractionDigits: d, maximumFractionDigits: d });
const money = (n, d = 0) => `${n < 0 ? "−" : ""}${MODELO.moneda}\u00a0${nf(Math.abs(n), d)}`;
const pct = (n, d = 0) => `${nf(n * 100, d)}%`;
const initials = (n) => n.split(" ").slice(0, 2).map((p) => p[0]).join("");
const toast = (m, t) => window.SS && SS.toast(m, t);
const fecha = (dias) => new Date(Date.now() + dias * 864e5).toLocaleDateString("es-BO", { day: "2-digit", month: "short" });

/* ==========================================================
   Propuesta (secciones estáticas)
   ========================================================== */
(function renderPropuesta() {
  const devuelve = MODELO.linea * (1 + MODELO.comision);
  $("#kClientes").textContent = nf(MODELO.clientesPiloto);
  $("#kLinea").textContent = money(MODELO.linea);
  $("#kTasa").textContent = pct(MODELO.comision);
  $("#mfPay").textContent = `paga ${money(MODELO.linea)}`;
  $("#mfBack").textContent = `devuelve ${money(devuelve)}`;

  const flow = [
    ["🧭", "Captación", "El captador registra al cliente y valida su historial en Renova."],
    ["✅", "Línea aprobada", `Clientes con antigüedad reciben una línea de ${money(MODELO.linea)}.`],
    ["🛍️", "Pedido al contado", "La empresa X paga el pedido a Renova; Renova no asume riesgo."],
    ["📲", "Pago en el ciclo", `El cliente devuelve <b>${money(devuelve)}</b> por QR o transferencia.`],
    ["🔁", "Rotación", "Al pagar, la línea se libera para el siguiente pedido."],
  ];
  $("#flowList").innerHTML = flow.map(([e, t, d]) => `<div class="flow-step"><span class="e">${e}</span><b>${t}</b><small>${d}</small></div>`).join("");

  const roles = [
    ["👩", "Cliente", "App", "Ve su línea disponible, pide adelantos para sus pedidos y paga desde el celular.", ["Línea y saldo en tiempo real", "Monto total a devolver antes de aceptar", "Pago QR y recordatorios"]],
    ["🧭", "Captador", "App", "Trae clientes al sistema y los acompaña en su primer pedido.", ["Registro y evaluación en campo", "Elegibilidad automática con datos de Renova", "Comisión por cliente activado"]],
    ["📲", "Cobrador", "App", "Interviene solo cuando la cobranza digital no basta.", ["Cartera priorizada por atraso", "Registro de pago o promesa de pago", "Comisión por recuperación efectiva"]],
    ["🎓", "Capacitador", "Panel", "Forma a captadores y clientes en el uso de la plataforma.", ["Seguimiento de captadores", "Métricas de activación", "Material y guías"]],
    ["🏦", "Empresa X", "Panel", "Administra el capital, las reglas y el riesgo del modelo.", ["Aprobación y límites de línea", "Tasa y ciclo configurables", "Reportes de cartera y mora"]],
    ["🛍️", "Renova", "Integración", "Comparte el historial de compras y recibe el pago de cada pedido al contado.", ["API de historial y sponsor", "Pago inmediato del pedido", "Más ventas sin riesgo crediticio"]],
  ];
  $("#rolesGrid").innerHTML = roles.map(([e, t, k, d, l], i) => `
    <article class="card card-hover role reveal" style="transition-delay:${i * 50}ms">
      <span class="chip">${k}</span><div class="icon-badge">${e}</div><h3>${t}</h3><p>${d}</p>
      <ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("");

  const feats = [
    ["💳", "Líneas de crédito", "Asignación, límites, ampliación gradual y bloqueo automático por atraso.", ["Monto configurable por cliente", "Ciclo semanal, quincenal o mensual", "Historial completo"]],
    ["🔗", "Integración con Renova", "Datos de antigüedad, volumen de compra y sponsor para decidir.", ["Elegibilidad automática", "Pago del pedido al contado", "Conciliación diaria"]],
    ["🤖", "Cobranza digital", "La mayoría de los pagos se recuperan sin visitas.", ["Recordatorios antes y después del vencimiento", "Link y QR de pago", `Visita física solo tras ${MODELO.diasVisita} días`]],
    ["💰", "Comisiones", "Liquidación automática para captadores y cobradores.", ["Captador: por cliente activado", "Cobrador: por recuperación o promesa cumplida", "Reportes por periodo"]],
    ["📊", "Panel de riesgo", "Cartera, mora y rotación en tiempo real.", ["Mora por tramo de días", "Rendimiento por cohorte", "Escalamiento 100 → 1.000"]],
    ["🛡️", "Seguridad y auditoría", "Trazabilidad de cada operación y permisos por rol.", ["Registro de cambios", "Datos separados de Renova", "Respaldos diarios"]],
  ];
  $("#featGrid").innerHTML = feats.map(([e, t, d, l], i) => `
    <article class="card card-hover feat reveal" style="transition-delay:${i * 50}ms">
      <div class="icon-badge">${e}</div><h3>${t}</h3><p>${d}</p>
      <ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></article>`).join("");

  const weeks = Math.max(...COTIZACION.fases.map((f) => f[2] + f[3]));
  $("#totalWeeks").textContent = `${weeks} semanas`;
  $("#timeline").innerHTML =
    `<div class="tl-weeks"><div></div><div>${Array.from({ length: weeks + 1 }, (_, i) => `<span>S${i}</span>`).join("")}</div></div>` +
    COTIZACION.fases.map(([t, s, start, dur]) => `
      <div class="tl-row"><div><b>${t}</b><small>${s}</small></div>
        <div class="tl-track"><div class="tl-bar" style="left:${(start / weeks) * 100}%;width:${(dur / weeks) * 100}%">${dur} sem</div></div></div>`).join("");

  const usd = (n) => `USD ${nf(n)}`;
  const totalH = COTIZACION.modulos.reduce((a, m) => a + m[2], 0);
  const totalUsd = COTIZACION.pagos.reduce((a, p) => a + p[1], 0);
  $("#investBody").innerHTML = COTIZACION.modulos.map(([t, d, h]) =>
    `<tr><td>${t}<small>${d}</small></td><td class="num">${h} h</td></tr>`).join("");
  $("#investHours").textContent = `${totalH} h`;
  $("#pagoBody").innerHTML = COTIZACION.pagos.map(([m, v]) =>
    `<tr><td>${m}</td><td class="num">${usd(v)}</td></tr>`).join("");
  $("#pagoTotal").textContent = usd(totalUsd);
  $("#investBig").textContent = usd(totalUsd);
  $("#investNote").textContent = `${COTIZACION.pagos.length} pagos mensuales · ${weeks} semanas`;
})();

/* ==========================================================
   Simulador del piloto
   ========================================================== */
(function simulador() {
  const ids = ["Clientes", "Linea", "Tasa", "Uso", "Mora", "Rec", "Cob", "Meses"];
  const inp = Object.fromEntries(ids.map((k) => [k, $("#s" + k)]));
  let ciclosMes = 2;
  $("#sFreq").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    ciclosMes = +b.dataset.v;
    $("#sFreq").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    calc();
  });

  function modelo(n, p) {
    const capital = n * p.linea;
    const colocado = capital * p.uso;
    const mes = colocado * p.tasa * ciclosMes;
    const periodo = mes * p.meses;
    const mora = capital * p.mora;
    const recuperado = mora * p.rec;
    const perdida = mora - recuperado;
    const pagoCobro = recuperado * p.cob;
    const neto = periodo - perdida - pagoCobro;
    const costoMora = capital * ((1 - p.rec) + p.rec * p.cob);   // costo por cada 100% de mora
    const breakEven = costoMora > 0 ? periodo / costoMora : Infinity;
    return { capital, mes, periodo, mora, recuperado, perdida, pagoCobro, neto, breakEven };
  }

  function calc() {
    const p = {
      n: +inp.Clientes.value, linea: +inp.Linea.value, tasa: +inp.Tasa.value / 100, uso: +inp.Uso.value / 100,
      mora: +inp.Mora.value / 100, rec: +inp.Rec.value / 100, cob: +inp.Cob.value / 100, meses: +inp.Meses.value,
    };
    $("#oClientes").textContent = nf(p.n);
    $("#oLinea").textContent = money(p.linea);
    $("#oTasa").textContent = pct(p.tasa, 1);
    $("#oUso").textContent = pct(p.uso);
    $("#oMora").textContent = pct(p.mora);
    $("#oRec").textContent = pct(p.rec);
    $("#oCob").textContent = pct(p.cob);
    $("#oMeses").textContent = `${p.meses} ${p.meses === 1 ? "mes" : "meses"}`;

    const r = modelo(p.n, p);
    $("#rCapital").textContent = money(r.capital);
    $("#rCapitalNote").textContent = `${nf(p.n)} × ${money(p.linea)}`;
    $("#rMes").textContent = money(r.mes);
    $("#rMesNote").textContent = `${pct(p.tasa * ciclosMes, 1)} mensual sobre lo colocado`;
    $("#rPerdida").textContent = money(-r.perdida - r.pagoCobro);
    $("#rPerdidaNote").textContent = `${money(r.recuperado)} recuperados por cobranza`;
    const neto = $("#rNeto");
    neto.textContent = money(r.neto);
    neto.className = r.neto >= 0 ? "pos" : "neg";
    $("#rNetoNote").textContent = `${pct(r.neto / r.capital, 1)} sobre el capital en ${p.meses} ${p.meses === 1 ? "mes" : "meses"}`;

    const be = Math.min(r.breakEven, 1);
    $("#rBreak").textContent = r.breakEven >= 1 ? "> 100%" : pct(r.breakEven, 1);
    $("#rBreakBar").style.width = `${be * 100}%`;
    $("#rMoraMark").style.left = `${Math.min(p.mora, 1) * 100}%`;
    $("#rBreakNote").textContent = p.mora <= r.breakEven
      ? `Con ${pct(p.mora)} de mora el piloto sigue siendo rentable. La línea marca tu supuesto actual.`
      : `Con ${pct(p.mora)} de mora el piloto pierde dinero: sube la recuperación, la rotación o baja la mora.`;

    const escalas = [100, 200, 500, 1000];
    $("#scaleBody").innerHTML = escalas.map((n) => {
      const s = modelo(n, p);
      return `<tr class="${n === p.n ? "cur" : ""}"><td>${nf(n)} clientes</td><td class="num">${money(s.capital)}</td><td class="num">${money(s.mes)}</td><td class="num">${money(s.neto)}</td></tr>`;
    }).join("");

    const ciclosAnio = ciclosMes * 12;
    const simple = p.tasa * ciclosAnio;
    const comp = Math.pow(1 + p.tasa, ciclosAnio) - 1;
    $("#rCosto").innerHTML = `Para el cliente: ${money(p.linea)} → devuelve <b>${money(p.linea * (1 + p.tasa), 2)}</b> por ciclo. Costo anual equivalente si usa la línea todo el año: <b>${pct(simple, 0)}</b> simple · <b>${pct(comp, 0)}</b> compuesto. Dato clave para la revisión legal.`;
  }
  Object.values(inp).forEach((el) => el.addEventListener("input", calc));
  calc();
})();

/* ==========================================================
   Demo por rol (datos de ejemplo en memoria)
   ========================================================== */
const app = $("#app");
const D = {
  role: "cliente",
  cliente: { nombre: "Ana Gutiérrez", linea: MODELO.linea, deuda: null, monto: 200, historial: [{ t: "Línea activada", m: 0, ic: "✅" }] },
  captador: {
    nombre: "Carlos Vega", ganado: 30, activados: 3,
    prospectos: [
      { n: "Rosa Mamani", meses: 26, compras: 18, puntual: 0.96, sponsor: "Lucía P.", estado: "nuevo" },
      { n: "Jimena Rocha", meses: 14, compras: 9, puntual: 0.9, sponsor: "Lucía P.", estado: "nuevo" },
      { n: "Pedro Salinas", meses: 3, compras: 2, puntual: 1, sponsor: "Marta V.", estado: "nuevo" },
      { n: "Elena Cruz", meses: 31, compras: 22, puntual: 0.7, sponsor: "Marta V.", estado: "nuevo" },
    ],
  },
  cobrador: {
    nombre: "Miguel Torres", ganado: 0, recuperado: 0,
    cartera: [
      { n: "Sandra Flores", monto: 309, dias: 9, estado: "mora" },
      { n: "Luis Quispe", monto: 206, dias: 12, estado: "mora" },
      { n: "Carla Ríos", monto: 154.5, dias: 3, estado: "digital" },
      { n: "Óscar Mendoza", monto: 309, dias: 8, estado: "promesa", promesa: fecha(2) },
    ],
  },
};
const NOTES = {
  cliente: ["Elige el monto del adelanto para tu pedido.", "Ve el total a devolver antes de aceptar.", "Renova recibe el pago al contado.", "Paga por QR y tu línea se libera."],
  captador: ["Evalúa prospectos con su historial en Renova.", `Requisito de ejemplo: ${MODELO.antiguedadMinMeses}+ meses y buena puntualidad.`, "Activa la línea y gana comisión por cliente."],
  cobrador: ["Solo ves clientes que la cobranza digital no resolvió.", "Registra el pago o una promesa de pago.", "Ganas comisión por recuperación efectiva, no por visita."],
};

const topbar = (sub, title, right = "") => `<div class="a-top"><div><small>${sub}</small><h4>${title}</h4></div>${right}</div>`;
const balance = (v) => `<span class="coin-pill">${money(v)}</span>`;

function vCliente() {
  const c = D.cliente, usado = c.deuda ? c.deuda.capital : 0, disp = c.linea - usado;
  const total = c.monto * (1 + MODELO.comision);
  return topbar("Crédito para pedidos", "Mi línea", balance(disp)) + `<div class="app-scroll" data-s="cliente">
    <div class="hello"><div class="avatar">${initials(c.nombre)}</div><div><b>${esc(c.nombre)}</b><small>Cliente Renova · sponsor Lucía P.</small></div></div>
    <div class="line-card"><small>Disponible para tu próximo pedido</small>
      <div class="big">${money(disp)} <span>de ${money(c.linea)}</span></div>
      <div class="meter"><i style="width:${(disp / c.linea) * 100}%"></i></div>
      <div class="meter-l"><span>Usado ${money(usado)}</span><span>Ciclo de ${MODELO.cicloDias} días</span></div></div>
    ${c.deuda ? `
      <div class="debt"><div class="debt-top"><div><small>Total a pagar</small><br><b>${money(c.deuda.total, 2)}</b></div><span class="pill warn">Vence ${c.deuda.vence}</span></div>
        <small>Adelanto ${money(c.deuda.capital)} + comisión ${pct(MODELO.comision)} (${money(c.deuda.total - c.deuda.capital, 2)})</small>
        <div class="auto-msg">💬 Te enviaremos un recordatorio por WhatsApp 2 días antes del vencimiento.</div>
        <button class="a-btn hot" style="margin-top:12px" data-act="pagar">📱 Pagar con QR</button></div>` : `
      <div class="a-h"><h5>Pedir adelanto</h5></div>
      <div class="amount-pick"><div class="val" id="amtVal">${money(c.monto)}</div>
        <input type="range" id="amt" min="50" max="${disp}" step="10" value="${c.monto}" aria-label="Monto del adelanto"></div>
      <div class="breakdown">
        <div><span>Pago a Renova (tu pedido)</span><b id="bCap">${money(c.monto)}</b></div>
        <div><span>Comisión del ciclo (${pct(MODELO.comision)})</span><b id="bCom">${money(c.monto * MODELO.comision, 2)}</b></div>
        <div><span>Devuelves el ${fecha(MODELO.cicloDias)}</span><b id="bTot">${money(total, 2)}</b></div>
      </div>
      <button class="a-btn" data-act="pedir">Usar en mi pedido</button>`}
    <div class="a-h"><h5>Movimientos</h5></div>
    ${c.historial.slice().reverse().map((h) => `<div class="tx"><i>${h.ic}</i><div><b>${esc(h.t)}</b><small>${h.f || "Hoy"}</small></div>${h.m ? `<span class="${h.m > 0 ? "plus" : "minus"}">${h.m > 0 ? "+" : "−"}${money(Math.abs(h.m), 2)}</span>` : ""}</div>`).join("")}
  </div>`;
}

function evalProspecto(p) {
  const ant = p.meses >= MODELO.antiguedadMinMeses, punt = p.puntual >= 0.85, vol = p.compras >= 6;
  return { ant, punt, vol, ok: ant && punt && vol };
}
function vCaptador() {
  const k = D.captador;
  return topbar("Captador", "Mis prospectos", balance(k.ganado)) + `<div class="app-scroll" data-s="captador">
    <div class="earn"><div><small>Comisiones del mes</small><b>${money(k.ganado)}</b></div><div class="side">${k.activados} clientes activados<br>${money(MODELO.comisionCaptador)} por activación</div></div>
    ${k.prospectos.map((p, i) => {
      const e = evalProspecto(p);
      const badge = { nuevo: '<span class="pill info">Por evaluar</span>', evaluado: e.ok ? '<span class="pill ok">Elegible</span>' : '<span class="pill bad">No elegible</span>', activo: '<span class="pill ok">Línea activa</span>' }[p.estado];
      return `<div class="list-item col"><div class="row"><div class="avatar">${initials(p.n)}</div><div><b>${esc(p.n)}</b><small>Sponsor ${esc(p.sponsor)} · ${p.meses} meses en Renova</small></div>${badge}</div>
        ${p.estado !== "nuevo" ? `<div class="eval">
          <div><span>Antigüedad ≥ ${MODELO.antiguedadMinMeses} meses</span><span class="${e.ant ? "y" : "n"}">${e.ant ? "✓" : "✗"} ${p.meses}</span></div>
          <div><span>Pedidos en el último año ≥ 6</span><span class="${e.vol ? "y" : "n"}">${e.vol ? "✓" : "✗"} ${p.compras}</span></div>
          <div><span>Puntualidad de pago ≥ 85%</span><span class="${e.punt ? "y" : "n"}">${e.punt ? "✓" : "✗"} ${pct(p.puntual)}</span></div></div>` : ""}
        <div class="item-actions">${p.estado === "nuevo" ? `<button class="mini-btn" data-act="evaluar" data-i="${i}">Evaluar con datos de Renova</button>`
          : p.estado === "evaluado" && e.ok ? `<button class="mini-btn" data-act="activar" data-i="${i}">Activar línea de ${money(MODELO.linea)}</button>`
          : p.estado === "evaluado" ? `<button class="mini-btn ghost" disabled>Volver a evaluar en 3 meses</button>` : `<button class="mini-btn ghost" disabled>Acompañar primer pedido</button>`}</div></div>`;
    }).join("")}
  </div>`;
}

function vCobrador() {
  const k = D.cobrador;
  const orden = k.cartera.map((c, i) => ({ ...c, i })).sort((a, b) => (a.estado === "pagado") - (b.estado === "pagado") || b.dias - a.dias);
  return topbar("Cobrador", "Mi cartera", balance(k.ganado)) + `<div class="app-scroll" data-s="cobrador">
    <div class="earn"><div><small>Comisión ganada</small><b>${money(k.ganado, 2)}</b></div><div class="side">${money(k.recuperado, 2)} recuperados<br>${pct(MODELO.comisionCobrador)} de lo recuperado</div></div>
    ${orden.map((c) => {
      const pill = { mora: `<span class="pill bad">${c.dias} días</span>`, digital: `<span class="pill info">Digital</span>`, promesa: `<span class="pill warn">Promesa ${c.promesa}</span>`, pagado: `<span class="pill ok">Pagado</span>` }[c.estado];
      const acts = c.estado === "pagado" ? ""
        : c.estado === "digital" ? `<div class="auto-msg">🤖 En cobranza digital: ${c.dias} días de atraso, recordatorios automáticos enviados. Visita a partir del día ${MODELO.diasVisita}.</div>`
        : c.estado === "promesa" ? `<div class="item-actions"><button class="mini-btn" data-act="cumplir" data-i="${c.i}">Promesa cumplida</button><button class="mini-btn ghost" data-act="cobrar" data-i="${c.i}">Cobrar ahora</button></div>`
        : `<div class="item-actions"><button class="mini-btn" data-act="cobrar" data-i="${c.i}">Registrar pago</button><button class="mini-btn ghost" data-act="prometer" data-i="${c.i}">Promesa de pago</button></div>`;
      return `<div class="list-item col"><div class="row"><div class="avatar">${initials(c.n)}</div><div><b>${esc(c.n)}</b><small>Saldo ${money(c.monto, 2)} · 📍 ver ubicación</small></div>${pill}</div>${acts}</div>`;
    }).join("")}
    <p class="a-hint">La comisión se paga sobre lo recuperado, no por la visita.</p>
  </div>`;
}

function render(anim = false) {
  const prev = $(".app-scroll", app), top = !anim && prev ? prev.scrollTop : 0;
  app.innerHTML = { cliente: vCliente, captador: vCaptador, cobrador: vCobrador }[D.role]();
  const sc = $(".app-scroll", app);
  if (sc) { sc.scrollTop = top; if (anim) sc.classList.add("screen-in"); }
  $("#roleNotes").innerHTML = NOTES[D.role].map((n) => `<li>${n}</li>`).join("");
}

function overlay(html, ms, then) {
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.innerHTML = `<div><div class="spinner"></div>${html}</div>`;
  app.appendChild(ov);
  setTimeout(() => { ov.remove(); then(); }, ms);
}
function success(title, text) {
  const ov = document.createElement("div");
  ov.className = "overlay";
  ov.innerHTML = `<div><div class="success-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></div><h4>${title}</h4><p>${text}</p><button class="a-btn" data-act="ok">Listo</button></div>`;
  app.appendChild(ov);
}

$("#roleSwitch").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  D.role = b.dataset.role;
  $("#roleSwitch").querySelectorAll("button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
  render(true);
});

app.addEventListener("input", (e) => {
  if (e.target.id !== "amt") return;
  const v = +e.target.value; D.cliente.monto = v;
  $("#amtVal").textContent = money(v);
  $("#bCap").textContent = money(v);
  $("#bCom").textContent = money(v * MODELO.comision, 2);
  $("#bTot").textContent = money(v * (1 + MODELO.comision), 2);
});

app.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  const act = b.dataset.act, i = +b.dataset.i;
  const c = D.cliente, k = D.captador, co = D.cobrador;
  if (act === "ok") { b.closest(".overlay").remove(); return; }
  if (act === "pedir") {
    overlay("<h4>Enviando pago a Renova…</h4><p>Tu pedido se paga al contado</p>", 1500, () => {
      const total = c.monto * (1 + MODELO.comision);
      c.deuda = { capital: c.monto, total, vence: fecha(MODELO.cicloDias) };
      c.historial.push({ t: "Adelanto usado en pedido Renova", m: -c.monto, ic: "🛍️" });
      render();
      success("¡Pedido pagado!", `Renova recibió ${money(c.monto)}. Devuelves ${money(total, 2)} hasta el ${c.deuda.vence}.`);
    });
  }
  if (act === "pagar") {
    overlay("<h4>Confirmando pago QR…</h4><p>Conciliación automática con el banco</p>", 1500, () => {
      c.historial.push({ t: "Pago del ciclo por QR", m: c.deuda.total, ic: "📱" });
      c.deuda = null; c.monto = Math.min(c.monto, c.linea);
      render();
      success("¡Pago recibido!", `Tu línea de ${money(c.linea)} está disponible otra vez.`);
    });
  }
  if (act === "evaluar") {
    overlay("<h4>Consultando historial en Renova…</h4><p>Antigüedad, pedidos y puntualidad</p>", 1100, () => { k.prospectos[i].estado = "evaluado"; render(); });
  }
  if (act === "activar") {
    k.prospectos[i].estado = "activo"; k.activados++; k.ganado += MODELO.comisionCaptador;
    render(); toast(`Línea activada · +${money(MODELO.comisionCaptador)} de comisión`, "ok");
  }
  if (act === "cobrar" || act === "cumplir") {
    const x = co.cartera[i], com = x.monto * MODELO.comisionCobrador;
    x.estado = "pagado"; co.recuperado += x.monto; co.ganado += com;
    render(); toast(`${money(x.monto, 2)} recuperados · +${money(com, 2)} de comisión`, "ok");
  }
  if (act === "prometer") {
    const x = co.cartera[i]; x.estado = "promesa"; x.promesa = fecha(3);
    render(); toast(`Promesa registrada para el ${x.promesa}. Se enviará un recordatorio automático.`);
  }
});

render(true);
