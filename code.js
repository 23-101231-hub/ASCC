(() => {
  "use strict";

  const STORAGE_KEY = "ascc_contact_messages";
  const THEME_KEY = "ascc_theme";

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  function setHTML(id, value) {
    const el = $(id);
    if (el) el.innerHTML = value;
  }

  function safeToNumber(val) {
    const n = Number(val);
    return Number.isFinite(n) ? n : 0;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setTitle() {
    document.title = "ASCCforhelp";
  }

  function setStaticText() {
    setText("text0", "Home");
    setText("text1", "About");
    setText("text2", "Work");
    setText("text3", "Impact");
    setText("text4", "Contact");
    setText("loginBtn", "Login");
    setText("srTheme", "Toggle theme");

    setHTML("heroTitle", "A Small Act From<br>You Can Change<br>Life Today");
    setText("heroArabic", "فاستبقوا الخيرات");
    setText("ctaDonate", "Donate Now");
    setText("ctaVolunteer", "Become a Volunteer");

    setHTML("whyTitle", 'Why Choose <span>ASCC</span>');
    setText(
      "whyIntro",
      "ASCC is a charitable initiative focused on delivering real, direct help to families and individuals facing hardship. We believe support should be fast, transparent, and reach those who truly need it. "
    );
    setText(
      "whyMore",
      "We also support urgent medical and emergency cases, help brides with essentials, and provide blankets, clothing, and seasonal supplies through verified channels. Every donation is tracked to maximize impact and protect donor trust."
    );

    setText("readMoreLabel", "Read More");
    setText("readMoreArrow", "⌄");

    setText("whyLi0", "Direct aid, no unnecessary delays");
    setText("whyLi1", "Transparent use of donations");
    setText("whyLi2", "Support for urgent and ongoing cases");
    setText("whyLi3", "Dignity first support");

    setText("workTitle", "Our Work");
    setHTML("workSub", "We assess each case carefully to ensure that support reaches<br>the right people and creates real impact");

    setText("impactTitle", "Our Impact");
    setText("impactSub", "Together, we are making real change in real lives.");
    setText("impactLabel0", "People Supported");
    setText("impactLabel1", "Funds Raised (EGP)");
    setText("impactLabel2", "Medical and Emergency Cases");
    setText("impactLabel3", "Community Initiatives");

    setText("contactTitle", "Get Involved Today");
    setText("contactSub", "Have questions? Want to volunteer? Reach out to us.");
    setText("labelName", "Your Name");
    setText("labelEmail", "Your Email");
    setText("labelMessage", "Your Message");

    const name = $("name");
    const email = $("email");
    const message = $("message");
    if (name) name.placeholder = "Enter your name";
    if (email) email.placeholder = "Enter your email";
    if (message) message.placeholder = "Write your message";
    setText("sendBtnText", "Send Message");

    setText("soc0", "f");
    setText("soc1", "𝕏");
    setText("soc2", "◯");
    setText("soc3", "in");

    setText("footerH0", "Quick Links");
    setText("footerL0", "About Us");
    setText("footerL1", "Our Causes");
    setText("footerL2", "Impact");
    setText("footerL3", "Volunteer");

    setText("footerH1", "Support");
    setText("footerS0", "Donate");
    setText("footerS1", "FAQ");
    setText("footerS2", "Transparency");
    setText("footerS3", "Contact");

    setText("footerH2", "Contact Us");
    setText("footerC0", " asccfor@gmail.com");
    setText("footerC1", " 19757");
    setText("footerC2", " Egypt");

    setText("copyright0", "©");
    setText("copyright1", "ASCC. All rights reserved.");

    setText("scrollTopBtn", "↑");
  }

  function setYear() {
    const y = $("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function setupReadMore() {
    const btn = $("readMoreBtn");
    const p = $("whyText");
    const label = $("readMoreLabel");
    if (!btn || !p || !label) return;

    const collapsedLines = safeToNumber(p.dataset.collapsedLines) || 3;
    p.style.webkitLineClamp = String(collapsedLines);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = p.classList.toggle("is-expanded");
      btn.classList.toggle("is-expanded", expanded);
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      label.textContent = expanded ? "Read Less" : "Read More";
      p.style.webkitLineClamp = expanded ? "unset" : String(collapsedLines);
    });
  }

  function renderWorkCards() {
    const wrap = $("workCards");
    if (!wrap) return;

    const data = [
      { title: "Family and Food Support", det: "We provide food assistance and essential daily needs to families struggling to meet basic living requirements.", img: "img/1.png", raised: 48500, goal: 150000 },
      { title: "Supporting Brides in Need", det: "Helping brides start married life with dignity and essential support based on verified need.", img: "img/2.png", raised: 180000, goal: 600000 },
      { title: "Clothing and Essential Supplies", det: "Providing clothing, blankets, and essential supplies to those in need based on assessed shortages.", img: "img/3.png", raised: 245500, goal: 800000 },
      { title: "Medical and Emergency Assistance", det: "ASCC supports patients who require urgent medical treatment, medications, or emergency procedures.", img: "img/4.png", raised: 290500, goal: 500000 },
    ];

    wrap.innerHTML = data
      .map((item) => {
        const raised = safeToNumber(item.raised);
        const goal = Math.max(1, safeToNumber(item.goal));
        const percent = Math.min(100, Math.round((raised / goal) * 100));
        const t = escapeHtml(item.title);
        const d = escapeHtml(item.det);
        const img = escapeHtml(item.img);

        return `
          <article class="work-card">
            <img src="${img}" alt="${t}" loading="lazy">
            <div class="work-body">
              <h3>${t}</h3>
              <p>${d}</p>
              <div class="amounts">
                <span>Raised: ${raised.toLocaleString()} EGP</span>
                <span>Goal: ${goal.toLocaleString()} EGP</span>
              </div>
              <div class="progress" aria-label="Funding progress">
                <div class="progress-bar" style="width:${percent}%"></div>
              </div>
              <small>${percent}% funded</small>
              <a href="#" aria-label="Donate to ${t}">Donate to This Cause</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function setupCounters() {
    const section = document.getElementById("impact");
    const counters = Array.from(document.querySelectorAll(".counter"));
    if (!section || !counters.length) return;

    let started = false;

    function animateCounter(el) {
      const target = safeToNumber(el.dataset.target);
      const duration = 900;
      const start = performance.now();

      function tick(t) {
        const progress = Math.min(1, (t - start) / duration);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + "+";
      }

      requestAnimationFrame(tick);
    }

    function startAll() {
      counters.forEach(animateCounter);
      started = true;
    }

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !started) {
              startAll();
              obs.disconnect();
              break;
            }
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(section);
    } else {
      function onScroll() {
        if (started) return;
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          startAll();
          window.removeEventListener("scroll", onScroll);
        }
      }
      window.addEventListener("scroll", onScroll);
      onScroll();
    }
  }

  function validateForm(data) {
    const nameError = $("nameError");
    const emailError = $("emailError");
    const messageError = $("messageError");
    const successBox = $("successBox");

    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (messageError) messageError.textContent = "";
    if (successBox) successBox.textContent = "";

    let valid = true;

    if (!data.name || data.name.length < 2) {
      if (nameError) nameError.textContent = "Please enter your name (min 2 chars).";
      valid = false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
    if (!emailOk) {
      if (emailError) emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (!data.message || data.message.length < 10) {
      if (messageError) messageError.textContent = "Message should be at least 10 characters.";
      valid = false;
    }

    return valid;
  }

  function saveFormData(data) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift({
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: new Date().toISOString(),
      name: data.name,
      email: data.email,
      message: data.message,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  function showSuccessSendMsg(msg) {
    const successBox = $("successBox");
    if (!successBox) return;
    successBox.textContent = msg;
    successBox.style.opacity = "1";
    window.setTimeout(() => {
      successBox.style.opacity = "0.95";
    }, 1200);
  }

  function setupContactForm() {
    const form = $("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: (document.getElementById("name")?.value || "").trim(),
        email: (document.getElementById("email")?.value || "").trim(),
        message: (document.getElementById("message")?.value || "").trim(),
      };

      if (!validateForm(data)) return;

      saveFormData(data);
      showSuccessSendMsg("Message sent successfully, we will contact you soon.");
      form.reset();
    });
  }

  function setupScrollToTop() {
    const btn = $("scrollTopBtn");
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle("show", window.scrollY > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function setupThemeToggle() {
    const btn = $("themeToggle");
    if (!btn) return;

    const root = document.documentElement;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      localStorage.setItem(THEME_KEY, theme);
    }

    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") apply(saved);

    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      apply(current === "light" ? "dark" : "light");
    });
  }

  function setupSinglePageNav() {
    const header = document.querySelector(".topbar");
    const getHeaderH = () => (header ? header.offsetHeight : 0);

    const navLinks = Array.from(document.querySelectorAll(".nav__link"))
      .map((a) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!href.startsWith("#")) return null;
        const id = href.slice(1);
        return { a, id };
      })
      .filter(Boolean);

    if (!navLinks.length) return;

    navLinks.forEach(({ a, id }) => {
      a.addEventListener("click", (e) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!href.startsWith("#")) return;

        e.preventDefault();

        const headerH = getHeaderH();
        const target = id ? document.getElementById(id) : null;
        const topEl = document.getElementById("top");
        const dest = target || topEl || document.body;

        const y = dest.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        history.replaceState(null, "", href);
      });
    });

    const sectionIds = navLinks
      .map((x) => x.id)
      .filter((id) => id && id !== "top");

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    function setActiveByScroll() {
      const headerH = getHeaderH();
      const pos = window.scrollY + headerH + 6;

      let activeId = "top";
      for (const s of sections) {
        if (pos >= s.offsetTop) activeId = s.id;
      }

      navLinks.forEach(({ a, id }) => {
        a.classList.toggle("is-active", id === activeId);
      });
    }

    window.addEventListener("scroll", setActiveByScroll, { passive: true });
    window.addEventListener("resize", setActiveByScroll);
    setActiveByScroll();

    const initialHash = (location.hash || "").trim();
    if (initialHash && initialHash.startsWith("#")) {
      const id = initialHash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const headerH = getHeaderH();
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerH + 1;
        window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
      }
    }
  }

  function setupImageSlider() {
    const imgEl = document.getElementById("sliderImage");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");
    const dotsWrap = document.getElementById("sliderDots");

    if (!imgEl || !prevBtn || !nextBtn || !dotsWrap) return;

    const images = [
      { src: "img/PHOTO-2024-03-11-11-04-42.jpg", alt: "Gallery image 1" },
      { src: "img/PHOTO-2024-03-11-10-59-28.jpg", alt: "Gallery image 2" },
      { src: "img/PHOTO-2024-03-11-11-07-06.jpg", alt: "Gallery image 3" },
      { src: "img/PHOTO-2024-03-11-11-05-28.jpg", alt: "Gallery image 4" },
      { src: "img/PHOTO-2024-03-11-11-06-57.jpg", alt: "Gallery image 4" },
    ];

    let index = 0;

    function renderDots() {
      dotsWrap.innerHTML = images
        .map((_, i) => {
          const active = i === index ? "is-active" : "";
          return `<button class="slider__dot ${active}" type="button" data-i="${i}" aria-label="Go to slide ${i + 1}"></button>`;
        })
        .join("");

      Array.from(dotsWrap.querySelectorAll(".slider__dot")).forEach((b) => {
        b.addEventListener("click", () => {
          const i = Number(b.dataset.i);
          if (!Number.isFinite(i)) return;
          goTo(i);
        });
      });
    }

    function setImage(i) {
      const item = images[i];
      imgEl.src = item.src;
      imgEl.alt = item.alt || "Gallery image";
    }

    function goTo(i) {
      const nextIndex = (i + images.length) % images.length;
      if (nextIndex === index) return;

      imgEl.classList.add("is-fading");

      window.setTimeout(() => {
        index = nextIndex;
        setImage(index);
        renderDots();
        imgEl.classList.remove("is-fading");
      }, 180);
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    setImage(index);
    renderDots();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTitle();
    setStaticText();
    setYear();
    setupReadMore();
    renderWorkCards();
    setupCounters();
    setupContactForm();
    setupScrollToTop();
    setupThemeToggle();
    setupSinglePageNav();
    setupImageSlider();
  });
})();





  