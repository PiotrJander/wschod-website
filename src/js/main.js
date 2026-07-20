/* ════════════════════════════════════════════════════════════
   Progressive enhancement only. The site is fully navigable and
   readable without JavaScript (real links, server-rendered year).
   This script adds: the mobile nav drawer and a copy-to-clipboard
   button for the bank account number.
   ════════════════════════════════════════════════════════════ */
(() => {
  // ─── Mobile nav drawer ───
  const navMobile = document.getElementById("navMobile");
  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");

  const openMobileNav = () => {
    navMobile?.classList.add("is-open");
    navToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeMobileNav = () => {
    navMobile?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  navToggle?.addEventListener("click", openMobileNav);
  navClose?.addEventListener("click", closeMobileNav);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  // ─── Copy IBAN ───
  const copyBtn = document.getElementById("copyIban");
  copyBtn?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const iban = (btn.dataset.iban || "").trim();
    try {
      await navigator.clipboard.writeText(iban);
      const prev = btn.innerHTML;
      btn.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg> Skopiowano';
      setTimeout(() => (btn.innerHTML = prev), 1600);
    } catch {
      btn.innerHTML = "Naciśnij \u2318C";
    }
  });
})();
