{
'use strict';
const VERSION = '0.1.1';
const KEY = 'ksbflash.v1';
const DAY = 864e5, MIN = 6e4;
const STEPS = [1, 10];          // learning steps (minutes)
const RELEARN = 10;             // relearning step (minutes)
const LEARN_AHEAD = 20 * MIN;   // show learning cards early at end of a session
const TYPE_LABEL = {definition:'Definition', formula:'Formula', distinguish:'Distinguish', when:'When to use',
  pitfall:'Pitfall', scenario:'Scenario', justify:'Justify', project:'My project'};

/* ---------- storage ---------- */
const blank = () => ({cards:{}, settings:{newPerDay:15, maxIvl:30, epa:'2027-03-15'}, days:{}, flags:[]});
let db = blank();
try { const raw = localStorage.getItem(KEY); if (raw) db = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
db.settings = Object.assign(blank().settings, db.settings);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} };
try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}

/* ---------- time ---------- */
const dayNo = (t = Date.now()) => { const d = new Date(t); return Math.floor((t - d.getTimezoneOffset() * MIN) / DAY); };
const todayKey = () => String(dayNo());
const dayStats = () => (db.days[todayKey()] ||= {newSeen:0, reviews:0, good:0});

/* ---------- deck loading & parsing ---------- */
let CARDS = [], DECKS = [];
function parseDeck(text, file) {
  const blocks = text.replace(/\r/g, '').split(/^---\s*$/m);
  const head = blocks.shift() || '';
  const deck = {file, title: (head.match(/^#\s+(.+)$/m) || [, file])[1].trim(), topic: '', ksb: [], cards: []};
  head.split('\n').forEach(l => { const m = l.match(/^(\w+):\s*(.*)$/); if (m) deck[m[1]] = m[1] === 'ksb' ? m[2].split(/[,\s]+/).filter(Boolean) : m[2].trim(); });
  for (const b of blocks) {
    if (!b.trim()) continue;
    const c = {topic: deck.topic, deck: deck.title, ksb: deck.ksb, distinction: false};
    const lines = b.split('\n'); let i = 0;
    for (; i < lines.length; i++) {
      const l = lines[i];
      if (/^Q:/.test(l)) break;
      const m = l.match(/^(\w+):\s*(.*)$/);
      if (m) c[m[1]] = m[2].trim();
    }
    const rest = lines.slice(i).join('\n');
    const qa = rest.match(/^Q:\s*([\s\S]*?)\n^A:\s*([\s\S]*)$/m);
    if (!qa || !c.id) { console.warn('Skipped malformed card in', file, b.slice(0, 80)); continue; }
    c.front = qa[1].trim(); c.back = qa[2].trim();
    if (typeof c.ksb === 'string') c.ksb = c.ksb.split(/[,\s]+/).filter(Boolean);
    c.distinction = /^(yes|true|y)$/i.test(String(c.distinction));
    deck.cards.push(c);
  }
  return deck;
}
async function load() {
  const list = await (await fetch('cards/decks.json', {cache: 'no-cache'})).json();
  for (const f of list) {
    try { const d = parseDeck(await (await fetch('cards/' + f, {cache: 'no-cache'})).text(), f); DECKS.push(d); CARDS.push(...d.cards); }
    catch (e) { showErr('Could not load ' + f); }
  }
  const seen = new Set();
  CARDS.forEach(c => { if (seen.has(c.id)) showErr('Duplicate card id: ' + c.id); seen.add(c.id); });
}
const showErr = m => { const e = document.getElementById('h-err'); e.hidden = false; e.textContent += m + ' '; };

/* ---------- mini markdown (math-safe) ---------- */
const esc = s => s.replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
function inline(s) {
  const math = [];
  s = s.replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, m => { math.push(m); return '\u0000' + (math.length - 1) + '\u0000'; });
  s = esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![*\w])/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, n) => esc(math[n]));
}
function md(src) {
  const out = []; const lines = src.split('\n'); let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^\s*\$\$/.test(l)) { const buf = [l]; if (!/\$\$.*\$\$/.test(l)) { while (++i < lines.length) { buf.push(lines[i]); if (/\$\$/.test(lines[i])) break; } } i++; out.push('<div>' + esc(buf.join('\n')) + '</div>'); continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(x => x.trim());
      const body = rows.filter(r => !/^\|[\s:|-]+\|$/.test(r));
      out.push('<div class="scroll"><table><thead><tr>' + cells(body[0]).map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
        body.slice(1).map(r => '<tr>' + cells(r).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (/^\s*[-*] /.test(l)) { const it = []; while (i < lines.length && /^\s*[-*] /.test(lines[i])) it.push(lines[i++].replace(/^\s*[-*] /, '')); out.push('<ul>' + it.map(x => '<li>' + inline(x) + '</li>').join('') + '</ul>'); continue; }
    if (/^\s*\d+\. /.test(l)) { const it = []; while (i < lines.length && /^\s*\d+\. /.test(lines[i])) it.push(lines[i++].replace(/^\s*\d+\. /, '')); out.push('<ol>' + it.map(x => '<li>' + inline(x) + '</li>').join('') + '</ol>'); continue; }
    const p = []; while (i < lines.length && lines[i].trim() && !/^(\s*[-*] |\s*\d+\. |\||\s*\$\$)/.test(lines[i])) p.push(lines[i++]);
    out.push('<p>' + inline(p.join(' ')) + '</p>');
  }
  return out.join('');
}
function renderInto(el, src) {
  el.innerHTML = md(src);
  try { renderMathInElement(el, {delimiters: [{left:'$$', right:'$$', display:true}, {left:'$', right:'$', display:false}], throwOnError: false, output: window.KATEX_OUTPUT || 'htmlAndMathml'}); } catch (e) {}
}

/* ---------- scheduler (SM-2 variant with learning steps) ---------- */
const st = id => db.cards[id];
function isDue(s, now = Date.now()) {
  if (!s) return false;
  if (s.q === 'review') return s.dueDay <= dayNo(now);
  return s.due <= now;
}
function schedule(prev, r, now = Date.now()) {
  const max = Math.max(3, +db.settings.maxIvl || 30);
  const s = prev ? {...prev} : {q:'learn', step:0, ease:2.5, ivl:0, reps:0, lapses:0, due:now};
  const graduate = ivl => { s.q = 'review'; s.ivl = Math.min(max, Math.max(1, Math.round(ivl))); s.dueDay = dayNo(now) + s.ivl; delete s.due; };
  s.reps++;
  if (s.q === 'learn') {
    if (r === 1) { s.step = 0; s.due = now + STEPS[0] * MIN; }
    else if (r === 2) { s.due = now + (s.step === 0 ? (STEPS[0] + STEPS[1]) / 2 : STEPS[s.step]) * MIN; }
    else if (r === 3) { s.step++; if (s.step >= STEPS.length) graduate(1); else s.due = now + STEPS[s.step] * MIN; }
    else graduate(4);
  } else if (s.q === 'relearn') {
    if (r <= 2) s.due = now + RELEARN * MIN;
    else graduate(r === 4 ? s.lapseIvl + 1 : s.lapseIvl);
  } else {
    const ivl = s.ivl;
    if (r === 1) { s.lapses++; s.ease = Math.max(1.3, s.ease - .2); s.q = 'relearn'; s.lapseIvl = Math.max(1, Math.round(ivl * .5)); s.due = now + RELEARN * MIN; delete s.dueDay; }
    else if (r === 2) { s.ease = Math.max(1.3, s.ease - .15); graduate(Math.max(ivl + 1, ivl * 1.2)); }
    else if (r === 3) graduate(Math.max(ivl + 1, ivl * s.ease));
    else { graduate(Math.max(ivl + 1, ivl * s.ease * 1.3)); s.ease += .15; }
  }
  s.last = now;
  return s;
}
function fmtGap(s, now = Date.now()) {
  if (s.q !== 'review') { const m = Math.round((s.due - now) / MIN); return m < 60 ? m + 'm' : Math.round(m / 60) + 'h'; }
  const d = s.ivl; return d < 31 ? d + 'd' : (d / 30).toFixed(1) + 'mo';
}
const status = c => { const s = st(c.id); if (!s) return 'n'; if (s.q === 'review' && s.ivl >= 21) return 'm'; return 'y'; };
const weak = c => { const s = st(c.id); return s && (s.lapses >= 2 || s.ease < 2.1 || s.q === 'relearn'); };

/* ---------- sessions ---------- */
let S = null;
function newAllowance() { return Math.max(0, (+db.settings.newPerDay || 0) - dayStats().newSeen); }
function buildQueue(pool, {limitNew = true} = {}) {
  const now = Date.now();
  const due = pool.filter(c => isDue(st(c.id), now));
  const fresh = pool.filter(c => !st(c.id)).slice(0, limitNew ? newAllowance() : 20);
  const learning = due.filter(c => st(c.id).q !== 'review').sort((a, b) => st(a.id).due - st(b.id).due);
  const reviews = shuffle(due.filter(c => st(c.id).q === 'review'));
  const q = [...learning]; let ni = 0;
  reviews.forEach((c, i) => { q.push(c); if (i % 3 === 2 && ni < fresh.length) q.push(fresh[ni++]); });
  while (ni < fresh.length) q.push(fresh[ni++]);
  return q;
}
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const MODES = {
  due:        {title: 'Today', pool: () => CARDS},
  distinction:{title: '★ Distinction', pool: () => CARDS.filter(c => c.distinction)},
  weak:       {title: 'Weak spots', pool: () => CARDS.filter(weak), practice: true},
  formula:    {title: 'Formulae', pool: () => CARDS.filter(c => c.type === 'formula')},
  scenario:   {title: 'Scenarios', pool: () => CARDS.filter(c => c.type === 'scenario' || c.type === 'justify')},
};
function start(mode, topic) {
  const def = topic ? {title: (DECKS.find(d => d.topic === topic) || {}).title || topic, pool: () => CARDS.filter(c => c.topic === topic)} : MODES[mode];
  const pool = def.pool();
  let q = buildQueue(pool, {limitNew: mode === 'due'});
  let practice = false;
  if (!q.length) {
    if (!pool.length) return toast('No cards here yet');
    q = shuffle([...pool]).slice(0, 30); practice = true;
    toast('Nothing due here, so this is practice: schedules won’t change');
  }
  if (def.practice) practice = true;
  S = {title: def.title, q, practice, done: 0, good: 0, cur: null, undo: null};
  document.body.classList.add('studying');
  show('study'); next();
}
function next() {
  const now = Date.now();
  let i = S.q.findIndex(c => S.practice || !st(c.id) || isDue(st(c.id), now));
  if (i < 0) i = S.q.findIndex(c => { const s = st(c.id); return s && s.q !== 'review' && s.due - now < LEARN_AHEAD; });
  const card = $('#s-card'), done = $('#s-done');
  if (i < 0) {
    S.cur = null; card.hidden = true; done.hidden = false; $('#s-dock').hidden = !S.undo;
    $('#s-reveal').hidden = true; $('#s-rates').hidden = true;
    const pct = S.done ? Math.round(100 * S.good / S.done) : 0;
    $('#s-summary').textContent = S.done ? `${S.done} card${S.done > 1 ? 's' : ''} reviewed, ${pct}% rated Good or Easy.` : 'Nothing left for now.';
    $('#s-left').textContent = '';
    return;
  }
  S.cur = S.q.splice(i, 1)[0];
  const c = S.cur;
  card.hidden = false; done.hidden = true; $('#s-dock').hidden = false;
  card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
  $('#s-title').textContent = S.title + (S.practice ? ' · practice' : '');
  $('#s-left').textContent = (S.q.length + 1) + ' left';
  $('#s-meta').innerHTML = metaHTML(c);
  renderInto($('#s-front'), c.front);
  $('#s-back').hidden = true;
  $('#s-reveal').hidden = false; $('#s-rates').hidden = true;
  $('#s-flag').classList.toggle('on', db.flags.includes(c.id));
  $('#s-undo').hidden = !S.undo;
}
const metaHTML = c => `<span class="tag type">${TYPE_LABEL[c.type] || c.type || 'Card'}</span>` +
  (c.distinction ? '<span class="tag star">★ Distinction</span>' : '') +
  (c.concept ? `<span class="tag">${esc(c.concept)}</span>` : '') +
  `<span class="tag">${esc((c.ksb || []).join(' · '))}</span>`;
function reveal() {
  if (!S || !S.cur) return;
  const b = $('#s-back'); renderInto(b, S.cur.back); b.hidden = false;
  $('#s-reveal').hidden = true; $('#s-rates').hidden = false;
  const prev = st(S.cur.id);
  document.querySelectorAll('.rate').forEach(btn => {
    btn.querySelector('span').textContent = S.practice ? '' : fmtGap(schedule(prev, +btn.dataset.r));
  });
}
function rate(r) {
  if (!S || !S.cur || $('#s-rates').hidden) return;
  const c = S.cur, prev = st(c.id);
  S.undo = {card: c, prev: prev ? {...prev} : null, stats: {...dayStats()}, practice: S.practice, done: S.done, good: S.good, flagsLen: db.flags.length};
  S.done++; if (r >= 3) S.good++;
  if (!S.practice) {
    const ds = dayStats();
    if (!prev) ds.newSeen++;
    ds.reviews++; if (r >= 3) ds.good++;
    const s = schedule(prev, r);
    db.cards[c.id] = s;
    if (s.q !== 'review') S.q.push(c);
    save();
  } else if (r === 1) S.q.push(c);
  next();
}
function undo() {
  if (!S || !S.undo) return;
  const u = S.undo;
  S.q = S.q.filter(c => c.id !== u.card.id);
  if (S.cur && S.cur.id !== u.card.id) S.q.unshift(S.cur);
  if (!u.practice) { if (u.prev) db.cards[u.card.id] = u.prev; else delete db.cards[u.card.id]; db.days[todayKey()] = u.stats; save(); }
  S.done = u.done; S.good = u.good; S.undo = null;
  S.q.unshift(u.card); next();
}
function endSession() { S = null; document.body.classList.remove('studying'); location.hash = '#home'; route(); }

/* ---------- views ---------- */
const $ = s => document.querySelector(s);
function show(v) {
  document.querySelectorAll('.view').forEach(el => el.hidden = el.id !== 'v-' + v);
  document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('on', a.dataset.v === v));
  window.scrollTo(0, 0);
}
function route() {
  const v = (location.hash || '#home').slice(1);
  if (S && v !== 'study') { S = null; document.body.classList.remove('studying'); }
  if (v === 'browse') { show('browse'); renderBrowse(); }
  else if (v === 'settings') { show('settings'); renderSettings(); }
  else { show('home'); renderHome(); }
}
function renderHome() {
  const now = Date.now();
  const due = CARDS.filter(c => isDue(st(c.id), now)).length;
  const newToday = Math.min(newAllowance(), CARDS.filter(c => !st(c.id)).length);
  $('#h-due').textContent = due; $('#h-new').textContent = newToday;
  const epa = Date.parse(db.settings.epa);
  if (epa) { const w = Math.max(0, Math.round((epa - now) / (7 * DAY))); $('#h-weeks').textContent = w; $('#h-weeks-l').textContent = w === 1 ? 'week to EPA' : 'weeks to EPA'; }
  const total = due + newToday;
  const b = $('#b-study'); b.textContent = total ? `Study now (${total})` : 'All done for today'; b.disabled = !total;
  $('#h-topics').innerHTML = DECKS.map(d => {
    const cs = d.cards, n = cs.length || 1;
    const m = cs.filter(c => status(c) === 'm').length, y = cs.filter(c => status(c) === 'y').length;
    const dd = cs.filter(c => isDue(st(c.id), now)).length;
    return `<li><button class="topic" data-topic="${esc(d.topic)}"><div class="t1"><b>${esc(d.title)}</b><span class="due">${dd ? dd + ' due' : ''}</span></div>
      <div class="ksb">${esc(d.ksb.join(' · '))} · ${cs.length} cards · ${cs.length - m - y} not started</div>
      <div class="bar" aria-label="${m} secure, ${y} learning"><i class="m" style="width:${100 * m / n}%"></i><i class="y" style="width:${100 * y / n}%"></i></div></button></li>`;
  }).join('');
  document.querySelectorAll('.chip').forEach(ch => {
    const n = MODES[ch.dataset.mode].pool().length; ch.disabled = !n; ch.style.opacity = n ? 1 : .45;
  });
}
function renderBrowse() {
  const sel = $('#b-topic');
  if (sel.options.length === 1) DECKS.forEach(d => sel.insertAdjacentHTML('beforeend', `<option value="${esc(d.topic)}">${esc(d.title)}</option>`));
  const q = $('#b-q').value.toLowerCase().trim(), t = sel.value;
  const list = CARDS.filter(c => (!t || c.topic === t) && (!q || (c.front + ' ' + c.back + ' ' + (c.concept || '')).toLowerCase().includes(q)));
  $('#b-count').textContent = list.length + ' card' + (list.length === 1 ? '' : 's');
  const ul = $('#b-list'); ul.innerHTML = '';
  list.slice(0, 200).forEach(c => {
    const s = st(c.id);
    const li = document.createElement('li');
    li.innerHTML = `<details><summary><div class="meta">${metaHTML(c)}<span class="tag">${!s ? 'New' : isDue(s) ? 'Due' : 'Next in ' + fmtGap(s)}</span></div><div class="front"></div></summary><div class="back"></div></details>`;
    renderInto(li.querySelector('.front'), c.front);
    li.querySelector('details').addEventListener('toggle', e => { const b = li.querySelector('.back'); if (e.target.open && !b.innerHTML) renderInto(b, c.back); }, {once: false});
    ul.appendChild(li);
  });
}
function renderSettings() {
  $('#o-new').value = db.settings.newPerDay; $('#o-max').value = db.settings.maxIvl; $('#o-epa').value = db.settings.epa;
  const byId = Object.fromEntries(CARDS.map(c => [c.id, c]));
  $('#f-list').innerHTML = db.flags.length ? db.flags.map(id => `<li><code>${esc(id)}</code> ${esc((byId[id] || {}).concept || '')}</li>`).join('') : '<li>None flagged</li>';
  $('#ver').textContent = `Version ${VERSION} · ${CARDS.length} cards in ${DECKS.length} topic${DECKS.length === 1 ? '' : 's'}`;
}
let tt;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2600); }
async function copy(text, ok) { try { await navigator.clipboard.writeText(text); toast(ok); } catch (e) { toast('Copy failed: your browser blocked it'); } }

/* ---------- events ---------- */
$('#b-study').addEventListener('click', () => start('due'));
document.querySelectorAll('.chip').forEach(ch => ch.addEventListener('click', () => start(ch.dataset.mode)));
$('#h-topics').addEventListener('click', e => { const b = e.target.closest('.topic'); if (b) start(null, b.dataset.topic); });
$('#s-reveal').addEventListener('click', reveal);
$('#s-card').addEventListener('click', e => { if ($('#s-back').hidden && !e.target.closest('a')) reveal(); });
$('#s-rates').addEventListener('click', e => { const b = e.target.closest('.rate'); if (b) rate(+b.dataset.r); });
$('#s-undo').addEventListener('click', undo);
$('#s-close').addEventListener('click', endSession);
$('#s-home').addEventListener('click', endSession);
$('#s-flag').addEventListener('click', () => {
  if (!S || !S.cur) return; const id = S.cur.id, i = db.flags.indexOf(id);
  if (i >= 0) { db.flags.splice(i, 1); toast('Flag removed'); } else { db.flags.push(id); toast('Flagged for correction'); }
  $('#s-flag').classList.toggle('on', i < 0); save();
});
document.addEventListener('keydown', e => {
  if (!S || e.target.matches('input,textarea,select')) return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); $('#s-back').hidden ? reveal() : rate(3); }
  else if (/^[1-4]$/.test(e.key)) rate(+e.key);
  else if (e.key === 'z' || e.key === 'u') undo();
  else if (e.key === 'Escape') endSession();
});
$('#b-q').addEventListener('input', renderBrowse);
$('#b-topic').addEventListener('change', renderBrowse);
const setNum = (id, key, lo, hi) => $(id).addEventListener('change', e => { const v = Math.min(hi, Math.max(lo, Math.round(+e.target.value || 0))); db.settings[key] = v; e.target.value = v; save(); toast('Saved'); });
setNum('#o-new', 'newPerDay', 0, 100); setNum('#o-max', 'maxIvl', 3, 365);
$('#o-epa').addEventListener('change', e => { db.settings.epa = e.target.value; save(); toast('Saved'); });
$('#f-copy').addEventListener('click', () => {
  const byId = Object.fromEntries(CARDS.map(c => [c.id, c]));
  copy(db.flags.length ? 'Please check these flashcards:\n' + db.flags.map(id => `- ${id}: ${(byId[id] || {}).front || ''}`).join('\n') : 'No flagged cards', 'Flagged list copied');
});
$('#f-clear').addEventListener('click', () => { db.flags = []; save(); renderSettings(); toast('Flags cleared'); });
const backup = () => JSON.stringify({app: 'ksbflash', version: VERSION, exported: new Date().toISOString(), data: db});
$('#x-dl').addEventListener('click', () => {
  try {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([backup()], {type: 'application/json'}));
    a.download = `ksb-flashcards-backup-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); a.remove();
    toast('Backup downloaded');
  } catch (e) { toast('Download blocked here: use Copy backup'); }
});
$('#x-copy').addEventListener('click', () => copy(backup(), 'Backup copied: paste it somewhere safe'));
function restore(text) {
  try { const o = JSON.parse(text); const d = o.data || o; if (!d.cards) throw 0; db = Object.assign(blank(), d); save(); toast('Progress restored'); renderSettings(); }
  catch (e) { toast('That doesn’t look like a backup file'); }
}
$('#x-file').addEventListener('change', e => { const f = e.target.files[0]; if (f) f.text().then(restore); e.target.value = ''; });
$('#x-load').addEventListener('click', () => restore($('#x-paste').value));
$('#r-reset').addEventListener('click', () => { $('#r-confirm').hidden = false; });
$('#r-no').addEventListener('click', () => { $('#r-confirm').hidden = true; });
$('#r-yes').addEventListener('click', () => { const keep = db.settings; db = blank(); db.settings = keep; save(); $('#r-confirm').hidden = true; toast('Progress reset'); });
window.addEventListener('hashchange', route);

/* ---------- boot ---------- */
load().catch(() => showErr('Could not load the card list.')).finally(route);
try { if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {}
}
