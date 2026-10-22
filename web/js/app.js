import { STROKES, ISSUES, EXERCISES, REFERENCES, LEVELS } from "./knowledge.js";
import { analyze, segmentStrokes, aggregate } from "./metrics.js";
import { loadPose, openVideo, processVideo, processImages, grabFrame, cropToPlayer, drawSkeleton, drawAngleLabel } from "./pose.js";
import { QUESTIONS, defaultAnswers, buildPlan, courtSVG } from "./tactics.js";

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem("tca." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("tca." + k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

const state = {
  tab: "home",
  stroke: store.get("stroke", "serve"),
  hand: store.get("hand", "right"),
  goal: store.get("goal", "s2"),
  answers: { ...defaultAnswers(), ...store.get("answers", {}) },
  last: null, // dernière analyse
  media: null, // { kind, src|files, ... }
  busy: false,
};

const TABS = [["home", "Accueil"], ["analyse", "Analyse"], ["tactic", "Tactique"], ["exo", "Exercices"], ["track", "Suivi"], ["src", "Sources"]];

function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 3500); }

function go(tab) { state.tab = tab; history.replaceState(null, "", "#" + tab); render(); window.scrollTo(0, 0); }

function render() {
  $("#nav").innerHTML = TABS.map(([id, l]) => `<button data-tab="${id}" ${state.tab === id ? 'aria-current="page"' : ""}>${l}</button>`).join("");
  const view = { home: viewHome, analyse: viewAnalyse, tactic: viewTactic, exo: viewExo, track: viewTrack, src: viewSources }[state.tab];
  $("#app").innerHTML = view();
  ({ home: bindHome, analyse: bindAnalyse, tactic: bindTactic, exo: bindExo, track: bindTrack, src: () => {} })[state.tab]?.();
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab]");
  if (t) go(t.dataset.tab);
  const g = e.target.closest("[data-go]");
  if (g) go(g.dataset.go);
});

// =========================== ACCUEIL ===========================================================================
function viewHome() {
  const hist = store.get("history", []);
  return `
  <section class="card hero">
    <h2>Progressez à votre rythme, avec l'IA comme œil de coach</h2>
    <p>Filmez un service, un coup droit, un revers ou une volée : l'IA détecte votre squelette 3D <b>directement sur votre téléphone</b> (aucune vidéo n'est envoyée), mesure les angles clés et vous propose des corrections et des exercices adaptés à votre objectif (par ex. atteindre la 2e série).</p>
    <div class="row"><button class="btn" data-go="analyse">📹 Analyser un geste</button><button class="btn secondary" style="color:#fff;border-color:#fff6" data-go="tactic">🧠 Plan tactique</button></div>
  </section>
  <div class="grid three">
    <section class="card"><h3>1 · Analyse des gestes</h3><p class="muted">Import vidéo, photos ou rafale. Score technique, images clés annotées, défauts priorisés et exercices.</p><button class="btn secondary" data-go="analyse">Ouvrir</button></section>
    <section class="card"><h3>2 · Questionnaire tactique</h3><p class="muted">Votre style, celui de l'adversaire, la surface, le vent… → plan de jeu et schémas de points.</p><button class="btn secondary" data-go="tactic">Ouvrir</button></section>
    <section class="card"><h3>3 · Programme & suivi</h3><p class="muted">Plan d'entraînement sur 4 semaines selon vos défauts et votre objectif. ${hist.length} analyse(s) enregistrée(s).</p><button class="btn secondary" data-go="exo">Ouvrir</button></section>
  </div>
  <section class="card"><h3>Comment ça marche</h3>
    <ol class="clean"><li><b>Filmez</b> le joueur entier, caméra fixe, à hauteur de hanche (conseils affichés par geste).</li><li>L'IA (MediaPipe BlazePose) extrait 33 points du corps image par image.</li><li>L'app calcule des angles et positions et les compare à des <b>repères pédagogiques</b> tirés de la littérature de biomécanique du tennis.</li><li>Elle hiérarchise les défauts et propose <b>consignes + exercices</b>.</li></ol>
    <div class="notice">⚠️ Estimation 3D à partir d'une seule caméra : précision limitée (±5–10° selon l'angle de filmage). Les résultats sont des <b>pistes de travail</b>, pas un diagnostic. En cas de douleur (épaule, coude), consultez un professionnel de santé.</div>
  </section>`;
}
function bindHome() {}

// =========================== ANALYSE ===========================================================================
function viewAnalyse() {
  const s = STROKES[state.stroke];
  return `
  <section class="card">
    <h2>Analyse de geste</h2>
    <label class="field">Geste</label>
    <div class="chips" id="strokeChips">${Object.entries(STROKES).map(([k, v]) => `<button class="chip" data-stroke="${k}" aria-pressed="${state.stroke === k}">${v.icon} ${v.label}</button>`).join("")}</div>
    <div class="grid two">
      <div><label class="field" for="hand">Main de frappe</label><select id="hand"><option value="right" ${state.hand === "right" ? "selected" : ""}>Droitier</option><option value="left" ${state.hand === "left" ? "selected" : ""}>Gaucher</option></select></div>
      <div><label class="field" for="goal">Objectif de niveau</label><select id="goal">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}" ${state.goal === k ? "selected" : ""}>${v}</option>`).join("")}</select></div>
    </div>
    <p class="notice">🎥 <b>Conseil de filmage :</b> ${esc(s.cam)}</p>
    <div class="drop" id="drop">
      <p><b>Importez une vidéo, des photos ou une rafale</b></p>
      <div class="row" style="justify-content:center">
        <label class="btn">📁 Importer<input id="file" type="file" accept="video/*,image/*" multiple hidden></label>
        <label class="btn secondary">🎬 Filmer<input id="cam" type="file" accept="video/*" capture="environment" hidden></label>
      </div>
      <p class="muted small">Vidéo : 1 geste de préférence (3–8 s). Photos : 3 images ou plus (chargement, contact, fin).</p>
    </div>
    <div id="mediaZone"></div>
  </section>
  <section id="results"></section>`;
}

function bindAnalyse() {
  $("#strokeChips").addEventListener("click", (e) => { const b = e.target.closest("[data-stroke]"); if (!b) return; state.stroke = b.dataset.stroke; store.set("stroke", state.stroke); render(); if (state.media) showMedia(); });
  $("#hand").onchange = (e) => { state.hand = e.target.value; store.set("hand", state.hand); };
  $("#goal").onchange = (e) => { state.goal = e.target.value; store.set("goal", state.goal); };
  const onFiles = (files) => files.length && handleFiles([...files]);
  $("#file").onchange = (e) => onFiles(e.target.files);
  $("#cam").onchange = (e) => onFiles(e.target.files);
  const d = $("#drop");
  d.ondragover = (e) => { e.preventDefault(); d.classList.add("over"); };
  d.ondragleave = () => d.classList.remove("over");
  d.ondrop = (e) => { e.preventDefault(); d.classList.remove("over"); onFiles(e.dataTransfer.files); };
  if (state.media) showMedia();
  if (state.last) renderResults();
}

async function handleFiles(files) {
  const vids = files.filter((f) => f.type.startsWith("video/"));
  const imgs = files.filter((f) => f.type.startsWith("image/"));
  try {
    if (vids.length) {
      const src = await openVideo(vids[0]);
      state.media = { kind: "video", src, name: vids[0].name };
    } else if (imgs.length) {
      state.media = { kind: "images", files: imgs, phases: imgs.map((_, i) => (imgs.length === 1 ? "contact" : i === 0 ? "load" : i === imgs.length - 1 ? "follow" : "contact")) };
      if (imgs.length >= 3) state.media.phases = imgs.map((_, i) => (i === 0 ? "load" : i === Math.floor(imgs.length / 2) ? "contact" : i === imgs.length - 1 ? "follow" : "contact"));
    } else return toast("Format non pris en charge : choisissez une vidéo ou des images.");
    state.last = null; showMedia(); $("#results").innerHTML = "";
  } catch (err) { toast(err.message); }
}

function showMedia() {
  const z = $("#mediaZone"); if (!z) return;
  const m = state.media;
  if (m.kind === "video") {
    const dur = m.src.duration;
    z.innerHTML = `
    <h3>Vidéo : ${esc(m.name)} <span class="muted small">(${dur.toFixed(1)} s, ${m.src.width}×${m.src.height})</span></h3>
    <video id="prev" src="${m.src.url}" controls playsinline muted style="width:100%;max-height:320px;border-radius:10px;background:#000"></video>
    <div class="row">
      <div><label class="field" for="t0">Début (s)</label><input type="number" id="t0" min="0" max="${dur.toFixed(1)}" step="0.1" value="0" style="width:90px"></div>
      <div><label class="field" for="t1">Fin (s)</label><input type="number" id="t1" min="0" max="${dur.toFixed(1)}" step="0.1" value="${dur.toFixed(1)}" style="width:90px"></div>
      <div><label class="field" for="fps">Précision</label><select id="fps"><option value="12">Rapide (12 i/s)</option><option value="20" selected>Standard (20 i/s)</option><option value="30">Fine (30 i/s)</option></select></div>
      <div><label class="field" for="slow">Cadence de la vidéo</label><select id="slow"><option value="1">Temps réel</option><option value="2">Ralenti ×2</option><option value="4">Ralenti ×4</option><option value="8">Ralenti ×8</option></select></div>
      <div><label class="field" for="rot">Orientation</label><select id="rot"><option value="auto">Automatique</option><option value="0">Normale</option><option value="180">Retournée (180°)</option><option value="90">Rotation 90°</option><option value="270">Rotation 270°</option></select></div>
      <div><label class="field" for="model">Modèle IA</label><select id="model"><option value="full">Standard</option><option value="heavy">Précis (plus lent)</option></select></div>
    </div>
    <p class="muted small">Séance longue acceptée : les gestes sont repérés automatiquement (pics de vitesse du poignet) et les mesures sont agrégées (médiane). Le joueur est suivi et recadré automatiquement.</p>
    <div class="row"><button class="btn" id="go">▶ Lancer l'analyse</button><progress id="prog" max="1" value="0" hidden></progress></div><div id="status" class="muted small"></div>`;
  } else {
    z.innerHTML = `
    <h3>${m.files.length} photo(s)</h3>
    <p class="muted small">Indiquez la phase de chaque image : <b>chargement</b> (trophée / armé), <b>contact</b>, <b>fin de geste</b>. Plusieurs photos de « contact » : la meilleure sera retenue.</p>
    <div class="thumbs" id="thumbs"></div>
    <div class="row"><button class="btn" id="go">▶ Lancer l'analyse</button><progress id="prog" max="1" value="0" hidden></progress></div><div id="status" class="muted small"></div>`;
    const th = $("#thumbs");
    m.files.forEach((f, i) => {
      const fig = document.createElement("figure");
      const img = document.createElement("img"); img.src = URL.createObjectURL(f); img.style.cssText = "width:100%;border-radius:8px";
      const sel = document.createElement("select");
      sel.innerHTML = `<option value="load">Chargement</option><option value="contact">Contact</option><option value="follow">Fin de geste</option>`;
      sel.value = m.phases[i]; sel.onchange = () => (m.phases[i] = sel.value);
      fig.append(img, sel); th.append(fig);
    });
  }
  $("#go").onclick = runAnalysis;
}

async function runAnalysis() {
  if (state.busy) return; state.busy = true;
  const btn = $("#go"), prog = $("#prog"), status = $("#status");
  btn.disabled = true; prog.hidden = false; prog.value = 0;
  const say = (t) => (status.textContent = t);
  try {
    const model = $("#model")?.value || "full";
    await loadPose(model, say);
    const m = state.media;
    let proc, opts;
    if (m.kind === "video") {
      const start = Math.max(0, +$("#t0").value || 0), end = Math.min(m.src.duration, +$("#t1").value || m.src.duration);
      if (end - start < 0.4) throw new Error("Plage trop courte : augmentez la fin ou diminuez le début.");
      say("Analyse image par image…");
      const rotSel = $("#rot").value;
      proc = await processVideo(m.src, { start, end, fps: +$("#fps").value, rot: rotSel === "auto" ? "auto" : +rotSel, onProgress: (p) => (prog.value = p), onStatus: say });
      opts = { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, timed: true };
    } else {
      say("Analyse des photos…");
      proc = await processImages(m.files, { onProgress: (p) => (prog.value = p) });
      const idx = (ph) => m.phases.map((p, i) => (p === ph ? i : -1)).filter((i) => i >= 0);
      const c = idx("contact"), l = idx("load"), f = idx("follow");
      const cdet = c.filter((i) => proc.frames[i].lm);
      opts = { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, timed: false, contactIdx: cdet[0] ?? c[0], loadIdx: l[0] ?? cdet[0] ?? 0, followIdx: f[0] ?? cdet[0] ?? 0 };
      if (opts.contactIdx == null) throw new Error("Marquez au moins une photo comme « Contact ».");
    }
    const slow = +($("#slow")?.value || 1);
    opts.slow = slow;
    let last;
    const segs = m.kind === "video" ? segmentStrokes(proc.frames, { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, minGap: 2.5 * slow }) : [];
    if (segs.length >= 2) {
      // séance : un résultat par geste repéré + agrégation (médiane)
      const pre = 1.8 * slow + 0.6, post = 0.3 * slow + 0.9;
      const reps = segs.map((tc) => {
        const w = proc.frames.filter((f) => f.t >= tc - pre && f.t <= tc + post).map((f) => ({ ...f, t: f.t - (tc - pre) }));
        const r = analyze(w, { ...opts, hand: state.hand });
        return r.error ? null : { tc, t0: tc - pre, res: r };
      }).filter(Boolean);
      if (reps.length >= 2) {
        const agg = aggregate(state.stroke, reps.map((r) => r.res));
        last = { res: reps[0].res, proc, opts, kind: "video", reps, agg, sel: 0, t0: reps[0].t0 };
      }
    }
    if (!last) {
      let res;
      if (segs.length === 1) {
        const tc = segs[0], pre = 1.8 * slow + 0.6, post = 0.3 * slow + 0.9;
        const w = proc.frames.filter((f) => f.t >= tc - pre && f.t <= tc + post).map((f) => ({ ...f, t: f.t - (tc - pre) }));
        res = analyze(w, opts);
        if (!res.error) last = { res, proc, opts, kind: m.kind, t0: tc - pre, wframes: w };
      }
      if (!last) { res = analyze(proc.frames, opts); if (res.error) throw new Error(res.error); last = { res, proc, opts, kind: m.kind, t0: 0, wframes: proc.frames }; }
    }
    state.last = last;
    say("Terminé ✔");
    renderResults();
    saveHistory();
    $("#results").scrollIntoView({ behavior: "smooth" });
  } catch (err) { console.error(err); toast(err.message || "Erreur d'analyse"); say(err.message || "Erreur d'analyse"); }
  finally { state.busy = false; btn.disabled = false; prog.hidden = true; }
}

const fmt = (v, u) => (v == null ? "—" : `${u === "°" ? Math.round(v) : v.toFixed(2)} ${u}`);
function fmtRange(d) {
  const [a, b] = d.ok;
  if (b >= 90 && b > a + 5 && !(u(d) === "°" && b < 180)) return `≥ ${a}${u(d) === "°" ? "°" : ""}`;
  if (a <= 0 && b < 90) return `≤ ${b}${u(d) === "°" ? "°" : ""}`;
  return `${a}–${b}${u(d) === "°" ? "°" : ""}`;
}
const u = (d) => d.unit;

function renderResults() {
  const L = state.last; if (!L) return;
  const { res, opts } = L;
  const top = L.agg || res; // séance : valeurs médianes ; sinon geste unique
  const color = top.score >= 75 ? "var(--ok)" : top.score >= 50 ? "var(--warn)" : "var(--bad)";
  const rows = top.metrics.map((d) => {
    const sp = L.agg && L.agg.spread[d.id];
    const spread = sp && sp[2] > 1 ? `<br><small class="muted">étendue ${fmt(sp[0], d.unit)} → ${fmt(sp[1], d.unit)} (${sp[2]} gestes)</small>` : "";
    return `<tr><td>${esc(d.label)}<br><small class="muted">${esc(d.tip || "")}</small></td><td><b>${fmt(d.value, d.unit)}</b>${spread}</td><td class="muted">${d.status === "na" ? "n/a (vidéo requise)" : "cible " + fmtRange(d)}</td><td><span class="tag ${d.status}">${{ ok: "OK", warn: "À surveiller", bad: "À corriger", na: "—" }[d.status]}</span></td></tr>`;
  }).join("");
  const repSel = L.reps ? `<div class="notice">📊 <b>${L.reps.length} ${STROKES[state.stroke].label.toLowerCase()}s détectés</b> dans la séance : les mesures ci-dessous sont les <b>médianes</b>. Images clés du geste : <select id="rep">${L.reps.map((r, i) => `<option value="${i}" ${i === L.sel ? "selected" : ""}>n° ${i + 1} — t = ${(L.proc.offset + r.tc).toFixed(1)} s — score ${r.res.score ?? "—"}</option>`).join("")}</select></div>` : "";
  const issues = top.issues.length ? top.issues.map((it) => {
    const I = ISSUES[it.id]; if (!I) return "";
    return `<div class="issue ${it.sev >= 3 ? "sev2" : ""}"><h3>${esc(I.label)}</h3><p>${esc(I.why)}</p><div class="cue">🎯 <b>Consigne :</b> ${esc(I.cue)}</div>
      <details><summary>Exercices recommandés (${I.ex.length})</summary>${I.ex.map((id) => exCard(id)).join("")}</details></div>`;
  }).join("") : `<p>Aucun défaut majeur détecté sur les critères mesurables. Continuez à filmer sous plusieurs angles pour confirmer.</p>`;
  $("#results").innerHTML = `
  <section class="card">
    <h2>Résultat — ${STROKES[state.stroke].label}</h2>
    <div class="score"><div class="ring" style="--p:${top.score ?? 0};--c:${color}"><span>${top.score ?? "—"}</span></div>
      <div><b>Score technique indicatif /100</b><div class="kpi"><div>Détection : ${Math.round(res.detRate * 100)} %</div><div>Bras frappeur : ${res.hand === "left" ? "gauche" : "droit"}</div><div>Images : ${res.frames.length}</div></div></div></div>
    ${res.notes.map((n) => `<div class="notice">${esc(n)}</div>`).join("")}
    ${repSel}
    <h3>Images clés</h3><div class="canvases" id="keys"></div>
    ${L.kind === "video" && !L.reps ? `<label class="field" for="cslide">Corriger l'instant d'impact (image ${res.phases.contact + 1}/${res.frames.length})</label><input id="cslide" type="range" min="0" max="${res.frames.length - 1}" value="${res.phases.contact}" style="width:100%"><p class="muted small">Si l'image « Contact » n'est pas la bonne, faites glisser puis relâchez : les mesures sont recalculées.</p>` : ""}
    ${L.kind === "video" ? `<h3>Courbes</h3><canvas class="chart" id="chart" width="900" height="300"></canvas><p class="muted small">Vert : vitesse du poignet (u. relatives). Orange : flexion moyenne des genoux (°). Traits verticaux : chargement / contact / fin.</p>` : ""}
  </section>
  <section class="card"><h2>Mesures</h2><table><thead><tr><th>Critère</th><th>Mesuré</th><th>Repère</th><th>Statut</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="muted small">Les repères sont des plages pédagogiques indicatives issues de la littérature et du coaching ; les valeurs varient selon la morphologie, le style (ex. coup droit semi-ouvert) et l'angle de caméra.</p></section>
  <section class="card"><h2>Priorités de progression</h2>${issues}
    <div class="row"><button class="btn" data-go="exo">📅 Voir mon programme</button><button class="btn secondary" id="print">🖨 Exporter / imprimer</button></div></section>`;
  drawKeys();
  if (L.kind === "video") { drawChart(); if ($("#cslide")) $("#cslide").onchange = (e) => recompute(+e.target.value); }
  if ($("#rep")) $("#rep").onchange = (e) => { const r = L.reps[+e.target.value]; state.last = { ...L, sel: +e.target.value, res: r.res, t0: r.t0 }; renderResults(); $("#keys").scrollIntoView({ behavior: "smooth" }); };
  $("#print").onclick = () => window.print();
}

function recompute(contactIdx) {
  const L = state.last;
  const opts = { ...L.opts, contactIdx, loadIdx: undefined, followIdx: undefined };
  const res = analyze(L.wframes || L.proc.frames, opts);
  if (res.error) return toast(res.error);
  state.last = { ...L, res, opts };
  renderResults(); saveHistory(true);
}

async function drawKeys() {
  const L = state.last, host = $("#keys"); if (!host) return;
  const { res, proc } = L;
  const names = [["load", "Chargement"], ["contact", "Contact"], ["follow", "Fin de geste"]];
  host.innerHTML = "";
  for (const [k, name] of names) {
    const i = res.phases[k];
    let cv;
    if (L.kind === "video") cv = await grabFrame(state.media.src, proc.offset + (L.t0 || 0) + res.frames[i].t, proc.rot || 0);
    else { cv = document.createElement("canvas"); const src = proc.canvases[i]; cv.width = src.width; cv.height = src.height; cv.getContext("2d").drawImage(src, 0, 0); }
    const crop = cropToPlayer(cv, res.frames[i].lm);
    cv = crop.canvas;
    const lmShow = crop.lm;
    drawSkeleton(cv, lmShow, { hand: res.hand });
    const S = res.hand === "left" ? [11, 13, 15] : [12, 14, 16];
    const knee = res.series.knee[i];
    if (k === "contact") drawAngleLabel(cv, lmShow, S[0], S[1], S[2], `coude ${Math.round(res.metrics.find((m) => m.id === "elbow_contact")?.value ?? 0)}°`);
    if (k === "load") drawAngleLabel(cv, lmShow, 23, 25, 27, `genoux ${Math.round(knee)}°`);
    const fig = document.createElement("figure"); fig.append(cv);
    const cap = document.createElement("figcaption"); cap.textContent = `${name}${L.kind === "video" ? ` (t = ${((L.t0 || 0) + proc.offset + res.frames[i].t).toFixed(2)} s)` : ""}`; fig.append(cap);
    host.append(fig);
  }
}

function drawChart() {
  const cv = $("#chart"); if (!cv) return; const { res } = state.last;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  const t = res.series.t, T = t[t.length - 1] || 1;
  const plot = (arr, color, lo, hi) => {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath();
    arr.forEach((v, i) => { const x = (t[i] / T) * (W - 20) + 10, y = H - 10 - ((v - lo) / (hi - lo || 1)) * (H - 20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
  };
  const sp = res.series.speed; plot(sp, "#12b886", 0, Math.max(...sp));
  const kn = res.series.knee; plot(kn, "#f59f00", Math.min(...kn) - 5, Math.max(...kn) + 5);
  for (const [k, col] of [["load", "#888"], ["contact", "#e03131"], ["follow", "#888"]]) {
    const x = (t[res.phases[k]] / T) * (W - 20) + 10; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(x, 4); ctx.lineTo(x, H - 4); ctx.stroke(); ctx.setLineDash([]);
  }
}

function saveHistory(replaceLast = false) {
  const L = state.last; if (!L) return;
  const h = store.get("history", []);
  const entry = { date: new Date().toISOString(), stroke: state.stroke, score: (L.agg || L.res).score, reps: L.reps ? L.reps.length : 1, issues: (L.agg || L.res).issues.map((i) => i.id), values: Object.fromEntries((L.agg || L.res).metrics.filter((m) => m.value != null).map((m) => [m.id, +m.value.toFixed(2)])) };
  if (replaceLast && h.length) h[h.length - 1] = entry; else h.push(entry);
  store.set("history", h.slice(-100));
}

// =========================== TACTIQUE ==========================================================================
function viewTactic() {
  const form = QUESTIONS.map((s) => `<fieldset class="card qsec"><legend><h3>${esc(s.section)}</h3></legend>${s.items.map(qHTML).join("")}</fieldset>`).join("");
  return `<section class="card"><h2>Questionnaire tactique</h2><p class="muted">Répondez en 2 minutes : l'app génère un plan de jeu, des schémas de points et des ajustements selon la surface, le vent, la chaleur… Les réponses sont mémorisées sur cet appareil.</p></section>
  <form id="qform">${form}<div class="row"><button class="btn" type="submit">⚡ Générer le plan de jeu</button><button class="btn secondary" type="button" id="reset">Réinitialiser</button></div></form>
  <section id="plan"></section>`;
}
function qHTML(q) {
  const v = state.answers[q.id];
  if (q.type === "select") return `<label class="field" for="${q.id}">${esc(q.label)}</label><select id="${q.id}" name="${q.id}">${q.options.map((o) => `<option value="${o.value}" ${v === o.value ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select>`;
  const kind = q.type === "multi" ? "checkbox" : "radio";
  return `<label class="field">${esc(q.label)}</label><div class="opts">${q.options.map((o) => `<label><input type="${kind}" name="${q.id}" value="${o.value}" ${(kind === "checkbox" ? (v || []).includes(o.value) : v === o.value) ? "checked" : ""}> ${esc(o.label)}</label>`).join("")}</div>`;
}
function readForm() {
  const f = $("#qform"), a = {};
  for (const s of QUESTIONS) for (const q of s.items) {
    if (q.type === "multi") a[q.id] = [...f.querySelectorAll(`[name="${q.id}"]:checked`)].map((i) => i.value);
    else if (q.type === "radio") a[q.id] = (f.querySelector(`[name="${q.id}"]:checked`) || {}).value ?? q.def;
    else a[q.id] = f.querySelector(`[name="${q.id}"]`).value;
  }
  return a;
}
function bindTactic() {
  $("#qform").onsubmit = (e) => { e.preventDefault(); state.answers = readForm(); store.set("answers", state.answers); renderPlan(); $("#plan").scrollIntoView({ behavior: "smooth" }); };
  $("#reset").onclick = () => { state.answers = defaultAnswers(); store.set("answers", state.answers); render(); };
  if (store.get("answers", null)) renderPlan();
}
function renderPlan() {
  const A = state.answers, plan = buildPlan(A);
  const ul = (a) => (a.length ? `<ul class="clean">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p class='muted'>—</p>");
  const lefty = A.p_hand === "left";
  $("#plan").innerHTML = `
  <section class="card hero"><h2>${esc(plan.headline)}</h2><p>${plan.principles.length ? esc(plan.principles[0]) : ""}</p></section>
  <div class="grid two">
    <section class="card"><h3>🧭 Principes de jeu</h3>${ul(plan.principles)}</section>
    <section class="card"><h3>🎾 Service</h3>${ul(plan.serve)}<h3>↩️ Retour</h3>${ul(plan.ret)}</section>
  </div>
  <section class="card"><h2>Schémas tactiques recommandés</h2><p class="muted small">Vert : vos frappes · Orange pointillé : adversaire · Les numéros indiquent l'ordre. Schémas symétrisés pour ${lefty ? "gaucher" : "droitier"}. Score = adéquation avec votre profil.</p>
    ${plan.patterns.length ? plan.patterns.map(({ p, score, why }) => `<div class="pat card"><div>${courtSVG(p, lefty)}</div><div><span class="tag ok">${esc(p.phase)}</span> <small class="muted">adéquation ${Math.round(score)}</small><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${why.length ? `<ul class="why clean">${why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}</div></div>`).join("") : "<p>Aucun schéma ne ressort nettement : jouez au centre, profond, et observez l'adversaire.</p>"}</section>
  <div class="grid two">
    <section class="card"><h3>🌤 Conditions</h3>${ul(plan.cond)}</section>
    <section class="card"><h3>⏱ Situations clés</h3>${ul(plan.situ)}</section>
    <section class="card"><h3>🚫 À éviter</h3>${ul(plan.avoid)}</section>
    <section class="card"><h3>✅ Check-list</h3>${ul(plan.check)}</section>
  </div>
  <div class="row"><button class="btn secondary" onclick="window.print()">🖨 Imprimer le plan</button></div>`;
}

// =========================== EXERCICES / PROGRAMME ====================================================================
function exCard(id) {
  const e = EXERCISES[id]; if (!e) return "";
  return `<div class="card" style="margin:8px 0"><b>${esc(e.name)}</b> <span class="tag ${e.level === 1 ? "ok" : "warn"}">${e.level === 1 ? "niveau 1" : "niveau 2"}</span><br><small class="muted">${esc(e.where)} · ${esc(e.dose)}</small><p style="margin:.4em 0 0">${esc(e.how)}</p></div>`;
}

function buildProgram() {
  const hist = store.get("history", []);
  const lastByStroke = {};
  hist.forEach((h) => (lastByStroke[h.stroke] = h));
  const issueScore = new Map();
  Object.values(lastByStroke).forEach((h) => h.issues.forEach((id, i) => issueScore.set(id, (issueScore.get(id) || 0) + (10 - i))));
  const top = [...issueScore.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 3);
  return { top, hasData: top.length > 0 };
}

function viewExo() {
  const prog = buildProgram();
  const goal = LEVELS[state.goal] || "";
  let plan = "";
  if (!prog.hasData) plan = `<p class="muted">Faites d'abord une analyse (onglet Analyse) : le programme s'adaptera à vos défauts prioritaires.</p><button class="btn" data-go="analyse">📹 Analyser un geste</button>`;
  else {
    const weeks = [
      { t: "Semaine 1 · Conscience du geste", ids: [prog.top[0]], lvl: 1, note: "3 séances de 20 min : exercices niveau 1 sans balle ou au ralenti, filmez-vous en fin de semaine." },
      { t: "Semaine 2 · Automatisation", ids: [prog.top[0], prog.top[1]].filter(Boolean), lvl: 1, note: "Ajoutez de la balle (panier) puis des petits blocs de 10 répétitions : 70 % de réussite visés." },
      { t: "Semaine 3 · Variabilité", ids: [prog.top[1], prog.top[2]].filter(Boolean), lvl: 2, note: "Exercices niveau 2 + situations de jeu (cibles, vitesses différentes)." },
      { t: "Semaine 4 · Intégration & bilan", ids: [prog.top[0], prog.top[1], prog.top[2]].filter(Boolean), lvl: 2, note: "Match d'entraînement avec objectif technique unique ; refaites l'analyse vidéo pour comparer." },
    ];
    plan = weeks.map((w) => `<details ${w === weeks[0] ? "open" : ""}><summary>${w.t}</summary><p class="muted">${w.note}</p>${w.ids.map((id) => `<h3>${esc(ISSUES[id]?.label || id)}</h3>${(ISSUES[id]?.ex || []).map((e) => EXERCISES[e]).filter(Boolean).filter((e) => e.level <= w.lvl).length ? ISSUES[id].ex.filter((e) => EXERCISES[e] && EXERCISES[e].level <= w.lvl).map(exCard).join("") : ISSUES[id].ex.map(exCard).join("")}`).join("")}</details>`).join("");
  }
  const s2 = state.goal === "s2" ? `<section class="card"><h3>🎯 Repères pour viser la 2e série (service)</h3><ul class="clean"><li>Un 2e service fiable (≥ 70 % en jeu) avec rotation (kick/slice) est un levier majeur de progression, plus que la vitesse de 1re balle.</li><li>Travaillez la zone : T / extérieur / corps, sur 1re et 2e balle (voir « échelle de service »).</li><li>Fixez 1 critère technique à la fois : flexion → hauteur de contact → dissociation.</li><li>Tracez vos stats en match (1res en jeu, points sur 1re/2e) pour mesurer l'effet réel.</li></ul><p class="muted small">Repères indicatifs, à adapter avec votre entraîneur.</p></section>` : "";
  return `<section class="card"><h2>Programme sur 4 semaines</h2><p>Objectif : <b>${esc(goal)}</b> <button class="chip" data-go="analyse">modifier</button></p>${plan}</section>${s2}
  <section class="card"><h2>Bibliothèque d'exercices</h2>${Object.keys(EXERCISES).map(exCard).join("")}</section>`;
}
function bindExo() {}

// =========================== SUIVI =====================================================================================
function viewTrack() {
  const h = store.get("history", []);
  if (!h.length) return `<section class="card"><h2>Suivi</h2><p class="muted">Aucune analyse enregistrée. Vos scores seront affichés ici.</p><button class="btn" data-go="analyse">Analyser un geste</button></section>`;
  return `<section class="card"><h2>Évolution des scores</h2><canvas class="chart" id="hchart" width="900" height="300"></canvas></section>
  <section class="card"><h2>Historique</h2><table><thead><tr><th>Date</th><th>Geste</th><th>Score</th><th>Défauts</th></tr></thead><tbody>${[...h].reverse().map((e) => `<tr><td>${new Date(e.date).toLocaleDateString("fr-FR")}</td><td>${esc(STROKES[e.stroke]?.label || e.stroke)}</td><td><b>${e.score ?? "—"}</b></td><td class="small">${e.issues.map((i) => esc(ISSUES[i]?.label || i)).join(", ") || "—"}</td></tr>`).join("")}</tbody></table>
  <div class="row"><button class="btn secondary" id="exp">⬇ Exporter (JSON)</button><button class="btn secondary" id="clr">🗑 Effacer</button></div></section>`;
}
function bindTrack() {
  const h = store.get("history", []); if (!h.length) return;
  const cv = $("#hchart"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const strokes = [...new Set(h.map((e) => e.stroke))];
  const cols = ["#12b886", "#f59f00", "#4c6ef5", "#e03131", "#ae3ec9"];
  strokes.forEach((s, si) => {
    const pts = h.filter((e) => e.stroke === s && e.score != null);
    ctx.strokeStyle = cols[si % cols.length]; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 3; ctx.beginPath();
    pts.forEach((p, i) => { const x = pts.length === 1 ? W / 2 : 20 + (i / (pts.length - 1)) * (W - 40), y = H - 20 - (p.score / 100) * (H - 40); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    pts.forEach((p, i) => { const x = pts.length === 1 ? W / 2 : 20 + (i / (pts.length - 1)) * (W - 40), y = H - 20 - (p.score / 100) * (H - 40); ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); });
    ctx.font = "20px system-ui"; ctx.fillText(STROKES[s]?.label || s, 24 + si * 190, 24);
  });
  $("#exp").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(h, null, 2)], { type: "application/json" })); a.download = "tennis-coach-historique.json"; a.click(); };
  $("#clr").onclick = () => { if (confirm("Effacer tout l'historique ?")) { store.set("history", []); render(); } };
}

// =========================== SOURCES ===================================================================================
function viewSources() {
  const link = (r) => (r.doi ? ` <a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">DOI</a>` : r.url ? ` <a href="${r.url}" target="_blank" rel="noopener">lien</a>` : "");
  return `<section class="card"><h2>Sources scientifiques & pédagogiques</h2><p class="muted">Les repères et consignes de l'application s'appuient sur la littérature de biomécanique du tennis et sur la documentation d'entraîneurs. Les plages cibles sont simplifiées à des fins pédagogiques.</p>
  <ul class="clean">${REFERENCES.map((r) => `<li><span class="tag ok">${esc(r.topic)}</span> ${esc(r.cite)}${link(r)}</li>`).join("")}</ul></section>
  <section class="card"><h3>Limites & usage responsable</h3><ul class="clean"><li>Estimation de pose monoculaire : les angles dans le plan de la caméra sont plus fiables que la profondeur.</li><li>Les rotations (bassin/épaules) sont des estimations ; filmez de dos ou de face pour les mieux voir.</li><li>Ne remplace pas un entraîneur diplômé ni un avis médical.</li><li>Les données restent sur votre appareil (localStorage) ; le moteur IA et le modèle sont téléchargés une fois depuis des CDN publics.</li></ul></section>`;
}

// =========================== DÉMARRAGE ================================================================================
const initial = location.hash.slice(1);
if (TABS.some(([id]) => id === initial)) state.tab = initial;
render();
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h !== state.tab && TABS.some(([id]) => id === h)) { state.tab = h; render(); } });
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});



