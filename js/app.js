/* Maqueta IEEE ESPOCH v3 · comportamiento
   Sin dependencias. Los comentarios se guardan en este navegador y se exportan o importan como JSON. */
(() => {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (n, cls = 'ic') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  };
  const toastEl = $('#toast');
  let toastT;
  const toast = (msg) => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2200); };

  const SCREENS = { inicio: 'Inicio público', resumen: 'Resumen', tablero: 'Tablero', personas: 'Personas' };
  const stage = $('#stage');

  /* ---------- Datos de ejemplo (los reales están marcados en DESIGN.md) ---------- */
  const DATA = {
    stats: [['220', 'miembros activos'], ['2.ª', 'rama estudiantil más grande del Ecuador'], ['10', 'capítulos técnicos y grupos de afinidad'], ['[Año]', 'año de fundación de la rama']],
    events: [
      { day: '16–20', month: 'noviembre 2026', mode: 'Virtual', title: 'CONESLAT 2026', meta: 'Congreso Estudiantil Latinoamericano de IEEE. Charlas en línea por Microsoft Teams.', cta: 'Inscribirme' },
      { day: '27', month: 'noviembre 2026', mode: 'En línea', title: 'Postulación a directivas 2027', meta: 'Cierre de la convocatoria para las directivas de todas las unidades.', cta: 'Postular' },
      { day: '[Día]', month: '[mes 2026]', mode: '[Modalidad]', title: '[Próximo evento de un capítulo]', meta: '[Unidad que organiza] · [lugar o plataforma]', cta: 'Ver detalles' },
    ],
    caps: [['CS', 'Computer Society', 'cs'], ['APS', 'Antennas and Propagation Society', 'aps'], ['EMBS', 'Engineering in Medicine and Biology Society', 'embs'], ['IES', 'Industrial Electronics Society', 'ies'], ['WIE', 'Women in Engineering', 'wie'], ['SIGHT', 'Special Interest Group on Humanitarian Technology', 'sight']],
    milestones: [
      ['[Mes] 2026', 'Taller de Directivos', 'Segundo lugar en la Feria de ciudades, representando a Guano.'],
      ['[Mes] 2026', 'Congreso CSAI', 'Semana de charlas técnicas con capítulos CS de la Región 9.'],
      ['Septiembre 2026', 'RNR IEEE Ecuador', 'Reunión Nacional de Ramas en la EPN, Quito.'],
      ['[Mes] 2026', 'LAMC 2026', 'Participación en el concurso de videos multilingüe de IEEE MTT-S.'],
      ['Noviembre 2026', 'CONESLAT 2026', 'Parte del equipo organizador del congreso latinoamericano.'],
    ],
    photos: [
      ['grupo-ponchos-selfie.webp', 'Integrantes de la rama con ponchos azules tejidos con la palabra IEEE se toman una selfie al aire libre.', 'gA', '50% 40%'],
      ['ponchos-silueta-cerro.webp', 'Siluetas de un grupo con ponchos en lo alto de un cerro, bajo un cielo nublado.', 'gT', '50% 60%'],
      ['gala-reconocimientos-1.webp', 'Integrantes de la rama en traje formal sostienen sus reconocimientos frente a un mural en relieve.', '', '50% 40%'],
      ['encuentro-sala-cs-software.webp', 'Grupo numeroso en una sala con las banderas de IEEE Computer Society y de la asociación de estudiantes de Software.', '', '50% 60%'],
      ['encuentro-salon-banderas.webp', 'Más de cien estudiantes reunidos en un salón junto a banderas de varias ramas y capítulos IEEE.', 'gW', '50% 55%'],
      ['selfie-grupo-pasillo.webp', 'Selfie de un grupo de integrantes en un pasillo, algunos con ponchos y una mascota de peluche.', 'gW', '50% 35%'],
    ],
    week: [
      ['Lun', 16, [['v', 'Informe de octubre', 'Venció el lunes'], ['e', 'CONESLAT · Apertura', '18:00 · Teams']]],
      ['Mar', 17, [['r', 'Directiva CS', '19:00 · Sala 3'], ['e', 'CONESLAT · Charlas', '18:00 · Teams']]],
      ['Mié', 18, [['d', 'Banner de ponentes', 'Hoy · Comunicación'], ['e', 'CONESLAT · Charlas', '18:00 · Teams']]],
      ['Jue', 19, [['r', 'Comisión Ponentes', '17:00 · Teams'], ['d', 'Certificados', 'Comunicación']]],
      ['Vie', 20, [['e', 'CONESLAT · Clausura', '18:00 · Teams']]],
    ],
    projects: [
      ['CONESLAT 2026', 'Rama', '20 nov', 62, 'warn', 'Atención', '3 tareas de Ponentes vencen esta semana'],
      ['Taller de robótica para niños', 'Rama · TryEngineering', '15 ene', 18, 'ok', 'Al día', 'Postulación lista para revisión'],
      ['Pines de capítulos', 'Rama', '23 nov', 40, 'risk', 'En riesgo', 'Proveedor sin confirmar; faltan 5 días'],
    ],
    tasks: [['Confirmar a 5 ponentes', 'Hoy · CONESLAT 2026', true, false], ['Revisar el banner de ponentes', 'Mañana · CONESLAT 2026', false, false], ['Enviar el informe de octubre', 'Venció el lunes', false, true]],
    actions: [['inbox', '3 solicitudes de registro', 'La más antigua, hace 2 días', '#personas'], ['speaker', 'Aviso de WIE por publicar', 'Enviado por la secretaria de WIE', '#resumen'], ['id', 'Cambio de cargo en IES', 'Nuevo tesorero desde el 1 dic', '#personas']],
    people: [
      ['YP', 'Yosef Puetate', 'Rama', 'Chair', 'a', 'Ahora'],
      ['AT', 'Ana Torres', 'IEEE CS', 'Chair', 'a', 'Hace 1 h'],
      ['MR', 'Mateo Ríos', 'IEEE APS', 'Secretario', 'a', 'Hoy'],
      ['LC', 'Lucía Cárdenas', 'IEEE WIE', 'Chair', 'a', 'Ayer'],
      ['DV', 'Daniel Vega', 'IEEE IES', 'Tesorero', 'p', 'Nunca'],
      ['SG', 'Sofía Guamán', 'IEEE EMBS', 'Vice Chair', 'a', 'Hace 3 días'],
      ['JM', 'Javier Morales', 'IEEE SIGHT', 'Secretario', 's', 'Hace 2 meses'],
    ],
  };
  const AV = ['av-a', 'av-b', 'av-c'];
  const COM = { L: ['Logística', 'var(--c-blue)'], C: ['Comunicación', 'var(--c-purple)'], P: ['Ponentes', 'var(--c-teal)'], F: ['Finanzas', 'var(--c-gray)'] };
  const WHO = { YP: ['Yosef Puetate', 0], AT: ['Ana Torres', 1], MR: ['Mateo Ríos', 2], LC: ['Lucía Cárdenas', 0], DV: ['Daniel Vega', 1] };
  const COLS = [
    { id: 'todo', name: 'Por hacer', dot: 'var(--control)' },
    { id: 'doing', name: 'En curso', dot: 'var(--primary)' },
    { id: 'review', name: 'En revisión', dot: 'var(--c-purple)' },
    { id: 'done', name: 'Hecho', dot: 'var(--success)' },
  ];
  let board = {
    todo: [['t1', 'Diseñar los certificados', 'C', '19 nov', 'LC', { sub: '0/3' }], ['t2', 'Reservar sala para la clausura', 'L', '18 nov', 'MR', {}], ['t3', 'Presupuesto de refrigerios', 'F', '21 nov', 'DV', {}], ['t4', 'Guion del presentador', 'P', '19 nov', 'AT', {}]],
    doing: [['t5', 'Confirmar a 5 ponentes', 'P', 'Hoy', 'YP', { high: true, sub: '2/5' }], ['t6', 'Banner de ponentes', 'C', 'Hoy', 'LC', { sub: '1/3' }], ['t7', 'Enlaces de Teams por charla', 'L', '16 nov', 'MR', { blocked: 'falta la cuenta institucional', late: true }]],
    review: [['t8', 'Agenda de la semana', 'P', '15 nov', 'AT', { sub: '4/4' }], ['t9', 'Publicación de lanzamiento', 'C', '15 nov', 'LC', {}]],
    done: [['t10', 'Formulario de inscripción', 'L', '10 nov', 'YP', { sub: '3/3' }], ['t11', 'Lista de ponentes candidatos', 'P', '8 nov', 'AT', {}]],
  };

  /* ---------- Inicio público ---------- */
  $('#stats').innerHTML = DATA.stats.map(([n, l]) => `<div class="stat rv"><b class="d t80">${esc(n)}</b><span class="t17">${esc(l)}</span></div>`).join('');
  $('#events').innerHTML = DATA.events.map((e) => `<div class="rv" style="display:flex"><article class="card ev" style="flex:1">
      <div class="ev-top"><div style="display:flex;flex-direction:column"><span class="d t48 ev-day">${esc(e.day)}</span><span class="t14 ev-month">${esc(e.month)}</span></div><span class="chip">${esc(e.mode)}</span></div>
      <div class="ev-body"><h3 class="d t22">${esc(e.title)}</h3><p class="t14">${esc(e.meta)}</p></div>
      <a class="more" href="#inicio"><span class="uline">${esc(e.cta)}</span>${icon('arrow')}</a></article></div>`).join('');
  $('#caps').innerHTML = DATA.caps.map(([c, n, f]) => `<div class="rv" style="display:flex"><a class="card cap" href="#inicio" style="flex:1">
      <span class="cap-plate"><img src="img/capitulos/${f}.png" alt="Logo de IEEE ${esc(c)}" loading="lazy"></span>
      <span class="cap-name"><b class="d t22">${esc(c)}</b><span class="t14">${esc(n)}</span></span></a></div>`).join('');
  $('#milestones').innerHTML = DATA.milestones.map(([d, t, x]) => `<li class="rv"><span class="tl-dot" aria-hidden="true"></span><span class="t14 tl-date">${esc(d)}</span><h3 class="d t22">${esc(t)}</h3><p class="t14">${esc(x)}</p></li>`).join('');
  $('#gallery').innerHTML = DATA.photos.map(([f, a, c, p]) => `<a class="tile ${c}" href="#inicio" aria-label="${esc(a)}"><img class="rimg" src="img/fotos/${f}" alt="${esc(a)}" loading="lazy" style="object-position:${p}"></a>`).join('');

  const menuBtn = $('.top-menu');
  menuBtn.addEventListener('click', () => {
    if (document.body.classList.contains('commenting')) return;
    const open = !$('.hero').classList.contains('menu-open');
    $('.hero').classList.toggle('menu-open', open); menuBtn.setAttribute('aria-expanded', String(open));
  });
  $('.top-nav').addEventListener('click', () => { $('.hero').classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); });

  /* ---------- Estructura del área de directivos ---------- */
  const NAV = [
    ['Mi espacio', [['resumen', 'Resumen', 'dash', '#resumen'], ['tablero', 'Proyectos', 'folder', '#tablero', 2, true], ['agenda', 'Avisos y eventos', 'cal', '#resumen'], ['docs', 'Documentos', 'file', '#resumen']]],
    ['Directiva', [['cargos', 'Cargos', 'id', '#resumen'], ['dir', 'Directorio', 'users', '#resumen'], ['stats', 'Estadísticas', 'chart', '#resumen']]],
    ['Administración', [['personas', 'Personas', 'user', '#personas'], ['sol', 'Solicitudes', 'inbox', '#personas', 3], ['sitio', 'Ver sitio público', 'eye', '#inicio']]],
  ];
  const sbMini = store.get('maqueta-ieee-lateral', false);
  $$('.sb').forEach((sb) => {
    const act = sb.dataset.active;
    sb.classList.toggle('mini', sbMini);
    sb.setAttribute('aria-label', 'Menú principal');
    sb.innerHTML = `
      <div class="sb-top">
        <div class="sb-logo"><img class="logo-sb" src="img/marca/ieee-espoch-blanco.png" alt="IEEE ESPOCH"><button type="button" class="sb-collapse" aria-label="Contraer menú" aria-expanded="${!sbMini}">${icon('left')}</button></div>
        <button type="button" class="sb-unit"><span class="sb-av">RB</span><span class="sb-unit-tx"><b>Rama IEEE ESPOCH</b><span>Chair · 10 unidades</span></span>${icon('sel')}</button>
      </div>
      <nav class="sb-nav" aria-label="Secciones">
        ${NAV.map(([g, items]) => `<div class="sb-group"><span class="sb-label">${g}</span>${items.map(([k, l, i, h, c, al]) => `<a class="sb-link" href="${h}" title="${l}" ${k === act ? 'aria-current="page"' : ''}>${icon(i)}<span class="lbl">${l}</span>${c ? `<span class="sb-count ${al ? 'alert' : ''}">${c}</span>` : ''}</a>`).join('')}</div>`).join('')}
      </nav>
      <div class="sb-foot">
        <div class="sb-next"><span class="sb-dot"></span><span class="sb-next-tx"><b>Reunión de directiva</b><span class="sb-meta">En 25 min · 18:00 · Teams</span></span><a class="sb-join" href="#resumen" aria-label="Unirme a la reunión de directiva" title="Unirme">${icon('video')}</a></div>
        <div class="sb-me"><span class="sb-av">YP</span><span class="sb-me-tx" style="flex:1;display:flex;flex-direction:column"><b style="font-size:14px">Yosef Puetate</b><span class="sb-meta">Chair de la Rama</span></span><button type="button" class="sb-collapse" aria-label="Cerrar sesión">${icon('logout')}</button></div>
      </div>`;
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.sb-logo .sb-collapse');
    if (!b || document.body.classList.contains('commenting')) return;
    const mini = !$('.sb').classList.contains('mini');
    $$('.sb').forEach((sb) => { sb.classList.toggle('mini', mini); $('.sb-logo .sb-collapse', sb).setAttribute('aria-expanded', String(!mini)); $('.sb-logo .sb-collapse', sb).setAttribute('aria-label', mini ? 'Expandir menú' : 'Contraer menú'); });
    store.set('maqueta-ieee-lateral', mini);
    requestAnimationFrame(placePins);
  });
  $$('.topbar').forEach((tb) => {
    const [a, b] = tb.dataset.crumb.split('|');
    tb.innerHTML = `<nav class="crumbs" aria-label="Migas de pan"><span>${a}</span>${icon('right', 'ic')}<b aria-current="page">${b}</b></nav>
      <label class="search">${icon('search')}<input type="search" placeholder="Buscar" aria-label="Buscar en la plataforma"><span class="kbd">Ctrl K</span></label>
      <button type="button" class="iconbtn" aria-label="Notificaciones, 3 nuevas">${icon('bell')}<span class="badge"></span></button>
      <button type="button" class="iconbtn theme-flip" aria-label="Cambiar tema">${icon('moon')}</button>`;
  });
  $$('.bnav').forEach((n) => {
    const act = n.dataset.bnav;
    const it = (k, l, i, h) => `<a href="${h}" ${k === act ? 'aria-current="page"' : ''}>${icon(i)}${l}</a>`;
    n.innerHTML = it('resumen', 'Inicio', 'dash', '#resumen') + it('tablero', 'Proyectos', 'folder', '#tablero') + `<a class="fab" href="#resumen" data-open="tarea" aria-label="Nueva tarea">${icon('plus')}</a>` + it('personas', 'Personas', 'user', '#personas') + it('perfil', 'Perfil', 'user', '#resumen');
  });

  /* ---------- Resumen ---------- */
  const KIND = { r: ['Reunión', 'var(--c-blue)', 'meet'], e: ['Evento', 'var(--c-purple)', 'meet'], d: ['Entrega', 'var(--c-teal)', 'due'], v: ['Vencida', 'var(--danger)', 'due'] };
  $('#week').innerHTML = DATA.week.map(([d, n, items]) => `<div class="wday"><div class="wday-h">${d} <b class="${n === 18 ? 'today' : ''}">${n}</b></div>
    ${items.map(([k, t, m]) => `<div class="wev ${k === 'v' ? 'late' : ''}" data-k="${KIND[k][2]}"><span class="wev-k"><span class="dot" style="background:${KIND[k][1]}"></span>${KIND[k][0]}</span><b>${esc(t)}</b><small>${esc(m)}</small></div>`).join('')}</div>`).join('');
  $('#week-filter').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#week-filter button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('#week .wev').forEach((w) => w.classList.toggle('dim', b.dataset.f !== 'all' && w.dataset.k !== b.dataset.f));
  });
  const STI = { ok: ['st-ok', 'check'], warn: ['st-warn', 'clock'], risk: ['st-risk', 'alert'] };
  $('#projects').innerHTML = DATA.projects.map(([n, u, d, p, s, sl, r]) => `<div class="prow">
      <div class="prow-name"><b>${esc(n)}</b><span>${esc(u)} · entrega ${esc(d)}</span></div>
      <div class="prow-bar"><span class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance de ${esc(n)}"><i style="width:${p}%"></i></span>${p} %</div>
      <div class="prow-state"><span class="pill ${STI[s][0]}">${icon(STI[s][1])}${sl}</span><span>${esc(r)}</span></div></div>`).join('');
  $('#tasks').innerHTML = DATA.tasks.map(([t, m, hi, late]) => `<label class="trow"><input type="checkbox"><span class="trow-tx"><b>${esc(t)}</b><span class="${late ? 'late' : ''}">${esc(m)}</span></span>${hi ? '<span class="pill st-warn">Alta</span>' : ''}</label>`).join('');
  $('#actions').innerHTML = DATA.actions.map(([i, t, m, h]) => `<div class="arow"><span class="arow-ic">${icon(i)}</span><span class="arow-tx"><b>${esc(t)}</b><span>${esc(m)}</span></span><a class="abtn abtn-s abtn-sm" href="${h}">Revisar</a></div>`).join('');

  /* ---------- Tablero ---------- */
  let openMenu = null; let lastMoved = null;
  const findCard = (id) => { for (const c of COLS) { const i = board[c.id].findIndex((x) => x[0] === id); if (i > -1) return [c.id, i]; } return [null, -1]; };
  function renderBoard() {
    const mine = $('#only-mine').checked;
    let total = 0; let blocked = 0;
    $('#board').innerHTML = COLS.map((c) => {
      const cards = board[c.id].filter((x) => !mine || x[4] === 'YP');
      total += cards.length; blocked += cards.filter((x) => x[5].blocked).length;
      return `<section class="bcol" aria-label="${c.name}"><div class="bcol-h"><span class="dot" style="width:8px;height:8px;background:${c.dot}"></span><h2>${c.name}</h2><span>${cards.length}</span></div>
        ${cards.map(([id, t, cm, due, who, o]) => `<article class="tcard ${o.blocked ? 'blocked' : ''} ${lastMoved === id ? 'moved' : ''}" data-id="${id}">
          <div class="tcard-h"><button type="button" class="ttl">${esc(t)}</button><button type="button" class="kebab" aria-label="Acciones de «${esc(t)}»" aria-haspopup="menu" aria-expanded="${openMenu === id}">${icon('dots')}</button></div>
          ${openMenu === id ? `<div class="menu" role="menu" aria-label="Mover a"><span class="menu-h">Mover a…</span>${COLS.map((cc, i) => `<button type="button" role="menuitemradio" aria-checked="${cc.id === c.id}" data-move="${cc.id}"><span class="dot" style="width:8px;height:8px;background:${cc.dot}"></span>${cc.name}<span class="k">Alt ${i + 1}</span></button>`).join('')}<span class="menu-f">Con el foco en la tarjeta: Alt + 1 a 4</span></div>` : ''}
          <span class="tcard-com"><span class="dot" style="background:${COM[cm][1]}"></span>${COM[cm][0]}</span>
          ${o.blocked ? `<span class="tcard-block">${icon('lock')}Bloqueada: ${esc(o.blocked)}</span>` : ''}
          <div class="tcard-f">${o.high ? '<span class="pill st-warn">Alta</span>' : ''}<span class="meta ${o.late ? 'late' : ''}">${icon('cal')}${esc(due)}</span>${o.sub ? `<span class="meta">${icon('sub')}${esc(o.sub)}</span>` : ''}<span class="sp"></span><span class="av av-sm ${AV[WHO[who][1]]}" title="${WHO[who][0]}">${who}</span></div>
        </article>`).join('')}</section>`;
    }).join('');
    $('#board-count').textContent = `${total} tareas · ${blocked} bloqueada${blocked === 1 ? '' : 's'}`;
    if (openMenu) { const m = $(`.tcard[data-id="${openMenu}"] .menu button[aria-checked="true"]`); if (m) m.focus(); }
    requestAnimationFrame(placePins);
  }
  function moveCard(id, to) {
    const [from, i] = findCard(id); if (!from || from === to) { openMenu = null; renderBoard(); return; }
    const [card] = board[from].splice(i, 1); board[to].unshift(card);
    openMenu = null; lastMoved = id; renderBoard();
    const el = $(`.tcard[data-id="${id}"] .ttl`); if (el) el.focus();
    toast(`«${card[1]}» pasó a ${COLS.find((c) => c.id === to).name}`);
    setTimeout(() => { lastMoved = null; }, 700);
  }
  $('#board').addEventListener('click', (e) => {
    if (document.body.classList.contains('commenting')) return;
    const mv = e.target.closest('[data-move]');
    if (mv) { moveCard(mv.closest('.tcard').dataset.id, mv.dataset.move); return; }
    const k = e.target.closest('.kebab');
    if (k) { const id = k.closest('.tcard').dataset.id; openMenu = openMenu === id ? null : id; renderBoard(); }
  });
  $('#board').addEventListener('keydown', (e) => {
    const card = e.target.closest('.tcard'); if (!card) return;
    if (e.altKey && /^[1-4]$/.test(e.key)) { e.preventDefault(); moveCard(card.dataset.id, COLS[+e.key - 1].id); }
  });
  document.addEventListener('click', (e) => { if (openMenu && !e.target.closest('.tcard')) { openMenu = null; renderBoard(); } });
  $('#only-mine').addEventListener('change', renderBoard);
  renderBoard();

  /* ---------- Personas ---------- */
  const ST = { a: ['Activa', 'var(--success)'], p: ['Pendiente', 'var(--warn-text)'], s: ['Suspendida', 'var(--muted)'] };
  let selPerson = 1;
  function renderPeople() {
    const q = ($('#psearch').value || '').trim().toLowerCase();
    const rows = DATA.people.map((p, i) => [p, i]).filter(([p]) => !q || p[1].toLowerCase().includes(q));
    $('#people').innerHTML = rows.map(([[ini, n, u, r, s, last], i]) => `<tr data-i="${i}" class="${i === selPerson ? 'sel' : ''}" tabindex="0">
      <td><span class="pname"><span class="av ${AV[i % 3]}">${ini}</span><span><b>${esc(n)}</b><small>${esc(n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(' ', '.'))}@espoch.edu.ec</small></span></span></td>
      <td class="muted" style="font-size:14px">${esc(u)}</td><td><span class="pill">${esc(r)}</span></td>
      <td><span class="state" style="color:${ST[s][1]}"><i></i>${ST[s][0]}</span></td><td class="muted" style="font-size:13px">${esc(last)}</td></tr>`).join('');
    $('#pcount').textContent = `Mostrando 1–${rows.length} de 54`;
    const [ini, n, u, r, s] = DATA.people[selPerson];
    $('#pdetail').innerHTML = `<div><div style="display:flex;align-items:center;gap:12px"><span class="av ${AV[selPerson % 3]}" style="width:48px;height:48px;font-size:16px">${ini}</span><span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">${esc(n)}</b><span class="muted" style="font-size:13px">${esc(u)}</span></span></div>
      <span class="state" style="color:${ST[s][1]}"><i></i>${ST[s][0]} · miembro desde marzo 2025</span></div>
      <div><h3>Cargos vigentes</h3><div class="drow"><span>${esc(r)} · ${esc(u)}</span><span>desde mar 2026</span></div>${selPerson === 1 ? '<div class="drow"><span>Responsable · Ponentes</span><span>CONESLAT 2026</span></div>' : ''}</div>
      <div><h3>Actividad reciente</h3><span style="font-size:13px">Movió «Agenda de la semana» a En revisión <span class="muted">· hace 1 h</span></span><span style="font-size:13px">Publicó un aviso <span class="muted">· ayer</span></span></div>
      <div><button type="button" class="abtn abtn-s">Editar cargos</button><button type="button" class="abtn abtn-danger">Suspender cuenta</button></div>`;
    requestAnimationFrame(placePins);
  }
  $('#people').addEventListener('click', (e) => { if (document.body.classList.contains('commenting')) return; const tr = e.target.closest('tr'); if (tr) { selPerson = +tr.dataset.i; renderPeople(); } });
  $('#people').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { const tr = e.target.closest('tr'); if (tr) { e.preventDefault(); selPerson = +tr.dataset.i; renderPeople(); $(`#people tr[data-i="${selPerson}"]`).focus(); } } });
  $('#psearch').addEventListener('input', renderPeople);
  renderPeople();

  /* ---------- Diálogo Nueva tarea ---------- */
  $('#com-chips').innerHTML = Object.values(COM).map(([n, c], i) => `<button type="button" role="radio" aria-checked="${i === 2}"><span class="dot" style="width:7px;height:7px;background:${c}"></span>${n}</button>`).join('');
  const radioGroup = (g) => g.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; $$('button', g).forEach((x) => x.setAttribute('aria-checked', String(x === b))); });
  radioGroup($('#com-chips')); radioGroup($('#pri-seg'));
  const modal = $('#m-tarea'); let modalReturn = null;
  const openModal = () => { modalReturn = document.activeElement; modal.classList.add('on'); setTimeout(() => $('input', modal).focus(), 30); };
  const closeModal = () => { modal.classList.remove('on'); if (modalReturn) modalReturn.focus(); };
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('commenting')) return;
    const o = e.target.closest('[data-open="tarea"]'); if (o) { e.preventDefault(); openModal(); return; }
    if (e.target.closest('[data-close]') || e.target === modal) closeModal();
  });

  /* ---------- Tema y vista ---------- */
  const setTheme = (t) => {
    document.documentElement.dataset.theme = t;
    $$('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === t)));
    $$('.theme-flip').forEach((b) => { b.innerHTML = icon(t === 'dark' ? 'sun' : 'moon'); });
    store.set('maqueta-ieee-tema', t); requestAnimationFrame(placePins);
  };
  const setView = (v) => {
    stage.dataset.view = v;
    $$('[data-view-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewSet === v)));
    store.set('maqueta-ieee-vista', v); setTimeout(placePins, 60);
  };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-set]'); if (t) setTheme(t.dataset.themeSet);
    const v = e.target.closest('[data-view-set]'); if (v) setView(v.dataset.viewSet);
    const f = e.target.closest('.theme-flip'); if (f && !document.body.classList.contains('commenting')) setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
  setTheme(store.get('maqueta-ieee-tema', 'light'));
  setView(store.get('maqueta-ieee-vista', 'desktop'));

  /* ---------- Navegación entre pantallas ---------- */
  let current = 'inicio';
  function route() {
    const h = (location.hash || '#inicio').slice(1);
    if (SCREENS[h]) {
      current = h;
      $$('.screen').forEach((s) => s.classList.toggle('on', s.dataset.screen === h));
      $$('.pres-tabs a').forEach((a) => (a.getAttribute('href') === `#${h}` ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
      document.title = `${SCREENS[h]} · Maqueta IEEE ESPOCH`;
      window.scrollTo(0, 0);
    } else {
      const el = document.getElementById(h);
      if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
    openMenu = null; closeForm(); renderPins(); renderPanel();
  }
  window.addEventListener('hashchange', route);

  /* ===================================================================
     Comentarios
     =================================================================== */
  const KEY = 'maqueta-ieee-comentarios';
  let comments = store.get(KEY, []);
  if (!Array.isArray(comments)) comments = [];
  const TYPES = { like: 'Me gusta', change: 'Cambiar', ask: 'Duda' };
  const save = () => { if (!store.set(KEY, comments)) toast('No se pudo guardar en este navegador'); $('#ccount').textContent = comments.length; };
  const screenEl = (s) => $(`.screen[data-screen="${s}"]`);
  const hl = $('#hl'); const pinsEl = $('#pins');

  function pathOf(el, root) {
    const parts = [];
    while (el && el !== root) {
      const p = el.parentElement; if (!p) return null;
      parts.unshift(`:nth-child(${Array.from(p.children).indexOf(el) + 1})`);
      el = p;
    }
    return parts.length ? `:scope > ${parts.join(' > ')}` : ':scope';
  }
  const resolve = (c) => {
    const root = screenEl(c.screen); if (!root) return null;
    if (!c.sel || c.sel === ':scope') return root;
    try { return root.querySelector(c.sel) || root; } catch { return root; }
  };
  const describe = (el) => {
    const t = (el.getAttribute('aria-label') || el.getAttribute('alt') || el.textContent || '').replace(/\s+/g, ' ').trim();
    return t ? (t.length > 90 ? `${t.slice(0, 90)}…` : t) : `<${el.tagName.toLowerCase()}>`;
  };
  const rel = (r) => { const s = stage.getBoundingClientRect(); return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height }; };
  const target = (node) => {
    let el = node.nodeType === 1 ? node : node.parentElement;
    if (el && el.closest('svg')) el = el.closest('svg');
    const scr = el && el.closest('.screen');
    return scr && scr.classList.contains('on') ? el : null;
  };

  function placePins() {
    $$('.pin', pinsEl).forEach((p) => {
      const c = comments.find((x) => x.id === p.dataset.id); const el = c && resolve(c);
      if (!el) { p.style.display = 'none'; return; }
      const r = rel(el.getBoundingClientRect());
      if (!r.w && !r.h) { p.style.display = 'none'; return; }
      p.style.display = 'flex';
      p.style.left = `${r.x + Math.min(Math.max(c.rx, 0), 1) * r.w}px`;
      p.style.top = `${r.y + Math.min(Math.max(c.ry, 0), 1) * r.h}px`;
    });
  }
  function renderPins() {
    const list = comments.filter((c) => c.screen === current);
    pinsEl.innerHTML = list.map((c, i) => `<button type="button" class="pin t-${c.type}" data-id="${esc(c.id)}" aria-label="Comentario ${i + 1} de ${esc(c.name)}: ${esc(TYPES[c.type] || '')}">${i + 1}</button>`).join('');
    placePins();
  }
  function renderPanel() {
    $('#ccount').textContent = comments.length;
    if (!comments.length) {
      $('#cp-list').innerHTML = '<p class="cp-empty">Todavía no hay comentarios. Pulsa <b>Comentar</b> arriba y haz clic en cualquier parte de una pantalla. Cuando termines, usa <b>Copiar para WhatsApp</b> o <b>Descargar</b> para enviarlos.</p>';
      return;
    }
    $('#cp-list').innerHTML = Object.keys(SCREENS).map((s) => {
      const list = comments.filter((c) => c.screen === s); if (!list.length) return '';
      return `<h3 class="cp-screen">${SCREENS[s]} · ${list.length}</h3>${list.map((c, i) => `<div class="citem" data-id="${esc(c.id)}" role="button" tabindex="0">
        <span class="n t-${esc(c.type)}">${i + 1}</span>
        <span class="citem-b"><small><b>${esc(c.name)}</b> · ${esc(TYPES[c.type] || '')} · ${esc(new Date(c.at).toLocaleString('es-EC', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</small><p>${esc(c.text)}</p><small>Sobre: «${esc(c.about)}»</small></span>
        <button type="button" class="citem-x" data-del="${esc(c.id)}" aria-label="Borrar este comentario">${icon('x')}</button></div>`).join('')}`;
    }).join('');
  }

  /* Modo comentario */
  const btnC = $('#btn-comment');
  const setCommenting = (on) => {
    document.body.classList.toggle('commenting', on);
    btnC.setAttribute('aria-pressed', String(on));
    if (!on) { hl.style.display = ''; closeForm(); }
    if (on) { openMenu = null; document.body.classList.remove('hide-pins'); $('#cp-pins').setAttribute('aria-pressed', 'true'); }
  };
  btnC.addEventListener('click', () => setCommenting(!document.body.classList.contains('commenting')));
  $('#btn-comment-off').addEventListener('click', () => setCommenting(false));

  stage.addEventListener('mousemove', (e) => {
    if (!document.body.classList.contains('commenting') || $('#cform').classList.contains('on')) return;
    const el = target(e.target); if (!el || el.closest('.pin')) { hl.style.display = 'none'; return; }
    const r = rel(el.getBoundingClientRect());
    Object.assign(hl.style, { display: 'block', left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
  });
  stage.addEventListener('mouseleave', () => { hl.style.display = 'none'; });

  let draft = null;
  const form = $('#cform');
  stage.addEventListener('click', (e) => {
    const pin = e.target.closest('.pin');
    if (pin) { e.preventDefault(); e.stopPropagation(); openPanel(pin.dataset.id); return; }
    if (!document.body.classList.contains('commenting')) return;
    e.preventDefault(); e.stopPropagation();
    if (form.classList.contains('on')) return;
    const el = target(e.target); if (!el) return;
    const root = el.closest('.screen'); const r = el.getBoundingClientRect();
    draft = { screen: root.dataset.screen, sel: pathOf(el, root), rx: r.width ? (e.clientX - r.left) / r.width : 0.5, ry: r.height ? (e.clientY - r.top) / r.height : 0.5, about: describe(el) };
    openForm(e.clientX, e.clientY);
  }, true);

  function openForm(x, y) {
    $('#cf-about').textContent = `Sobre: «${draft.about}»`;
    $('#cf-name').value = store.get('maqueta-ieee-nombre', '');
    $('#cf-text').value = ''; $('#cf-err').classList.remove('on');
    $$('#cf-type button').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.t === 'change')));
    form.classList.add('on');
    const w = 320; const h = form.offsetHeight || 330;
    form.style.left = `${Math.max(8, Math.min(x + 12, window.innerWidth - w - 8))}px`;
    form.style.top = `${Math.max(64, Math.min(y + 12, window.innerHeight - h - 8))}px`;
    ($('#cf-name').value ? $('#cf-text') : $('#cf-name')).focus();
  }
  function closeForm() { form.classList.remove('on'); draft = null; }
  radioGroup($('#cf-type'));
  $('#cf-cancel').addEventListener('click', closeForm);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#cf-name').value.trim().slice(0, 60); const text = $('#cf-text').value.trim().slice(0, 2000);
    if (!name || !text) { $('#cf-err').classList.add('on'); (name ? $('#cf-text') : $('#cf-name')).focus(); return; }
    store.set('maqueta-ieee-nombre', name);
    const type = ($('#cf-type button[aria-checked="true"]') || {}).dataset?.t || 'change';
    comments.push({ id: `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, ...draft, name, text, type, at: new Date().toISOString() });
    save(); closeForm(); renderPins(); renderPanel(); toast('Comentario guardado');
  });
  ['cf-name', 'cf-text'].forEach((id) => $(`#${id}`).addEventListener('input', () => $('#cf-err').classList.remove('on')));

  /* Panel */
  const panel = $('#cpanel'); const btnP = $('#btn-panel');
  function openPanel(focusId) {
    panel.classList.add('on'); btnP.setAttribute('aria-expanded', 'true'); renderPanel();
    if (focusId) {
      const it = $(`.citem[data-id="${CSS.escape(focusId)}"]`, panel);
      if (it) { it.scrollIntoView({ block: 'center' }); it.focus(); it.style.outline = '2px solid #FFA300'; setTimeout(() => { it.style.outline = ''; }, 1500); }
    }
  }
  const closePanel = () => { panel.classList.remove('on'); btnP.setAttribute('aria-expanded', 'false'); };
  btnP.addEventListener('click', () => (panel.classList.contains('on') ? closePanel() : openPanel()));
  $('#cp-close').addEventListener('click', closePanel);
  $('#cp-list').addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (del) { e.stopPropagation(); if (confirm('¿Borrar este comentario?')) { comments = comments.filter((c) => c.id !== del.dataset.del); save(); renderPins(); renderPanel(); } return; }
    const it = e.target.closest('.citem'); if (it) goTo(it.dataset.id);
  });
  $('#cp-list').addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('citem')) { e.preventDefault(); goTo(e.target.dataset.id); } });
  function goTo(id) {
    const c = comments.find((x) => x.id === id); if (!c) return;
    if (c.screen !== current) location.hash = `#${c.screen}`;
    setTimeout(() => {
      const el = resolve(c); if (el) el.scrollIntoView({ block: 'center' });
      setTimeout(() => { placePins(); const p = $(`.pin[data-id="${CSS.escape(id)}"]`); if (p) { p.classList.add('flash'); setTimeout(() => p.classList.remove('flash'), 1200); } }, 250);
    }, 80);
  }
  $('#cp-pins').addEventListener('click', (e) => {
    const on = document.body.classList.toggle('hide-pins');
    e.currentTarget.setAttribute('aria-pressed', String(!on));
  });

  /* Exportar e importar */
  function asText() {
    const lines = ['*Comentarios sobre la maqueta IEEE ESPOCH v3*', ''];
    Object.keys(SCREENS).forEach((s) => {
      const list = comments.filter((c) => c.screen === s); if (!list.length) return;
      lines.push(`*${SCREENS[s]}*`);
      list.forEach((c, i) => { lines.push(`${i + 1}. [${TYPES[c.type] || 'Comentario'}] ${c.name}: ${c.text}`); lines.push(`   Sobre: «${c.about}»`); });
      lines.push('');
    });
    return lines.join('\n').trim();
  }
  $('#cp-copy').addEventListener('click', async () => {
    if (!comments.length) { toast('Aún no hay comentarios'); return; }
    const txt = asText();
    try { await navigator.clipboard.writeText(txt); toast('Copiado. Pégalo en WhatsApp'); }
    catch { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Copiado. Pégalo en WhatsApp'); } catch { toast('No se pudo copiar'); } ta.remove(); }
  });
  $('#cp-dl').addEventListener('click', () => {
    if (!comments.length) { toast('Aún no hay comentarios'); return; }
    const who = (store.get('maqueta-ieee-nombre', '') || 'revisor').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');
    const url = URL.createObjectURL(new Blob([JSON.stringify({ maqueta: 'ieee-espoch-v3', exportado: new Date().toISOString(), comentarios: comments }, null, 2)], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `comentarios-maqueta-${who}.json` });
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Archivo descargado');
  });
  $('#cp-imp').addEventListener('click', () => $('#imp-file').click());
  $('#imp-file').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const data = JSON.parse(rd.result); const arr = Array.isArray(data) ? data : data.comentarios;
        if (!Array.isArray(arr)) throw new Error('formato');
        let n = 0;
        arr.forEach((c) => {
          if (!c || typeof c.id !== 'string' || !SCREENS[c.screen] || typeof c.text !== 'string' || comments.some((x) => x.id === c.id)) return;
          comments.push({ id: c.id.slice(0, 40), screen: c.screen, sel: typeof c.sel === 'string' ? c.sel.slice(0, 400) : ':scope', rx: Number(c.rx) || 0.5, ry: Number(c.ry) || 0.5, about: String(c.about || '').slice(0, 120), name: String(c.name || 'Anónimo').slice(0, 60), text: c.text.slice(0, 2000), type: TYPES[c.type] ? c.type : 'change', at: c.at || new Date().toISOString() });
          n += 1;
        });
        comments.sort((a, b) => String(a.at).localeCompare(String(b.at)));
        save(); renderPins(); renderPanel(); toast(n ? `${n} comentario${n === 1 ? '' : 's'} importado${n === 1 ? '' : 's'}` : 'No había comentarios nuevos');
      } catch { toast('Ese archivo no es una exportación de la maqueta'); }
      e.target.value = '';
    };
    rd.readAsText(f);
  });
  $('#cp-clear').addEventListener('click', () => {
    if (!comments.length) return;
    if (confirm(`¿Borrar los ${comments.length} comentarios de este navegador? Descárgalos antes si los necesitas.`)) { comments = []; save(); renderPins(); renderPanel(); }
  });

  /* Teclado global */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (form.classList.contains('on')) { closeForm(); return; }
    if (modal.classList.contains('on')) { closeModal(); return; }
    if (openMenu) { const id = openMenu; openMenu = null; renderBoard(); const k = $(`.tcard[data-id="${id}"] .kebab`); if (k) k.focus(); return; }
    if (document.body.classList.contains('commenting')) { setCommenting(false); return; }
    if (panel.classList.contains('on')) closePanel();
  });

  /* Recolocar marcas */
  let raf = 0;
  const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(placePins); };
  window.addEventListener('resize', queue);
  window.addEventListener('scroll', queue, { passive: true });
  $$('.sb-nav').forEach((n) => n.addEventListener('scroll', queue, { passive: true }));
  window.addEventListener('load', queue);
  if (document.fonts) document.fonts.ready.then(queue);

  route();
})();
