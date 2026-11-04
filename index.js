/* ==========================================================
   Servisofts — landing
   Configura aquí los datos de contacto reales.
   ========================================================== */
const CONTACTO = {
  email: "",      // ej. "contacto@servisofts.com"
  whatsapp: "",   // ej. "59170000000" (código de país + número, sin +)
  web: "https://servisofts.com",
};

const I = {
  web: '<path d="M3 5h18v14H3z"/><path d="M3 9h18M7 7h.01M10 7h.01"/>',
  mobile: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  erp: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  pay: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  cloud: '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/>',
  design: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4"/>',
  box: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  finger: '<path d="M12 11c0 3.5-1 6.5-3 9M8.5 6.5A6 6 0 0 1 18 11c0 2-.3 4-1 6M5 9a8 8 0 0 1 1.5-3M15 11a3 3 0 0 0-6 0c0 2.5-.5 5-2 7"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 21l2-5.6A8.5 8.5 0 1 1 21 11.5z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;

const SERVICIOS = [
  ["web", "Aplicaciones web", "Plataformas, portales y paneles administrativos rápidos, responsive y optimizados para SEO."],
  ["mobile", "Apps móviles", "Apps nativas para iOS y Android con una sola base de código, publicadas en App Store y Google Play."],
  ["erp", "Sistemas empresariales", "Contabilidad, inventario, ventas y RR.HH. integrados en un solo ecosistema."],
  ["pay", "Pagos e integraciones", "Cobros con QR y tarjeta, facturación, APIs de terceros y webhooks."],
  ["cloud", "Servidores y nube", "Infraestructura, despliegues automatizados, respaldos y monitoreo 24/7."],
  ["design", "Diseño UX/UI", "Interfaces modernas, prototipos interactivos y sistemas de diseño consistentes."],
];

const PRODUCTOS = [
  ["calc", "Contabilidad", "Plan de cuentas, asientos, libros y estados financieros al día.", ["Reportes", "Multiempresa"]],
  ["box", "Inventario", "Control de stock, almacenes, kardex y movimientos en tiempo real.", ["Almacenes", "Kardex"]],
  ["users", "CRM", "Clientes, oportunidades y seguimiento comercial.", ["Pipeline", "Leads"]],
  ["cash", "Caja", "Punto de venta, arqueos y cierres de caja.", ["POS", "QR"]],
  ["finger", "StaffPro", "Personal, asistencia y control biométrico con huellero.", ["Biométrico", "RR.HH."]],
  ["building", "Empresa", "Gestión de usuarios, roles, sucursales y permisos.", ["Roles", "Sucursales"]],
];

const PASOS = [
  ["Descubrimiento", "Entendemos tu negocio, objetivos y usuarios."],
  ["Diseño y cotización", "Prototipo, alcance, cronograma e inversión claros."],
  ["Desarrollo ágil", "Entregas cada semana para que veas el avance."],
  ["Lanzamiento y soporte", "Publicamos, medimos y seguimos mejorando."],
];

document.getElementById("servicesGrid").innerHTML = SERVICIOS.map(
  ([k, t, d], i) => `<article class="card card-hover svc reveal" style="transition-delay:${i * 60}ms">
    <div class="icon-badge">${icon(k)}</div><h3>${t}</h3><p>${d}</p></article>`
).join("");

document.getElementById("productsGrid").innerHTML = PRODUCTOS.map(
  ([k, t, d, tags], i) => `<article class="card card-hover reveal" style="transition-delay:${i * 60}ms">
    <div class="prod-top"><div class="icon-badge">${icon(k)}</div></div>
    <h3>${t}</h3><p>${d}</p>
    <div class="prod-tags">${tags.map((x) => `<span class="chip">${x}</span>`).join("")}</div></article>`
).join("");

document.getElementById("stepsList").innerHTML = PASOS.map(
  ([t, d], i) => `<li class="reveal" style="transition-delay:${i * 80}ms"><h3>${t}</h3><p>${d}</p></li>`
).join("");

const contactos = [];
if (CONTACTO.whatsapp) contactos.push(["chat", `https://wa.me/${CONTACTO.whatsapp}`, "Escríbenos por WhatsApp"]);
if (CONTACTO.email) contactos.push(["mail", `mailto:${CONTACTO.email}`, CONTACTO.email]);
if (CONTACTO.web) contactos.push(["globe", CONTACTO.web, CONTACTO.web.replace(/^https?:\/\//, "")]);
document.getElementById("contactList").innerHTML = contactos
  .map(([k, href, label]) => `<li><a href="${href}" target="_blank" rel="noopener"><span class="icon-badge">${icon(k)}</span>${label}</a></li>`)
  .join("");

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  if (!f.get("nombre").trim() || !f.get("mensaje").trim()) return SS.toast("Completa tu nombre y mensaje", "err");
  const texto = `Hola Servisofts, soy ${f.get("nombre")}${f.get("empresa") ? " de " + f.get("empresa") : ""}.\nProyecto: ${f.get("tipo")}\n\n${f.get("mensaje")}`;
  if (CONTACTO.whatsapp) window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank");
  else if (CONTACTO.email) location.href = `mailto:${CONTACTO.email}?subject=${encodeURIComponent("Nuevo proyecto: " + f.get("tipo"))}&body=${encodeURIComponent(texto)}`;
  else { window.open(CONTACTO.web, "_blank"); }
  SS.toast("¡Gracias! Te contactaremos pronto.", "ok");
  e.target.reset();
});
