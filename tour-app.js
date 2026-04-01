/**
 * 제주 원데이 투어 - 앱 스크립트
 * tour-data.js의 데이터를 읽어 페이지를 동적으로 렌더링합니다.
 */

(function () {
  "use strict";

  // ===================================================
  //  현재 시즌 자동 감지 (월 기준)
  // ===================================================
  function detectCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1~12
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  }

  let activeSeason = detectCurrentSeason();

  // ===================================================
  //  사이트 기본 정보 렌더링
  // ===================================================
  function renderSiteInfo() {
    const { name, tagline, subTagline, notice } = SITE_INFO;

    const siteNameEl = document.getElementById("site-name");
    const heroSubEl = document.getElementById("hero-sub");
    const heroTitleEl = document.getElementById("hero-title");
    const noticeEl = document.getElementById("site-notice");
    const footerLogoEl = document.getElementById("footer-logo");

    if (siteNameEl) siteNameEl.textContent = name;
    if (heroSubEl) heroSubEl.textContent = subTagline;
    if (heroTitleEl) heroTitleEl.innerHTML = tagline.replace(/,\s*/g, ",<br>");
    if (noticeEl) noticeEl.textContent = notice;
    if (footerLogoEl) footerLogoEl.textContent = "🗺️ " + name;

    document.title = name + " | " + tagline;
    renderContactCards();
  }

  // ===================================================
  //  문의 카드 렌더링
  // ===================================================
  function renderContactCards() {
    const container = document.getElementById("contact-cards");
    if (!container) return;

    const { kakao, phone, instagram } = SITE_INFO.contact;

    const cards = [
      {
        href: kakao,
        icon: "💬",
        label: "카카오톡",
        value: "오픈채팅 바로가기",
        external: true
      },
      {
        href: "tel:" + phone.replace(/-/g, ""),
        icon: "📞",
        label: "전화 문의",
        value: phone,
        external: false
      },
      {
        href: instagram,
        icon: "📸",
        label: "인스타그램",
        value: "@instagram",
        external: true
      }
    ];

    container.innerHTML = cards
      .map(
        (c) => `
      <a href="${escapeAttr(c.href)}"
         class="contact-card"
         ${c.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
        <div class="contact-card-icon">${c.icon}</div>
        <div class="contact-card-label">${c.label}</div>
        <div class="contact-card-value">${escapeHtml(c.value)}</div>
      </a>`
      )
      .join("");
  }

  // ===================================================
  //  시즌 탭 렌더링
  // ===================================================
  function renderSeasonTabs() {
    const container = document.getElementById("season-tabs");
    if (!container) return;

    container.innerHTML = SEASONS.map(
      (s) => `
      <button
        class="season-tab${s.id === activeSeason ? " active" : ""}"
        data-season="${s.id}"
        role="tab"
        aria-selected="${s.id === activeSeason}"
        style="${s.id === activeSeason ? `background:${s.gradient};` : ""}"
        aria-label="${s.name} 시즌 코스 보기">
        <span class="season-tab-emoji">${s.emoji}</span>
        <span>${s.name}</span>
      </button>`
    ).join("");

    container.querySelectorAll(".season-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeSeason = btn.dataset.season;
        renderSeasonTabs();
        renderSeasonInfo();
        renderTourGrid();
      });
    });
  }

  // ===================================================
  //  현재 시즌 정보 렌더링
  // ===================================================
  function renderSeasonInfo() {
    const container = document.getElementById("season-info");
    if (!container) return;

    const season = SEASONS.find((s) => s.id === activeSeason);
    if (!season) return;

    container.innerHTML = `
      <div class="season-info-period">
        ${season.emoji} ${season.period}
      </div>
      <p class="season-info-desc">${escapeHtml(season.description)}</p>
    `;
  }

  // ===================================================
  //  코스 그리드 렌더링
  // ===================================================
  function renderTourGrid() {
    const container = document.getElementById("tour-grid");
    if (!container) return;

    const tours = TOURS[activeSeason] || [];

    if (tours.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--muted);">
          <div style="font-size:48px;margin-bottom:16px">🔜</div>
          <p>이 시즌의 코스를 준비 중입니다. 곧 업데이트될 예정이에요!</p>
        </div>`;
      return;
    }

    container.innerHTML = tours.map((t) => buildTourCard(t)).join("");

    container.querySelectorAll(".btn-schedule").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tourId = btn.dataset.tourId;
        openModal(tourId);
      });
    });
  }

  // ===================================================
  //  코스 카드 HTML 빌드
  // ===================================================
  function buildTourCard(tour) {
    const season = SEASONS.find((s) => s.id === activeSeason);
    const badgeClass = getBadgeClass(tour.badge);

    const highlightTags = (tour.highlights || [])
      .map((h) => `<span class="highlight-tag">📍 ${escapeHtml(h)}</span>`)
      .join("");

    return `
    <article class="tour-card" id="card-${escapeAttr(tour.id)}">
      <div class="card-header" style="background:${season ? season.gradient : "var(--light)"}22;">
        ${tour.badge ? `<span class="card-badge ${badgeClass}">${escapeHtml(tour.badge)}</span>` : ""}
        <h3 class="card-name">${escapeHtml(tour.name)}</h3>
        <p class="card-desc">${escapeHtml(tour.description)}</p>
      </div>
      <div class="card-meta">
        <span class="meta-item"><span class="meta-icon">⏱</span>${escapeHtml(tour.duration)}</span>
        <span class="meta-item"><span class="meta-icon">👥</span>${escapeHtml(tour.groupSize)}</span>
      </div>
      <div class="card-highlights">${highlightTags}</div>
      <div class="card-footer">
        <div class="card-price-group">
          <div class="card-price-note">${escapeHtml(tour.priceNote)}</div>
          <div class="card-price">₩${escapeHtml(tour.price)}<span>/인</span></div>
        </div>
        <button class="btn-schedule" data-tour-id="${escapeAttr(tour.id)}">일정 보기</button>
      </div>
    </article>`;
  }

  function getBadgeClass(badge) {
    if (!badge) return "";
    if (badge === "신규") return "badge-new";
    if (badge === "추천") return "badge-recommend";
    return "";
  }

  // ===================================================
  //  모달: 세부 일정 표시
  // ===================================================
  function findTour(id) {
    for (const seasonId of Object.keys(TOURS)) {
      const found = TOURS[seasonId].find((t) => t.id === id);
      if (found) return { tour: found, seasonId };
    }
    return null;
  }

  function openModal(tourId) {
    const result = findTour(tourId);
    if (!result) return;

    const { tour } = result;
    const season = SEASONS.find((s) => s.id === activeSeason);

    const scheduleItems = (tour.schedule || [])
      .map(
        (s) => `
      <li class="schedule-item">
        <span class="schedule-time">${escapeHtml(s.time)}</span>
        <div class="schedule-body">
          <div class="schedule-place">${escapeHtml(s.place)}</div>
          <div class="schedule-desc">${escapeHtml(s.desc)}</div>
        </div>
      </li>`
      )
      .join("");

    const tags = (tour.tags || [])
      .map((t) => `<span class="highlight-tag">#${escapeHtml(t)}</span>`)
      .join("");

    document.getElementById("modal-content").innerHTML = `
      <h2 class="modal-title">${escapeHtml(tour.name)}</h2>
      <p class="modal-desc">${escapeHtml(tour.description)}</p>
      <div class="modal-meta">
        <span class="meta-item"><span class="meta-icon">⏱</span>${escapeHtml(tour.duration)}</span>
        <span class="meta-item"><span class="meta-icon">👥</span>${escapeHtml(tour.groupSize)}</span>
        <span class="meta-item"><span class="meta-icon">💰</span>₩${escapeHtml(tour.price)}/인</span>
      </div>
      <div style="margin-bottom:20px;display:flex;flex-wrap:wrap;gap:6px;">${tags}</div>
      <h4 style="font-size:14px;font-weight:700;color:var(--muted);letter-spacing:.08em;margin-bottom:12px;text-transform:uppercase;">세부 일정</h4>
      <ul class="schedule-list">${scheduleItems}</ul>
      <a href="${escapeAttr(SITE_INFO.contact.kakao)}"
         target="_blank" rel="noopener noreferrer"
         class="modal-reserve">이 코스 예약하기 →</a>
    `;

    const overlay = document.getElementById("modal-overlay");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    overlay.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    overlay.setAttribute("aria-hidden", "true");
  }

  // ===================================================
  //  스크롤 Top 버튼
  // ===================================================
  function initScrollTop() {
    const btn = document.getElementById("scroll-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===================================================
  //  헬퍼: XSS 방지
  // ===================================================
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ===================================================
  //  초기화
  // ===================================================
  function init() {
    renderSiteInfo();
    renderSeasonTabs();
    renderSeasonInfo();
    renderTourGrid();
    initScrollTop();

    // 모달 닫기
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
