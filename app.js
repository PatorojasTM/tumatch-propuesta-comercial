// TuMatch — Propuesta Comercial | Shared JS
(function () {
  'use strict';

  // --- Countdown to 30 abril 2026 23:59 -04:00 ---
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var target = new Date('2026-04-30T23:59:59-04:00').getTime();
    var boxes = {
      d: el.querySelector('[data-d]'),
      h: el.querySelector('[data-h]'),
      m: el.querySelector('[data-m]'),
      s: el.querySelector('[data-s]'),
    };
    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }
    function tick() {
      var diff = Math.max(0, target - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff / 3600000) % 24);
      var m = Math.floor((diff / 60000) % 60);
      var s = Math.floor((diff / 1000) % 60);
      if (boxes.d) boxes.d.textContent = pad(d);
      if (boxes.h) boxes.h.textContent = pad(h);
      if (boxes.m) boxes.m.textContent = pad(m);
      if (boxes.s) boxes.s.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  // --- Render circular ring percentages ---
  function initRings() {
    document.querySelectorAll('[data-ring]').forEach(function (el) {
      var pct = parseFloat(el.getAttribute('data-ring')) || 0;
      var circumference = 97.4; // 2 * PI * 15.5
      var dash = (pct / 100) * circumference;
      var gradId = 'ring-grad-' + Math.random().toString(36).slice(2, 8);
      el.innerHTML =
        '<svg viewBox="0 0 36 36" width="60" height="60">' +
          '<defs><linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#E8307A"/>' +
            '<stop offset="100%" stop-color="#a855f7"/>' +
          '</linearGradient></defs>' +
          '<circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>' +
          '<circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#' + gradId + ')" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + dash + ' ' + circumference + '"/>' +
        '</svg>' +
        '<div class="ring-label">' + pct + '%</div>';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initRings();
  });
})();
