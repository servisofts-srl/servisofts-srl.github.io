/* ==========================================================
   Cotizaciones — agrega nuevas propuestas en este arreglo.
   Cada cotización vive en su propia carpeta: /cotizaciones/<slug>/
   ========================================================== */
const COTIZACIONES = [
  {
    slug: "sorteo",
    codigo: "COT-2026-001",
    titulo: "App de Sorteo y Rifa",
    resumen: "App web y móvil con registro de usuarios, billetera de coins (tarjeta y QR), rifa de 600 tickets y sorteo en vivo animado.",
    tipo: "Web + móvil",
    estado: "En revisión",
    emoji: "🎟️",
    cover: "linear-gradient(135deg,#ff4d8d 0%,#7c3aed 55%,#22d3ee 100%)",
    tags: ["Pagos QR", "Tiempo real", "iOS · Android"],
    fecha: "2026-11-04",
  },
];

const list = document.getElementById("qList");
const empty = document.getElementById("qEmpty");
const search = document.getElementById("qSearch");
const filtersEl = document.getElementById("qFilters");
const tipos = ["Todas", ...new Set(COTIZACIONES.map((c) => c.tipo))];
let filtro = "Todas";

filtersEl.innerHTML = tipos.map((t) => `<button type="button" data-t="${t}" class="${t === filtro ? "on" : ""}">${t}</button>`).join("");
filtersEl.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  filtro = b.dataset.t;
  filtersEl.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
  render();
});
search.addEventListener("input", render);

const fmtFecha = (s) => new Date(s + "T12:00:00").toLocaleDateString("es-BO", { day: "2-digit", month: "short", year: "numeric" });

function render() {
  const q = search.value.trim().toLowerCase();
  const items = COTIZACIONES.filter((c) =>
    (filtro === "Todas" || c.tipo === filtro) &&
    (!q || [c.titulo, c.resumen, c.codigo, ...c.tags].join(" ").toLowerCase().includes(q))
  );
  empty.hidden = items.length > 0;
  list.innerHTML = items.map((c) => `
    <a class="card card-hover q-card" href="${c.slug}/">
      <div class="q-cover" style="--cover:${c.cover}">
        <span class="chip">${c.estado}</span>
        <span class="q-emoji" aria-hidden="true">${c.emoji}</span>
      </div>
      <div class="q-body">
        <div class="q-meta"><span class="chip">${c.tipo}</span>${c.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        <h3>${c.titulo}</h3>
        <p>${c.resumen}</p>
        <div class="q-foot"><small>${c.codigo} · ${fmtFecha(c.fecha)}</small><span class="btn btn-sm btn-primary">Ver propuesta →</span></div>
      </div>
    </a>`).join("") + (q || filtro !== "Todas" ? "" : `
    <a class="q-new" href="../#contacto">
      <div><div class="plus">+</div><b>¿Tienes un nuevo proyecto?</b><span>Solicita tu cotización</span></div>
    </a>`);
}
render();
