/**
 * js/fleet.js — 车队展示:顶部标签切换 Alphard / HiAce;缩略图切换主图;"查看参考价"按钮自动选中报价工具里的对应车型
 */
(function () {
  // 1. 标签切换
  var tabs = document.querySelectorAll('#fleet-tabs button'), shows = document.querySelectorAll('.showcase');
  tabs.forEach(function (b) {
    b.onclick = function () {
      tabs.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      shows.forEach(function (s) { s.hidden = s.dataset.f !== b.dataset.f; });
    };
  });

  // 2. 缩略图 → 主图(白底侧视图用 contain,避免被裁掉)
  shows.forEach(function (s) {
    var main = s.querySelector('.gal-main img'), cap = s.querySelector('.gal-main figcaption');
    s.querySelectorAll('.th').forEach(function (t) {
      t.onclick = function () {
        s.querySelectorAll('.th').forEach(function (x) { x.classList.toggle('on', x === t); });
        main.style.opacity = 0;
        setTimeout(function () {
          main.src = t.dataset.src; main.alt = t.querySelector('img').alt;
          main.classList.toggle('contain', /side/.test(t.dataset.src));
          cap.dataset.i18n = t.dataset.cap; cap.textContent = GL.t(t.dataset.cap);
          main.style.opacity = 1;
        }, 120);
      };
    });
  });

  // 3. "查看该车型参考价":选中报价工具里对应车型
  document.querySelectorAll('[data-car]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = document.getElementById('rate-car');
      if (sel) { sel.value = a.dataset.car; sel.dispatchEvent(new Event('change')); }
    });
  });

  // 4. 放大镜(鼠标悬停,约 2.6 倍)
  shows.forEach(function (s) {
    var fig = s.querySelector('.gal-main'), img = fig.querySelector('img'), lens = fig.querySelector('.lens'), Z = 2.6;
    fig.addEventListener('mouseenter', function () { lens.hidden = false; });
    fig.addEventListener('mouseleave', function () { lens.hidden = true; });
    fig.addEventListener('mousemove', function (e) {
      var r = fig.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      // 图片在容器内按 cover / contain 显示:换算成图片自身的显示区域
      var nw = img.naturalWidth || r.width, nh = img.naturalHeight || r.height, contain = img.classList.contains('contain');
      var k = contain ? Math.min(r.width / nw, r.height / nh) : Math.max(r.width / nw, r.height / nh);
      var dw = nw * k, dh = nh * k, ox = (r.width - dw) / 2, oy = (r.height - dh) / 2;
      lens.style.left = x + 'px'; lens.style.top = y + 'px';
      lens.style.backgroundImage = 'url("' + img.src + '")';
      lens.style.backgroundSize = dw * Z + 'px ' + dh * Z + 'px';
      lens.style.backgroundPosition = (-(x - ox) * Z + lens.offsetWidth / 2) + 'px ' + (-(y - oy) * Z + lens.offsetHeight / 2) + 'px';
    });
  });

  // 5. 全屏查看:滚轮 / 按钮缩放,拖动平移,双指缩放,键盘 ← → Esc + −
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lb-img'), stage = lb.querySelector('.lb-stage'), cap = document.getElementById('lb-cap'), zt = document.getElementById('lb-z');
  var list = [], idx = 0, sc = 1, tx = 0, ty = 0;
  function apply() { lbImg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + sc + ')'; zt.textContent = Math.round(sc * 100) + '%'; }
  function reset() { sc = 1; tx = 0; ty = 0; lbImg.style.transformOrigin = '50% 50%'; apply(); }
  function show(i) { idx = (i + list.length) % list.length; lbImg.src = list[idx].src; cap.textContent = list[idx].cap; reset(); }
  function zoomAt(f, cx, cy) {   // 以 (cx,cy)(相对舞台中心)为中心缩放
    var ns = Math.max(1, Math.min(8, sc * f)); f = ns / sc;
    tx = cx - (cx - tx) * f; ty = cy - (cy - ty) * f; sc = ns; if (sc === 1) { tx = 0; ty = 0; } apply();
  }
  function open(s) {
    list = Array.prototype.map.call(s.querySelectorAll('.th'), function (t) { return { src: t.dataset.src, cap: GL.t(t.dataset.cap) + ' · ' + t.querySelector('img').alt }; });
    var cur = s.querySelector('.th.on'); idx = Array.prototype.indexOf.call(s.querySelectorAll('.th'), cur);
    lb.hidden = false; document.body.style.overflow = 'hidden'; show(Math.max(0, idx));
  }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  shows.forEach(function (s) { var fig = s.querySelector('.gal-main'); fig.onclick = function () { open(s); }; fig.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(s); } }; });
  document.getElementById('lb-x').onclick = close;
  document.getElementById('lb-in').onclick = function () { zoomAt(1.5, 0, 0); };
  document.getElementById('lb-out').onclick = function () { zoomAt(1 / 1.5, 0, 0); };
  document.getElementById('lb-reset').onclick = reset;
  document.getElementById('lb-prev').onclick = function () { show(idx - 1); };
  document.getElementById('lb-next').onclick = function () { show(idx + 1); };
  stage.addEventListener('wheel', function (e) { e.preventDefault(); var r = stage.getBoundingClientRect(); zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2); }, { passive: false });
  stage.addEventListener('dblclick', function (e) { var r = stage.getBoundingClientRect(); if (sc > 1) reset(); else zoomAt(3, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2); });
  var ptrs = {}, last = null, lastD = 0;
  stage.addEventListener('pointerdown', function (e) { stage.setPointerCapture(e.pointerId); ptrs[e.pointerId] = e; last = { x: e.clientX, y: e.clientY }; stage.classList.add('drag'); });
  stage.addEventListener('pointermove', function (e) {
    if (!ptrs[e.pointerId]) return; ptrs[e.pointerId] = e; var ids = Object.keys(ptrs);
    if (ids.length === 2) {   // 双指缩放
      var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), r = stage.getBoundingClientRect();
      if (lastD) zoomAt(d / lastD, (a.clientX + b.clientX) / 2 - r.left - r.width / 2, (a.clientY + b.clientY) / 2 - r.top - r.height / 2); lastD = d; return;
    }
    if (sc > 1 && last) { tx += e.clientX - last.x; ty += e.clientY - last.y; apply(); } last = { x: e.clientX, y: e.clientY };
  });
  function up(e) { delete ptrs[e.pointerId]; lastD = 0; last = null; stage.classList.remove('drag'); }
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(idx - 1); else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === '+' || e.key === '=') zoomAt(1.5, 0, 0); else if (e.key === '-') zoomAt(1 / 1.5, 0, 0);
  });
})();
