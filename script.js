/* =========================================================
   CONFIGURAÇÃO — edite aqui
   ---------------------------------------------------------
   WHATSAPP_NUMERO: seu número com DDI + DDD, só dígitos.
   Ex.: "5545999998888". Com o número preenchido, todos os
   botões abrem o WhatsApp com a mensagem já escrita.
   Se ficar vazio, o site usa o link curto do Instagram
   (wa.me/message/...) e copia a mensagem para o visitante colar.
   ========================================================= */
const WHATSAPP_NUMERO = "5545999702506";
const WHATSAPP_LINK_CURTO = "https://wa.me/message/TTAK2TPSPOZ5N1";

/* ========================================================= */
document.documentElement.classList.remove("no-js");

function linkWhatsApp(msg) {
  if (WHATSAPP_NUMERO) {
    return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg);
  }
  return WHATSAPP_LINK_CURTO;
}

const toastEl = document.getElementById("toast");
let toastTimer;
function toast(texto) {
  toastEl.textContent = texto;
  toastEl.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 4200);
}

async function copiar(texto) {
  try { await navigator.clipboard.writeText(texto); return true; } catch { return false; }
}

async function abrirWhatsApp(msg) {
  if (!WHATSAPP_NUMERO && await copiar(msg)) {
    toast("Mensagem copiada! É só colar no WhatsApp que vai abrir.");
  }
  window.open(linkWhatsApp(msg), "_blank", "noopener");
}

/* Botões de WhatsApp */
document.querySelectorAll("a.wa").forEach((a) => {
  const msg = a.dataset.msg || "Olá, Lucas!";
  a.href = linkWhatsApp(msg);
  a.target = "_blank";
  a.rel = "noopener";
  if (!WHATSAPP_NUMERO) {
    a.addEventListener("click", (e) => { e.preventDefault(); abrirWhatsApp(msg); });
  }
});

/* Formulário que monta a mensagem */
const form = document.getElementById("builder");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  let ok = true;
  ["inst", "cidade"].forEach((n) => {
    const campo = form.elements[n];
    const vazio = !campo.value.trim();
    campo.classList.toggle("is-invalid", vazio);
    if (vazio) ok = false;
  });
  const nota = document.getElementById("builder-note");
  if (!ok) { nota.textContent = "Preencha a instituição e a cidade."; return; }
  nota.textContent = "";

  const linhas = [
    "Olá, Lucas! Quero agendar a palestra Valorização da Vida.",
    "",
    "• Instituição: " + d.inst.trim(),
    "• Cidade: " + d.cidade.trim(),
    "• Público: " + d.publico,
  ];
  if (d.qtd.trim()) linhas.push("• Nº de pessoas: " + d.qtd.trim());
  if (d.data.trim()) linhas.push("• Data desejada: " + d.data.trim());
  if (d.nome.trim()) linhas.push("", "Meu nome é " + d.nome.trim() + ".");
  abrirWhatsApp(linhas.join("\n"));
});

/* Menu mobile */
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const aberto = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!aberto));
  burger.setAttribute("aria-label", aberto ? "Abrir menu" : "Fechar menu");
  menu.classList.toggle("is-open", !aberto);
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  burger.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
}));

/* Sombra no cabeçalho ao rolar */
const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Animação de entrada */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

/* Galeria ampliada */
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
document.querySelectorAll(".gallery__item").forEach((b) => b.addEventListener("click", () => {
  lbImg.src = b.dataset.full;
  lbImg.alt = b.querySelector("img").alt;
  lb.showModal();
}));
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".lightbox__close")) lb.close(); });

/* Ano no rodapé */
document.getElementById("ano").textContent = new Date().getFullYear();
