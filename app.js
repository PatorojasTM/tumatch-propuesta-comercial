// TuMatch — Propuesta Comercial | Shared JS
(function () {
  'use strict';

  // Central config — single source of truth for contact details
  var CFG = {
    whatsapp: '56934107448',
    email: 'patricio.rojas@tumatchinmobiliario.cl',
    launchDeadline: '2026-04-30T23:59:59-04:00',
    preLaunchDeadline: '2026-05-30T23:59:59-04:00'
  };

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var target = new Date(CFG.launchDeadline).getTime();
    var preTarget = new Date(CFG.preLaunchDeadline).getTime();
    var boxes = {
      d: el.querySelector('[data-d]'),
      h: el.querySelector('[data-h]'),
      m: el.querySelector('[data-m]'),
      s: el.querySelector('[data-s]')
    };
    var caption = el.querySelector('[data-cd-caption]');
    var timer = null;

    function tick() {
      var now = Date.now();
      var diff = target - now;
      if (diff <= 0) {
        if (timer) { clearInterval(timer); timer = null; }
        el.classList.add('is-expired');
        // Switch to secondary deadline (pre-launch) until that passes
        if (now < preTarget) {
          var dd = preTarget - now;
          if (boxes.d) boxes.d.textContent = pad(Math.floor(dd / 86400000));
          if (boxes.h) boxes.h.textContent = pad(Math.floor((dd / 3600000) % 24));
          if (boxes.m) boxes.m.textContent = pad(Math.floor((dd / 60000) % 60));
          if (boxes.s) boxes.s.textContent = pad(Math.floor((dd / 1000) % 60));
          if (caption) caption.textContent = 'para el cierre pre-lanzamiento (precio sube el 30 mayo)';
          timer = setInterval(tick, 1000);
        } else {
          if (boxes.d) boxes.d.textContent = '00';
          if (boxes.h) boxes.h.textContent = '00';
          if (boxes.m) boxes.m.textContent = '00';
          if (boxes.s) boxes.s.textContent = '00';
          if (caption) caption.textContent = 'ventana de lanzamiento cerrada — consulta precio regular';
        }
        return;
      }
      if (boxes.d) boxes.d.textContent = pad(Math.floor(diff / 86400000));
      if (boxes.h) boxes.h.textContent = pad(Math.floor((diff / 3600000) % 24));
      if (boxes.m) boxes.m.textContent = pad(Math.floor((diff / 60000) % 60));
      if (boxes.s) boxes.s.textContent = pad(Math.floor((diff / 1000) % 60));
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  function initRings() {
    document.querySelectorAll('[data-ring]').forEach(function (el) {
      var pct = parseFloat(el.getAttribute('data-ring')) || 0;
      pct = Math.max(0, Math.min(100, pct));
      var circumference = 97.4; // 2 * PI * 15.5
      var dash = (pct / 100) * circumference;
      var gradId = 'rg-' + Math.random().toString(36).slice(2, 8);
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', 'Cobertura ' + pct + ' por ciento');
      el.innerHTML =
        '<svg viewBox="0 0 36 36" width="60" height="60" aria-hidden="true" focusable="false">' +
          '<defs><linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#E8307A"/>' +
            '<stop offset="100%" stop-color="#a855f7"/>' +
          '</linearGradient></defs>' +
          '<circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>' +
          '<circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#' + gradId + ')" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + dash + ' ' + circumference + '"/>' +
        '</svg>' +
        '<div class="ring-label" aria-hidden="true">' + pct + '%</div>';
    });
  }

  // --- Billing period toggle for UF plans ---
  function initBillingToggle() {
    var toggle = document.getElementById('billing-toggle');
    if (!toggle) return;
    var UF_CLP = 39000; // aproximado, visible solo como referencia
    var periods = { monthly: { label: 'mensual', months: 1 }, semester: { label: 'por 6 meses', months: 6 }, annual: { label: 'por 12 meses', months: 12 } };
    var buttons = toggle.querySelectorAll('button[data-period]');
    function render(period) {
      buttons.forEach(function (b) {
        var active = b.getAttribute('data-period') === period;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      document.querySelectorAll('.plan-uf').forEach(function (card) {
        var priceEl = card.querySelector('[data-price]');
        var clpEl = card.querySelector('[data-clp]');
        var savingsEl = card.querySelector('[data-savings]');
        var unitEl = card.querySelector('[data-unit]');
        var value = card.getAttribute('data-' + period) || '0';
        var savings = card.getAttribute('data-savings-' + period) || '';
        var ufValue = parseFloat(value.replace(',', '.')) || 0;
        var clpValue = Math.round(ufValue * UF_CLP);
        if (priceEl) priceEl.textContent = value;
        if (unitEl) unitEl.textContent = 'UF ' + periods[period].label;
        if (clpEl) {
          var clpLabel = '≈ $' + clpValue.toLocaleString('es-CL') + ' CLP';
          if (period !== 'monthly') {
            var perMonth = Math.round(clpValue / periods[period].months).toLocaleString('es-CL');
            clpLabel += ' total · $' + perMonth + '/mes';
          }
          clpEl.textContent = clpLabel;
        }
        if (savingsEl) savingsEl.textContent = savings ? 'Ahorras ' + savings + ' UF' : '';
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { render(b.getAttribute('data-period')); });
    });
    render('monthly');
  }

  // --- Theme toggle (dark / light) ---
  function initThemeToggle() {
    var root = document.documentElement;
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    if (!buttons.length) return;
    function setTheme(theme) {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('tm-theme', theme); } catch (e) { /* quota / private mode */ }
      buttons.forEach(function (b) {
        b.setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var current = root.getAttribute('data-theme') || 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initRings();
    initBillingToggle();
    initThemeToggle();
  });
})();
