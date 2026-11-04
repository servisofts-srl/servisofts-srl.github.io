/* ==========================================================
   Servisofts — logo, navegación, tema y utilidades compartidas
   Uso: <script src="{root}assets/js/brand.js" data-root="{root}" data-active="home|cotizaciones"></script>
   ========================================================== */
(function () {
  const script = document.currentScript;
  const ROOT = (script && script.dataset.root) || "./";
  const ACTIVE = (script && script.dataset.active) || "";
  let logoCount = 0;

  /* Logo oficial de Servisofts, vectorizado para heredar el color del tema */
  function logoSVG(opts = {}) {
    const id = "ssGrad" + ++logoCount;
    const cls = "ss-logo" + (opts.animate ? " animate" : "") + (opts.className ? " " + opts.className : "");
    return `<svg class="${cls}" viewBox="-4 -4 422 140" role="img" aria-label="Servisofts" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b4bff"/><stop offset=".55" stop-color="#00b8d9"/><stop offset="1" stop-color="#2fe6a6"/></linearGradient></defs>
<path class="ss-wave" fill="none" stroke-width="2.4" stroke-linecap="round" d="M413.81,85.18q-.45.45-6.3,10.2a1.63,1.63,0,0,1-2.2.6,1.85,1.85,0,0,1-.7-.8l-.5-1.2a23.23,23.23,0,0,1-1.6-6.8c-.2-3.6-.6-11-.9-14.6-.1-.3-.4-.5-.6-.4s-.3.1-.4.3c-1.1,4.5-3.7,15.3-4.8,20a.57.57,0,0,1-.7.4.43.43,0,0,1-.4-.4c-.7-3.3-2.4-11.1-3.1-14.5a.49.49,0,0,0-.6-.3.32.32,0,0,0-.3.3l-2.9,12.3a10.79,10.79,0,0,1-8.8,8.2c-3,.5-4.5.8-4.5.8a9.29,9.29,0,0,1-2.9-.5,9.93,9.93,0,0,1-4.8-4c-2.1-3.4-1.4-17.2,7.8-16.8,7.8.3,8.1,10.8,8.1,13.3a7.52,7.52,0,0,1-6.3,7.4,52.81,52.81,0,0,1-8.9,1.1c-8.2.3-14.8,1.7-14.8,1.4s5.1-.2,7.1-3.5a9.11,9.11,0,0,0,1.1-5.4l-.1.1.1-.1a9.27,9.27,0,0,1-1.1,5.4c-2.1,3.5-8.9,4.8-12.3,2.2-4.5-3.5-1.2-12.7,1.5-16.8.9-1.4,2.5-3.8,5-4a5.42,5.42,0,0,1,3.5,1.1,6.16,6.16,0,0,1,2.7,3.8c-.1.1-1.8-4.6-5-5a4.62,4.62,0,0,0-3.2.9c-6.5,4.1-4.3,15.8-9.8,18-3.2,1.4-7.9-.9-8.2-2.8-.2-1.2,1-2.7,2.6-3s3.5,1,3.6,2.2c.2,1.8-3.6,4.8-5.5,4.3-8.2-2.2-28.2-12.1-40.9-13.9-14.4-2.1-44-8.7-63.5-11.5q-23.1-3.3-48.9-17.8a57,57,0,0,0-46.2-4.3l-41,14a34.82,34.82,0,0,1-23.4-.3l-10.7-4a140.91,140.91,0,0,0-50.6-8.5H7.71l-7.7.1"/>
<g class="ss-letters">
<path d="M179.85,90.23l3.27.4a8,8,0,0,1-2.87,4.45,9.72,9.72,0,0,1-11.84-.94,9.85,9.85,0,0,1-2.4-7.07q0-4.71,2.43-7.32a8.21,8.21,0,0,1,6.29-2.6,8,8,0,0,1,6.12,2.55q2.37,2.55,2.37,7.17c0,.19,0,.47,0,.85H169.28A7.2,7.2,0,0,0,171,92.43a5.18,5.18,0,0,0,3.9,1.63,4.83,4.83,0,0,0,3-.91A6.07,6.07,0,0,0,179.85,90.23Zm-10.39-5.11h10.42a6.38,6.38,0,0,0-1.19-3.54,4.86,4.86,0,0,0-3.92-1.83,5,5,0,0,0-3.67,1.46A5.78,5.78,0,0,0,169.46,85.12Z"/>
<path d="M185.07,96.24V77.57h2.85V80.4a7.8,7.8,0,0,1,2-2.61,3.47,3.47,0,0,1,2-.64,6.15,6.15,0,0,1,3.25,1l-1.09,2.94a4.48,4.48,0,0,0-2.32-.69,3,3,0,0,0-1.86.63,3.39,3.39,0,0,0-1.18,1.73,12.33,12.33,0,0,0-.52,3.69v9.77Z"/>
<path d="M203,96.24l-7.1-18.67h3.34l4,11.18c.43,1.21.83,2.46,1.19,3.77.28-1,.68-2.17,1.18-3.56l4.15-11.39H213l-7.07,18.67Z"/>
<path d="M215.79,74.11V70.47H219v3.64Zm0,22.13V77.57H219V96.24Z"/>
<path d="M261.58,86.91q0-5.19,2.88-7.68a8.66,8.66,0,0,1,5.87-2.08,8.39,8.39,0,0,1,6.3,2.52,9.65,9.65,0,0,1,2.44,7A12.32,12.32,0,0,1,278,92.31a7.62,7.62,0,0,1-3.15,3.21,9.19,9.19,0,0,1-4.51,1.14A8.36,8.36,0,0,1,264,94.15C262.38,92.47,261.58,90.06,261.58,86.91Zm3.25,0a8,8,0,0,0,1.56,5.37,5.22,5.22,0,0,0,7.86,0q1.58-1.8,1.57-5.47a7.69,7.69,0,0,0-1.58-5.24,5.21,5.21,0,0,0-7.85,0A7.92,7.92,0,0,0,264.83,86.91Z"/>
<path d="M283.27,96.24V80h-2.79V77.57h2.79v-2a8.47,8.47,0,0,1,.34-2.8,4,4,0,0,1,1.6-2,5.82,5.82,0,0,1,3.23-.77,15.58,15.58,0,0,1,2.95.32l-.47,2.76a10.45,10.45,0,0,0-1.87-.18,2.74,2.74,0,0,0-2,.62,3.33,3.33,0,0,0-.6,2.3v1.72h3.64V80h-3.64v16.2Z"/>
<path d="M300.33,93.41l.46,2.8a12.3,12.3,0,0,1-2.39.28,5.32,5.32,0,0,1-2.67-.55,3.07,3.07,0,0,1-1.34-1.43,11.6,11.6,0,0,1-.38-3.73V80h-2.32V77.57H294V73l3.14-1.9v6.52h3.18V80h-3.18V91a5.54,5.54,0,0,0,.17,1.74,1.35,1.35,0,0,0,.54.62,2.18,2.18,0,0,0,1.09.23A10.7,10.7,0,0,0,300.33,93.41Z"/>
<path d="M302.16,90.67l3.13-.49a4.41,4.41,0,0,0,1.47,2.88,5.09,5.09,0,0,0,3.37,1,4.89,4.89,0,0,0,3.23-.89,2.65,2.65,0,0,0,1.05-2.08,1.93,1.93,0,0,0-.93-1.69,14.06,14.06,0,0,0-3.23-1.07,28.94,28.94,0,0,1-4.83-1.52,4.8,4.8,0,0,1-2-1.77,4.74,4.74,0,0,1-.69-2.51,4.82,4.82,0,0,1,.57-2.31,5.1,5.1,0,0,1,1.56-1.77,6.51,6.51,0,0,1,2-.92,9.63,9.63,0,0,1,2.73-.38,10.62,10.62,0,0,1,3.86.64,5.18,5.18,0,0,1,2.45,1.71A6.65,6.65,0,0,1,317,82.39l-3.09.42a3.4,3.4,0,0,0-1.22-2.25,4.49,4.49,0,0,0-2.86-.81,5.18,5.18,0,0,0-3.11.72,2.12,2.12,0,0,0-.93,1.69,1.75,1.75,0,0,0,.39,1.11,2.71,2.71,0,0,0,1.21.84c.31.12,1.25.39,2.79.81a39.81,39.81,0,0,1,4.69,1.47,4.46,4.46,0,0,1,2.84,4.37,5.29,5.29,0,0,1-.93,3,5.94,5.94,0,0,1-2.66,2.16,9.68,9.68,0,0,1-3.94.76,8.75,8.75,0,0,1-5.54-1.51A7,7,0,0,1,302.16,90.67Z"/>
</g>
<path class="ss-stroke" stroke="url(#${id})" fill="none" stroke-width="8" stroke-linecap="round" d="M102.81,127.28l127.6-6.9a26.37,26.37,0,0,0,24.9-27.7,22,22,0,0,0-.5-3.7c-1.1-5.5.3,1.5-1.1-5.6a24.57,24.57,0,0,0-26.6-19.6L187.51,68a15.37,15.37,0,0,1-16.9-13.6,19.67,19.67,0,0,1,.1-4.2l.9-5.1a27.3,27.3,0,0,1,24.5-22.6l140.8-13.3"/>
<path class="ss-stroke" stroke="url(#${id})" fill="none" stroke-width="8" stroke-linecap="round" d="M5.61,122.08l127.6-6.9a26.37,26.37,0,0,0,24.9-27.7,22,22,0,0,0-.5-3.7c-1.1-5.5.3,1.5-1.1-5.6a24.41,24.41,0,0,0-26.6-19.5l-39.6,4.2A15.47,15.47,0,0,1,73.51,45l.9-5.1a27.4,27.4,0,0,1,24.5-22.6L239.61,4"/>
</svg>`;
  }

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  /* ---------- Tema ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const saved = store.get("ss-theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  function currentTheme() {
    const t = document.documentElement.dataset.theme;
    if (t) return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("ss-theme", next);
    document.querySelectorAll("[data-theme-toggle]").forEach((b) => (b.innerHTML = next === "dark" ? ICONS.sun : ICONS.moon));
  }

  /* ---------- Nav y footer ---------- */
  function navHTML() {
    const link = (href, label, key) => `<a href="${ROOT}${href}" class="${ACTIVE === key ? "active" : ""}">${label}</a>`;
    return `<div class="container nav-inner">
      <a class="brand" href="${ROOT}" aria-label="Servisofts — inicio">${logoSVG()}</a>
      <nav class="nav-links" id="navLinks">
        ${link("#servicios", "Servicios", "servicios")}
        ${link("#productos", "Productos", "productos")}
        ${link("#proceso", "Proceso", "proceso")}
        ${link("cotizaciones/", "Cotizaciones", "cotizaciones")}
        ${link("#contacto", "Contacto", "contacto")}
      </nav>
      <div class="nav-actions">
        <a class="btn btn-primary btn-sm nav-cta" href="${ROOT}#contacto">Hablemos ${ICONS.arrow}</a>
        <button class="icon-btn" data-theme-toggle aria-label="Cambiar tema">${currentTheme() === "dark" ? ICONS.sun : ICONS.moon}</button>
        <button class="icon-btn menu-btn" id="menuBtn" aria-label="Abrir menú" aria-expanded="false">${ICONS.menu}</button>
      </div>
    </div>`;
  }
  function footerHTML() {
    return `<div class="container">
      <div class="footer-inner">
        <div style="max-width:320px">
          ${logoSVG()}
          <p style="font-size:.95rem">Software a medida, apps móviles y sistemas empresariales desde Bolivia para el mundo.</p>
        </div>
        <div class="footer-links">
          <div><h4>Empresa</h4>
            <a href="${ROOT}#servicios">Servicios</a><a href="${ROOT}#productos">Productos</a><a href="${ROOT}#proceso">Proceso</a></div>
          <div><h4>Clientes</h4>
            <a href="${ROOT}cotizaciones/">Cotizaciones</a><a href="${ROOT}cotizaciones/sorteo/">App de Sorteo y Rifa</a><a href="https://servisofts.com" target="_blank" rel="noopener">servisofts.com</a></div>
        </div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Servisofts S.R.L. Todos los derechos reservados.</span><span>Hecho con código y café ☕</span></div>
    </div>`;
  }

  function toast(msg, type = "") {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; wrap.setAttribute("role", "status"); document.body.appendChild(wrap); }
    const t = document.createElement("div");
    t.className = "toast " + type; t.textContent = msg; wrap.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .3s"; t.style.opacity = "0"; setTimeout(() => t.remove(), 300); }, 2800);
  }

  function init() {
    const nav = document.querySelector("[data-nav]");
    if (nav) {
      nav.classList.add("nav"); nav.innerHTML = navHTML();
      const btn = nav.querySelector("#menuBtn");
      btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.innerHTML = open ? ICONS.close : ICONS.menu; btn.setAttribute("aria-expanded", open);
      });
      nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); btn.innerHTML = ICONS.menu; }));
    }
    const footer = document.querySelector("[data-footer]");
    if (footer) { footer.classList.add("footer"); footer.innerHTML = footerHTML(); }
    document.querySelectorAll("[data-logo]").forEach((el) => (el.innerHTML = logoSVG({ animate: el.dataset.logo === "animate" })));
    document.querySelectorAll("[data-theme-toggle]").forEach((b) => b.addEventListener("click", toggleTheme));

    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 })
      : null;
    document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  window.SS = { logoSVG, toast, ICONS, store, ROOT };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
