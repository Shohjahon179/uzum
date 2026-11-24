"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- Ma'lumotlar ---------- */
const CATS = [
  { id: "all", n: "Hammasi", e: "✨" },
  { id: "elec", n: "Elektronika", e: "📱" },
  { id: "home", n: "Uy-ro'zg'or", e: "🏠" },
  { id: "fash", n: "Kiyim", e: "👕" },
  { id: "food", n: "Oziq-ovqat", e: "🍎" },
  { id: "beauty", n: "Go'zallik", e: "💄" },
  { id: "kids", n: "Bolalar", e: "🧸" },
  { id: "sport", n: "Sport", e: "⚽" }
];
const G = ["#ede9fe", "#fce7f3", "#dbeafe", "#dcfce7", "#fef3c7", "#ffedd5", "#e0f2fe", "#fae8ff"];
const P = [
  [1, "Smartfon X12 128GB", "elec", 3490000, 3990000, "📱", 4.8, 1240, "Katta AMOLED ekran, 50MP kamera va kun bo'yi ishlaydigan batareya."],
  [2, "Simsiz quloqchin Pro", "elec", 289000, 399000, "🎧", 4.6, 3100, "Shovqinni yo'qotish, 24 soat batareya, suvga chidamli."],
  [3, "Smart soat Fit 5", "elec", 459000, 599000, "⌚", 4.5, 870, "Yurak urishi, uyqu va sport rejimlarini kuzatadi."],
  [4, "Noutbuk Air 14\"", "elec", 7990000, 8990000, "💻", 4.9, 410, "Yengil, tez va uzoq ishlaydi. 16GB RAM, 512GB SSD."],
  [5, "Planshet Tab 10", "elec", 2190000, 2590000, "📲", 4.4, 560, "Bolalar va o'qish uchun ajoyib 10 dyuymli planshet."],
  [6, "Elektr choynak 1.7L", "home", 169000, 219000, "🫖", 4.7, 2300, "Zanglamaydigan po'lat, tez qaynaydi, avtomatik o'chadi."],
  [7, "Changyutgich Turbo", "home", 899000, 1199000, "🧹", 4.6, 690, "Kuchli so'rish, HEPA filtr, kam shovqin."],
  [8, "Yotoq to'plami 2 kishilik", "home", 329000, 429000, "🛏️", 4.5, 1500, "100% paxta, yumshoq va chiroyli ranglar."],
  [9, "Qozon to'plami 5 dona", "home", 549000, 749000, "🍲", 4.8, 980, "Yopishmaydigan qoplama, barcha plitalarga mos."],
  [10, "Erkaklar futbolkasi", "fash", 79000, 119000, "👕", 4.3, 4200, "Sifatli paxta, har kuni kiyish uchun qulay."],
  [11, "Ayollar ko'ylagi", "fash", 249000, 329000, "👗", 4.7, 1100, "Yengil mato, yozgi kolleksiya."],
  [12, "Krossovka Run Max", "fash", 399000, 549000, "👟", 4.6, 2700, "Yengil taglik, yugurish va kundalik kiyish uchun."],
  [13, "Ryukzak City", "fash", 189000, 259000, "🎒", 4.5, 1900, "Noutbuk uchun bo'lim, suv o'tkazmaydi."],
  [14, "Qishki kurtka", "fash", 699000, 999000, "🧥", 4.8, 760, "Iliq va shamolga chidamli, -20° gacha."],
  [15, "Mevalar to'plami 3 kg", "food", 69000, 0, "🍎", 4.9, 5200, "Yangi, mazali va vitaminlarga boy mevalar."],
  [16, "Yashil choy 100 paket", "food", 39000, 55000, "🍵", 4.7, 3300, "Tabiiy yashil choy, xushbo'y va foydali."],
  [17, "Quritilgan mevalar aralashmasi", "food", 59000, 79000, "🥜", 4.6, 2100, "Yong'oq, mayiz va o'rik aralashmasi."],
  [18, "Asal 1 kg", "food", 129000, 159000, "🍯", 4.9, 1800, "Tog' asali, 100% tabiiy."],
  [19, "Atir Rose 50ml", "beauty", 219000, 299000, "🌹", 4.7, 1300, "Nafis gul hidi, uzoq saqlanadi."],
  [20, "Yuz kremi Hydra", "beauty", 99000, 139000, "🧴", 4.5, 2600, "Teringizni 24 soat namlaydi."],
  [21, "Lab bo'yog'i to'plami", "beauty", 89000, 129000, "💄", 4.4, 1700, "6 ta zamonaviy rang."],
  [22, "Yumshoq ayiqcha", "kids", 99000, 139000, "🧸", 4.9, 3900, "Bolalar uchun xavfsiz va yumshoq o'yinchoq."],
  [23, "Konstruktor 500 dona", "kids", 189000, 259000, "🧩", 4.8, 1400, "Tasavvurni rivojlantiradi, 6+ yosh."],
  [24, "Futbol to'pi Pro", "sport", 129000, 179000, "⚽", 4.6, 2500, "Rasmiy o'lcham, chidamli material."],
  [25, "Yoga gilami", "sport", 99000, 139000, "🧘", 4.5, 1200, "Sirpanmaydigan, qalinligi 6mm."],
  [26, "Velosiped Mountain 26", "sport", 2390000, 2890000, "🚲", 4.7, 320, "21 tezlik, alyuminiy rama."]
].map(a => ({ id: a[0], name: a[1], cat: a[2], price: a[3], old: a[4], e: a[5], rate: a[6], sold: a[7], desc: a[8], bg: G[a[0] % G.length] }));

const BANNERS = [
  { t: "Katta chegirmalar!", s: "70% gacha tejang", e: "🔥", c: "linear-gradient(135deg,#7c3aed,#a78bfa)" },
  { t: "Bepul yetkazib berish", s: "300 000 so'mdan yuqori buyurtmaga", e: "🚚", c: "linear-gradient(135deg,#db2777,#f472b6)" },
  { t: "Yangi kolleksiya", s: "Eng so'nggi mahsulotlar", e: "🎁", c: "linear-gradient(135deg,#0891b2,#22d3ee)" }
];

/* ---------- Holat ---------- */
let users = store.get("md_users", []);
let me = store.get("md_session", null);
let cart = store.get("md_cart", {});
let favs = store.get("md_favs", []);
let orders = store.get("md_orders", []);
let tab = "home", cat = "all", q = "", bIdx = 0, bTimer = null;

const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
const hash = s => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) | 0; return String(h); };
const normPhone = p => { const d = p.replace(/\D/g, ""); if (d.length === 9) return "998" + d; return d; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const cartSum = () => Object.entries(cart).reduce((s, [id, n]) => s + (P.find(p => p.id == id)?.price || 0) * n, 0);
const saveAll = () => { store.set("md_cart", cart); store.set("md_favs", favs); store.set("md_orders", orders); };

function toast(m) {
  const t = $("#toast"); t.textContent = m; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2000);
}
function vib(ms = 15) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }

/* ---------- Splash / Auth ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#splash").classList.add("out");
    setTimeout(() => $("#splash").classList.add("hidden"), 500);
    me && users.find(u => u.id === me) ? enterApp() : $("#auth").classList.remove("hidden");
  }, 1900);
});

function authErr(m) {
  const e = $("#authErr"); e.textContent = m;
  const card = $(".auth-card"); card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
  vib(40);
}
function setAuthTab(reg) {
  $(".tabs").classList.toggle("reg", reg);
  $("#tabLogin").classList.toggle("active", !reg);
  $("#tabReg").classList.toggle("active", reg);
  $("#loginForm").classList.toggle("hidden", reg);
  $("#regForm").classList.toggle("hidden", !reg);
  $("#authErr").textContent = "";
}
$("#tabLogin").onclick = () => setAuthTab(false);
$("#tabReg").onclick = () => setAuthTab(true);

$("#regForm").onsubmit = e => {
  e.preventDefault();
  const name = $("#rName").value.trim(), phone = normPhone($("#rPhone").value), p1 = $("#rPass").value, p2 = $("#rPass2").value;
  if (name.length < 2) return authErr("Ismingizni kiriting");
  if (phone.length !== 12 || !phone.startsWith("998")) return authErr("Telefon raqam noto'g'ri (+998 XX XXX XX XX)");
  if (p1.length < 6) return authErr("Parol kamida 6 belgi bo'lsin");
  if (p1 !== p2) return authErr("Parollar bir xil emas");
  if (users.some(u => u.phone === phone)) return authErr("Bu raqam allaqachon ro'yxatdan o'tgan");
  const u = { id: Date.now(), name, phone, pass: hash(p1), addr: "" };
  users.push(u); store.set("md_users", users);
  me = u.id; store.set("md_session", me);
  $("#authErr").textContent = "";
  enterApp(); toast("Xush kelibsiz, " + name + "! 🎉");
};
$("#loginForm").onsubmit = e => {
  e.preventDefault();
  const phone = normPhone($("#lPhone").value), pass = $("#lPass").value;
  const u = users.find(x => x.phone === phone);
  if (!u) return authErr("Bunday foydalanuvchi topilmadi");
  if (u.pass !== hash(pass)) return authErr("Parol noto'g'ri");
  me = u.id; store.set("md_session", me);
  enterApp();
};

const user = () => users.find(u => u.id === me);
function enterApp() {
  $("#auth").classList.add("hidden");
  $("#app").classList.remove("hidden");
  $("#hName").textContent = user().name.split(" ")[0];
  go("home");
}

/* ---------- Navigatsiya ---------- */
$$("nav button").forEach(b => b.onclick = () => { vib(8); go(b.dataset.tab); });
function go(t) {
  tab = t;
  $$("nav button").forEach(b => b.classList.toggle("active", b.dataset.tab === t));
  clearInterval(bTimer);
  render();
  $("main").scrollTop = 0;
}
function badge(bump) {
  const n = cartCount(), b = $("#badge");
  b.textContent = n; b.classList.toggle("hidden", !n);
  if (bump) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
}
function render() {
  badge();
  const v = $("#view");
  v.onclick = null;
  v.className = ""; void v.offsetWidth; v.className = "view";
  ({ home: renderHome, favs: renderFavs, cart: renderCart, profile: renderProfile })[tab](v);
}

/* ---------- Bosh sahifa ---------- */
function card(p, i) {
  const d = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  return `<div class="card" style="animation-delay:${Math.min(i, 10) * 40}ms" data-id="${p.id}">
    <div class="pimg" style="background:${p.bg}">${p.e}
      ${d ? `<span class="disc">-${d}%</span>` : ""}
      <button class="heart ${favs.includes(p.id) ? "on" : ""}" data-fav="${p.id}">${favs.includes(p.id) ? "❤️" : "🤍"}</button>
    </div>
    <div class="pinfo">
      <div class="pname">${esc(p.name)}</div>
      <div class="rate">⭐ ${p.rate} · ${p.sold} ta sotilgan</div>
      ${p.old ? `<div class="old">${fmt(p.old)}</div>` : '<div class="old">&nbsp;</div>'}
      <div class="price">${fmt(p.price)}</div>
    </div>
    <button class="add" data-add="${p.id}">+</button>
  </div>`;
}
function list() {
  return P.filter(p => (cat === "all" || p.cat === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase())));
}
function renderHome(v) {
  v.innerHTML = `
    <div class="search"><span>🔍</span><input id="q" placeholder="Mahsulot qidirish..." value="${esc(q)}"></div>
    ${q ? "" : `<div class="slider"><div class="slides" id="slides">${BANNERS.map(b => `<div class="slide" style="background:${b.c}"><div><h3>${b.t}</h3><p>${b.s}</p></div><div class="big">${b.e}</div></div>`).join("")}</div><div class="dots">${BANNERS.map((_, i) => `<span class="${i === 0 ? "on" : ""}"></span>`).join("")}</div></div>`}
    <div class="chips">${CATS.map(c => `<button class="chip ${c.id === cat ? "on" : ""}" data-cat="${c.id}">${c.e} ${c.n}</button>`).join("")}</div>
    <h4 class="sec">${q ? "Qidiruv natijasi" : cat === "all" ? "Mashhur mahsulotlar" : CATS.find(c => c.id === cat).n}</h4>
    <div class="grid" id="grid"></div>`;
  fillGrid();
  $("#q").oninput = e => { q = e.target.value; const pos = e.target.selectionStart; renderHome(v); const i = $("#q"); i.focus(); i.setSelectionRange(pos, pos); };
  $$(".chip").forEach(c => c.onclick = () => { cat = c.dataset.cat; vib(8); renderHome(v); });
  if (!q) {
    bIdx = 0;
    bTimer = setInterval(() => {
      const s = $("#slides"); if (!s) return clearInterval(bTimer);
      bIdx = (bIdx + 1) % BANNERS.length;
      s.style.transform = `translateX(-${bIdx * 100}%)`;
      $$(".dots span").forEach((d, i) => d.classList.toggle("on", i === bIdx));
    }, 3200);
  }
}
function fillGrid() {
  const l = list(), g = $("#grid");
  g.innerHTML = l.length ? l.map(card).join("") : "";
  if (!l.length) g.innerHTML = `<div class="empty" style="grid-column:1/-1"><div class="e">🔎</div><h4>Hech narsa topilmadi</h4><p>Boshqa so'z bilan urinib ko'ring</p></div>`;
  bindCards(g);
}
function bindCards(root) {
  root.onclick = e => {
    const f = e.target.closest("[data-fav]"), a = e.target.closest("[data-add]"), c = e.target.closest(".card");
    if (f) { toggleFav(+f.dataset.fav, f); return; }
    if (a) { addCart(+a.dataset.add, a); return; }
    if (c) openProduct(+c.dataset.id);
  };
}
function toggleFav(id, el) {
  const i = favs.indexOf(id);
  if (i < 0) { favs.push(id); toast("Sevimlilarga qo'shildi ❤️"); } else { favs.splice(i, 1); toast("Sevimlilardan olib tashlandi"); }
  saveAll(); vib(12);
  if (el) { el.textContent = favs.includes(id) ? "❤️" : "🤍"; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); }
  if (tab === "favs") setTimeout(() => render(), 250);
}
function addCart(id, from) {
  cart[id] = (cart[id] || 0) + 1; saveAll(); vib(15);
  if (from) {
    const r = from.getBoundingClientRect(), t = document.querySelector('nav [data-tab="cart"]').getBoundingClientRect();
    const f = document.createElement("div"); f.className = "fly"; f.textContent = P.find(p => p.id === id).e;
    f.style.left = r.left + "px"; f.style.top = r.top + "px"; document.body.appendChild(f);
    requestAnimationFrame(() => { f.style.left = t.left + t.width / 2 - 15 + "px"; f.style.top = t.top + "px"; f.style.transform = "scale(.3)"; f.style.opacity = ".4"; });
    setTimeout(() => { f.remove(); badge(true); }, 700);
  } else badge(true);
  toast("Savatga qo'shildi 🛒");
}

/* ---------- Sevimlilar ---------- */
function renderFavs(v) {
  const l = P.filter(p => favs.includes(p.id));
  v.innerHTML = `<h4 class="sec">Sevimli mahsulotlar</h4>` + (l.length ? `<div class="grid" id="grid">${l.map(card).join("")}</div>` :
    `<div class="empty"><div class="e">💔</div><h4>Sevimlilar bo'sh</h4><p>Yoqqan mahsulotdagi ❤️ tugmasini bosing</p></div>`);
  if (l.length) bindCards($("#grid"));
}

/* ---------- Savat ---------- */
function renderCart(v) {
  const ids = Object.keys(cart);
  if (!ids.length) { v.innerHTML = `<div class="empty"><div class="e">🛒</div><h4>Savat bo'sh</h4><p>Mahsulot qo'shing va buyurtma bering</p></div>`; return; }
  const sum = cartSum(), ship = sum >= 300000 ? 0 : 20000;
  v.innerHTML = `<h4 class="sec">Savat (${cartCount()})</h4>` + ids.map((id, i) => {
    const p = P.find(x => x.id == id);
    return `<div class="row" style="animation-delay:${i * 50}ms"><div class="th" style="background:${p.bg}">${p.e}</div>
      <div class="mid"><b>${esc(p.name)}</b><span class="price">${fmt(p.price * cart[id])}</span>
      <div class="qty"><button data-m="${id}">−</button><b>${cart[id]}</b><button data-p="${id}">+</button></div></div>
      <button class="rm" data-r="${id}">🗑️</button></div>`;
  }).join("") + `<div class="total">
    <div class="l"><span>Mahsulotlar</span><span>${fmt(sum)}</span></div>
    <div class="l"><span>Yetkazib berish</span><span>${ship ? fmt(ship) : "Bepul 🎉"}</span></div>
    <div class="l t"><span>Jami</span><span>${fmt(sum + ship)}</span></div>
    <button class="btn" id="checkout">Buyurtma berish</button></div>`;
  v.onclick = e => {
    const m = e.target.closest("[data-m]"), pl = e.target.closest("[data-p]"), r = e.target.closest("[data-r]");
    if (m) { const id = m.dataset.m; if (--cart[id] <= 0) delete cart[id]; }
    else if (pl) cart[pl.dataset.p]++;
    else if (r) delete cart[r.dataset.r];
    else if (e.target.id === "checkout") return openCheckout();
    else return;
    saveAll(); vib(8); renderCart(v); badge();
  };
}

/* ---------- Sheet ---------- */
function openSheet(html) {
  const s = $("#sheet"), o = $("#overlay");
  s.className = "sheet"; s.innerHTML = `<div class="grab"></div>` + html;
  s.classList.remove("hidden", "closing"); o.classList.remove("hidden");
  o.onclick = closeSheet;
}
function closeSheet() {
  const s = $("#sheet"); s.classList.add("closing");
  setTimeout(() => { s.classList.add("hidden"); s.classList.remove("closing"); $("#overlay").classList.add("hidden"); }, 240);
}
function openProduct(id) {
  const p = P.find(x => x.id === id);
  openSheet(`<div class="dimg" style="background:${p.bg}">${p.e}</div>
    <h3>${esc(p.name)}</h3><div class="rate">⭐ ${p.rate} · ${p.sold} ta sotilgan</div>
    <p class="d">${esc(p.desc)}</p>
    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:16px"><span class="price" style="font-size:24px">${fmt(p.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span>` : ""}</div>
    <div style="display:flex;gap:10px"><button class="btn sec" id="sf" style="width:64px">${favs.includes(id) ? "❤️" : "🤍"}</button><button class="btn" id="sa">Savatga qo'shish</button></div>`);
  $("#sf").onclick = e => { toggleFav(id); e.currentTarget.textContent = favs.includes(id) ? "❤️" : "🤍"; if (tab === "home") fillGrid(); };
  $("#sa").onclick = () => { addCart(id); closeSheet(); };
}
function openCheckout() {
  const u = user(), sum = cartSum(), ship = sum >= 300000 ? 0 : 20000; let pay = "Naqd pul";
  openSheet(`<h3 style="margin-bottom:14px">Buyurtmani rasmiylashtirish</h3>
    <form id="cf"><label>Yetkazib berish manzili<input id="cAddr" class="field" placeholder="Shahar, ko'cha, uy" value="${esc(u.addr || "")}"></label>
    <label>Telefon<input class="field" value="+${u.phone}" disabled></label>
    <label>To'lov usuli</label><div class="pay"><button type="button" class="on">💵 Naqd pul</button><button type="button">💳 Karta</button></div>
    <div class="total" style="box-shadow:none;background:var(--p3);margin:0 0 14px"><div class="l t" style="margin:0"><span>Jami</span><span>${fmt(sum + ship)}</span></div></div>
    <button class="btn" type="submit">Tasdiqlash</button><p class="err" id="cErr"></p></form>`);
  $$(".pay button").forEach(b => b.onclick = () => { $$(".pay button").forEach(x => x.classList.remove("on")); b.classList.add("on"); pay = b.textContent.replace(/^\S+\s/, ""); vib(8); });
  $("#cf").onsubmit = e => {
    e.preventDefault();
    const addr = $("#cAddr").value.trim();
    if (addr.length < 5) { $("#cErr").textContent = "Manzilni to'liq kiriting"; return; }
    u.addr = addr; store.set("md_users", users);
    const items = Object.entries(cart).map(([id, n]) => ({ id: +id, n }));
    const o = { no: String(Date.now()).slice(-6), date: new Date().toLocaleString("uz-UZ"), items, total: sum + ship, addr, pay };
    orders.unshift(o); cart = {}; saveAll(); badge();
    $("#sheet").innerHTML = `<div class="grab"></div><div class="success"><div class="ck">✓</div><h3>Buyurtma qabul qilindi!</h3>
      <p class="d">Buyurtma #${o.no}. Tez orada siz bilan bog'lanamiz.</p><button class="btn" id="ok">Yaxshi</button></div>`;
    vib(60); $("#ok").onclick = () => { closeSheet(); go("home"); };
  };
}
function openOrders() {
  openSheet(`<h3 style="margin-bottom:12px">Mening buyurtmalarim</h3>` + (orders.length ? orders.map(o => `<div class="ord">
    <div class="h"><span>#${o.no}</span><span class="st">Jarayonda</span></div>
    <small>${o.date}</small><small>${o.items.map(i => P.find(p => p.id === i.id)?.e + "×" + i.n).join("  ")}</small>
    <small>📍 ${esc(o.addr)} · ${esc(o.pay)}</small><b class="price">${fmt(o.total)}</b></div>`).join("") :
    `<div class="empty"><div class="e">📦</div><h4>Buyurtmalar yo'q</h4></div>`));
}
function openEdit() {
  const u = user();
  openSheet(`<h3 style="margin-bottom:14px">Profilni tahrirlash</h3><form id="ef">
    <label>Ism familiya<input id="eN" class="field" value="${esc(u.name)}"></label>
    <label>Manzil<input id="eA" class="field" value="${esc(u.addr || "")}" placeholder="Yetkazib berish manzili"></label>
    <button class="btn" type="submit">Saqlash</button></form>`);
  $("#ef").onsubmit = e => {
    e.preventDefault();
    const n = $("#eN").value.trim(); if (n.length < 2) return toast("Ism juda qisqa");
    u.name = n; u.addr = $("#eA").value.trim(); store.set("md_users", users);
    $("#hName").textContent = n.split(" ")[0]; closeSheet(); render(); toast("Saqlandi ✅");
  };
}

/* ---------- Profil ---------- */
function renderProfile(v) {
  const u = user();
  v.innerHTML = `<div class="pcard"><div class="ava">${esc(u.name[0].toUpperCase())}</div><div><b style="font-size:18px">${esc(u.name)}</b><div style="opacity:.85;margin-top:3px">+${u.phone}</div></div></div>
  <div class="menu">
    <button id="mO">📦 <span>Buyurtmalarim</span> ›</button>
    <button id="mF">❤️ <span>Sevimlilar (${favs.length})</span> ›</button>
    <button id="mE">✏️ <span>Profilni tahrirlash</span> ›</button>
    <button class="out" id="mL">🚪 <span>Chiqish</span></button></div>
  <p style="text-align:center;color:var(--mu);font-size:12px;margin-top:18px">MarketDay v1.0</p>`;
  $("#mO").onclick = openOrders; $("#mF").onclick = () => go("favs"); $("#mE").onclick = openEdit;
  $("#mL").onclick = () => {
    me = null; store.set("md_session", null);
    $("#app").classList.add("hidden"); $("#auth").classList.remove("hidden");
    $("#loginForm").reset(); setAuthTab(false);
  };
}
