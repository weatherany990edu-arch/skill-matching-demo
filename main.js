(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "關閉導覽選單" : "開啟導覽選單");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const config = window.SITE_CONFIG || {};
  const enable = (selector, value, label) => {
    const link = document.querySelector(selector);
    if (!link || !value) return;
    link.href = value;
    link.textContent = label;
    link.classList.remove("disabled");
    link.removeAttribute("aria-disabled");
    if (/^https:\/\//.test(value)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  };
  const safeHttps = value => typeof value === "string" && /^https:\/\//.test(value) ? value : "";
  enable(".external-form", safeHttps(config.applicationFormUrl), "填寫家教需求表單 ↗");
  enable(".teacher-form", safeHttps(config.teacherFormUrl), "填寫教師申請表單 ↗");
  if (typeof config.contactEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) {
    enable(".contact-email", "mailto:" + config.contactEmail, "寄送 Email");
  }
  document.querySelectorAll('a[aria-disabled="true"]').forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });
})();
