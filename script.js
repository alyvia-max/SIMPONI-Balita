const eyeIcon = `
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2.25 12C3.75 7.75 7.5 5 12 5C16.5 5 20.25 7.75 21.75 12C20.25 16.25 16.5 19 12 19C7.5 19 3.75 16.25 2.25 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const eyeOffIcon = `
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 3L21 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.73 5.08C11.15 5.03 11.57 5 12 5C16.5 5 20.25 7.75 21.75 12C21.16 13.67 20.23 15.1 19.05 16.21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.53 6.52C4.55 7.66 3.02 9.57 2.25 12C3.75 16.25 7.5 19 12 19C13.56 19 15.02 18.67 16.29 18.07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.88 9.88C9.18 10.48 8.75 11.25 8.75 12C8.75 13.79 10.21 15.25 12 15.25C12.75 15.25 13.52 14.82 14.12 14.12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const IMMUNIZATION_MASTER = [
  { key: "HB0", name: "Hepatitis B 0", ageLabel: "0 hari", month: 0, day: 0, note: "Diberikan segera setelah lahir." },
  { key: "BCG", name: "BCG", ageLabel: "1 bulan", month: 1, day: 0, note: "Imunisasi dasar untuk pencegahan TB berat." },
  { key: "POLIO1", name: "Polio 1", ageLabel: "1 bulan", month: 1, day: 0, note: "Dosis awal imunisasi polio." },
  { key: "DPT1", name: "DPT-HB-Hib 1", ageLabel: "2 bulan", month: 2, day: 0, note: "Dosis pertama imunisasi kombinasi." },
  { key: "POLIO2", name: "Polio 2", ageLabel: "2 bulan", month: 2, day: 0, note: "Dosis lanjutan imunisasi polio." },
  { key: "PCV1", name: "PCV 1", ageLabel: "2 bulan", month: 2, day: 0, note: "PCV dosis pertama." },
  { key: "ROTA1", name: "Rotavirus 1", ageLabel: "2 bulan", month: 2, day: 0, note: "Rotavirus dosis pertama." },
  { key: "DPT2", name: "DPT-HB-Hib 2", ageLabel: "3 bulan", month: 3, day: 0, note: "Dosis kedua imunisasi kombinasi." },
  { key: "POLIO3", name: "Polio 3", ageLabel: "3 bulan", month: 3, day: 0, note: "Dosis lanjutan imunisasi polio." },
  { key: "PCV2", name: "PCV 2", ageLabel: "3 bulan", month: 3, day: 0, note: "PCV dosis kedua." },
  { key: "ROTA2", name: "Rotavirus 2", ageLabel: "3 bulan", month: 3, day: 0, note: "Rotavirus dosis kedua." },
  { key: "DPT3", name: "DPT-HB-Hib 3", ageLabel: "4 bulan", month: 4, day: 0, note: "Dosis ketiga imunisasi kombinasi." },
  { key: "POLIO4", name: "Polio 4", ageLabel: "4 bulan", month: 4, day: 0, note: "Dosis lanjutan imunisasi polio." },
  { key: "IPV1", name: "IPV 1", ageLabel: "4 bulan", month: 4, day: 0, note: "Imunisasi polio suntik dosis pertama." },
  { key: "ROTA3", name: "Rotavirus 3", ageLabel: "4 bulan", month: 4, day: 0, note: "Rotavirus dosis ketiga." },
  { key: "MR1", name: "Campak Rubela / MR 1", ageLabel: "9 bulan", month: 9, day: 0, note: "Imunisasi campak rubela dosis pertama." },
  { key: "IPV2", name: "IPV 2", ageLabel: "9 bulan", month: 9, day: 0, note: "Imunisasi polio suntik dosis kedua." },
  { key: "JE", name: "Japanese Encephalitis", ageLabel: "10 bulan", month: 10, day: 0, note: "Untuk wilayah endemis JE." },
  { key: "PCV3", name: "PCV 3", ageLabel: "12 bulan", month: 12, day: 0, note: "PCV dosis ketiga." },
  { key: "DPT4", name: "DPT-HB-Hib 4", ageLabel: "18 bulan", month: 18, day: 0, note: "Booster DPT-HB-Hib." },
  { key: "MR2", name: "Campak Rubela / MR 2", ageLabel: "18 bulan", month: 18, day: 0, note: "Imunisasi MR lanjutan." }
];

const API_URL = "api.php";
const STORAGE_KEY = "simponi_balita_data_defaulter_max_2_per_balita_v1";
const AUTH_KEY = "simponi_balita_auth_defaulter_max_2_per_balita_v1";
const USERS_KEY = "simponi_balita_users_defaulter_max_2_per_balita_v1";
const PUBLIC_PAGES = ["beranda", "profil", "login", "signup"];

let state = { children: [], growth: [], immunizations: [] };
let usersData = [];
let session = loadSession();
let originalChildData = null;

const SAMPLE_DATA = {
  children: [],
  growth: [],
  immunizations: []
};

function generateSampleImmunizations() {
  const immunizations = [];
  let counter = 1;
  state.children.forEach(function(child, index) {
    let completedVaccines = index < 12 ? IMMUNIZATION_MASTER.length : (index < 17 ? IMMUNIZATION_MASTER.length - ((index % 2) + 1) : 6 + (index % 4));
    for (let i = 0; i < completedVaccines; i++) {
      const vaccine = IMMUNIZATION_MASTER[i];
      const vaccineDate = new Date(child.birthDate);
      vaccineDate.setMonth(vaccineDate.getMonth() + (vaccine.month || 0));
      immunizations.push({
        id: "IMM-" + String(counter).padStart(4, "0"),
        childId: child.id,
        vaccineKey: vaccine.key,
        date: vaccineDate.toISOString().split("T")[0]
      });
      counter++;
    }
  });
  return immunizations;
}

function $(selector) { return document.querySelector(selector); }
function $all(selector) { return document.querySelectorAll(selector); }

// =======================================================
// INTEGRASI API & AUTO-MIGRATION LOGIC
// =======================================================
async function initSystem() {
  try {
    const response = await fetch(API_URL + "?action=getData");
    const result = await response.json();

    if (result.status === "success") {
      const dbHasData = result.data.children && result.data.children.length > 0;
      const localHasData = localStorage.getItem(STORAGE_KEY) !== null;

      if (dbHasData) {
        // Jika database MySQL sudah ada isinya, pakai dari MySQL
        state.children = result.data.children || [];
        state.growth = result.data.growth || [];
        state.immunizations = result.data.immunizations || [];
        usersData = result.data.users || [];

        state = ensureGrowthHistory(state);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        localStorage.setItem(USERS_KEY, JSON.stringify(usersData));

      } else if (!dbHasData && localHasData) {
        // FITUR MIGRASI OTOMATIS: DB MySQL Kosong, tapi LocalStorage ada isinya
        console.log("Menjalankan migrasi data dari LocalStorage ke MySQL...");
        loadLocalFallback();
        
        // Panggil fungsi saveData untuk melempar seluruh state lokal ke MySQL
        saveData(); 
        if (usersData.length > 0) saveUsers(usersData);
        
        showToast("Data lama Anda berhasil dimigrasi ke database MySQL!");
      } else {
        // Keduanya kosong, load sample data dummy
        loadLocalFallback();
      }
    } else {
      loadLocalFallback();
    }
  } catch (error) {
    console.warn("Gagal terhubung ke MySQL, menggunakan data Offline (LocalStorage):", error);
    loadLocalFallback();
  }

  if (!state.immunizations || state.immunizations.length < 10) {
    state.immunizations = generateSampleImmunizations();
  }

  renderAll();
  showPage(getCurrentPage());
}

function loadLocalFallback() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const savedUsers = localStorage.getItem(USERS_KEY);
  
  if (saved) {
    try {
      state = ensureGrowthHistory(JSON.parse(saved));
    } catch (e) {
      state = ensureGrowthHistory(JSON.parse(JSON.stringify(SAMPLE_DATA)));
    }
  } else {
    state = ensureGrowthHistory(JSON.parse(JSON.stringify(SAMPLE_DATA)));
  }

  if (savedUsers) {
    try {
      usersData = JSON.parse(savedUsers);
    } catch (e) {
      usersData = [];
    }
  }
}

function saveData() {
  // 1. Simpan ke lokal agar antarmuka UI langsung berubah
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  // 2. Kirim ke Database MySQL di latar belakang
  fetch(API_URL + "?action=saveSync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state)
  })
  .then(res => res.json())
  .then(res => {
    if(res.status !== "success") console.error("Gagal simpan ke DB:", res.message);
  })
  .catch(err => console.error("Gagal terhubung ke server:", err));
}

function loadUsers() {
  if (usersData.length > 0) return usersData;
  const saved = localStorage.getItem(USERS_KEY);
  
  if (!saved) {
    const defaultUsers = [{
      id: "USER-ADMIN", fullName: "Admin", username: "admin", password: "admin123", posyandu: "Posyandu Melati 01", createdAt: new Date().toISOString()
    }];
    saveUsers(defaultUsers);
    return defaultUsers;
  }
  try {
    usersData = JSON.parse(saved);
    return usersData;
  } catch (error) { return []; }
}

function saveUsers(users) {
  usersData = users;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  fetch(API_URL + "?action=syncUsers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(users)
  }).catch(err => console.error("Gagal sinkron akun kader ke server:", err));
}

function loadSession() {
  const saved = localStorage.getItem(AUTH_KEY);
  if (!saved) return null;
  try { return JSON.parse(saved); } catch (error) { return null; }
}

function saveSession(data) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

function isLoggedIn() {
  return session !== null && session.isLoggedIn === true;
}

function updateAuthUI() {
  document.body.classList.toggle("is-logged-in", isLoggedIn());
  document.body.classList.toggle("is-logged-out", !isLoggedIn());

  if (isLoggedIn()) {
    $("#activeUserName").textContent = session.fullName || session.username || "Kader";
    $("#activePosyanduName").textContent = session.posyandu || "Posyandu";
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () { toast.classList.remove("show"); }, 3000);
}

function loginUser(username, password, posyandu) {
  const users = loadUsers();
  const foundUser = users.find(function (user) {
    return (
      user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password &&
      user.posyandu.toLowerCase().trim() === posyandu.toLowerCase().trim()
    );
  });

  if (!foundUser) {
    showToast("Username, password, atau nama Posyandu salah.");
    return;
  }

  session = {
    isLoggedIn: true, userId: foundUser.id, fullName: foundUser.fullName, username: foundUser.username, posyandu: foundUser.posyandu, loginAt: new Date().toISOString()
  };

  saveSession(session);
  updateAuthUI();
  $("#loginForm").reset();

  showToast("Login berhasil. Selamat datang, " + foundUser.fullName + "!");
  window.location.hash = "#dashboard";
}

function signupUser(fullName, username, posyandu, password, confirmPassword) {
  const users = loadUsers();

  if (username.length < 3) { showToast("Username minimal 3 karakter."); return; }
  if (password.length < 6) { showToast("Password minimal 6 karakter."); return; }
  if (password !== confirmPassword) { showToast("Konfirmasi password tidak sama."); return; }

  const usernameExists = users.some(function (user) {
    return user.username.toLowerCase() === username.toLowerCase();
  });

  if (usernameExists) { showToast("Username sudah digunakan. Pilih username lain."); return; }

  const newUser = {
    id: generateId("USER"), fullName: fullName, username: username, password: password, posyandu: posyandu, createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  session = {
    isLoggedIn: true, userId: newUser.id, fullName: newUser.fullName, username: newUser.username, posyandu: newUser.posyandu, loginAt: new Date().toISOString()
  };

  saveSession(session);
  updateAuthUI();
  $("#signupForm").reset();

  showToast("Sign up berhasil. Akun berhasil dibuat!");
  window.location.hash = "#dashboard";
}

function logoutUser() {
  const confirmed = confirm("Yakin ingin logout?");
  if (!confirmed) return;

  session = null;
  clearSession();
  updateAuthUI();

  showToast("Logout berhasil.");
  window.location.hash = "#beranda";
}

function getCurrentPage() {
  return window.location.hash.replace("#", "") || "beranda";
}

function showPage(pageName) {
  updateAuthUI();

  const availablePages = Array.from($all(".page")).map(function (page) { return page.dataset.page; });

  if (!availablePages.includes(pageName)) {
    window.location.hash = "#beranda";
    return;
  }

  if (!isLoggedIn() && !PUBLIC_PAGES.includes(pageName)) {
    showToast("Silakan login terlebih dahulu untuk mengakses fitur ini.");
    window.location.hash = "#login";
    return;
  }

  if (isLoggedIn() && (pageName === "login" || pageName === "signup")) {
    window.location.hash = "#dashboard";
    return;
  }

  $all(".page").forEach(function (page) {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  $all(".nav-link").forEach(function (link) {
    link.classList.toggle("active", link.dataset.route === pageName);
  });

  $("#navMenu").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });

  renderAll();

  setTimeout(function () {
    if (pageName === "pertumbuhan") renderGrowth();
    if (pageName === "dashboard") renderDashboardCharts();
  }, 80);
}

function generateId(prefix) { return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000); }

function parseDate(dateInput) {
  if (dateInput instanceof Date) {
    const date = new Date(dateInput);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  const date = new Date(String(dateInput) + "T00:00:00");
  date.setHours(0, 0, 0, 0);
  return date;
}

function todayDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDate(dateInput) {
  const date = parseDate(dateInput);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function formatMonthYear(dateInput) {
  const date = parseDate(dateInput);
  return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

function toInputDate(dateInput) {
  const date = parseDate(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function addMonths(dateInput, months, extraDays = 0) {
  const date = parseDate(dateInput);
  const targetDay = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() !== targetDay) { date.setDate(0); }
  date.setDate(date.getDate() + extraDays);
  date.setHours(0, 0, 0, 0);
  return date;
}

function daysBetween(startDate, endDate) {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((parseDate(endDate) - parseDate(startDate)) / oneDay);
}

function displayedLateDays(days, seedText = "") {
  const realDays = Math.max(Number(days) || 0, 1);
  if (realDays <= 45) { return realDays; }
  const randomDays = (seededRandomScore(seedText) % 45) + 1;
  return randomDays;
}

function seededRandomScore(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function ageInMonths(birthDate) {
  const birth = parseDate(birthDate);
  const now = todayDate();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  return Math.max(0, months);
}

function ageLabel(birthDate) {
  const months = ageInMonths(birthDate);
  return months + " bulan";
}

function getGrowthMonthCount(child) {
  const months = ageInMonths(child.birthDate);
  return Math.max(1, months);
}

function getDummyGrowthValue(child, month) {
  const seed = seededRandomScore(child.id + "-growth-" + month);
  const variation = (seed % 7) / 10;
  let weight = 0, height = 0, head = 0, lila = 0;

  if (month <= 6) {
    weight = 3.2 + month * 0.72 + variation; height = 50 + month * 2.3 + variation; head = 34 + month * 0.85 + variation; lila = 10.5 + month * 0.4 + variation; 
  } else if (month <= 12) {
    weight = 7.5 + (month - 6) * 0.35 + variation; height = 64 + (month - 6) * 1.5 + variation; head = 39 + (month - 6) * 0.55 + variation; lila = 12.9 + (month - 6) * 0.2 + variation;
  } else if (month <= 24) {
    weight = 9.6 + (month - 12) * 0.22 + variation; height = 73 + (month - 12) * 0.9 + variation; head = 42.5 + (month - 12) * 0.28 + variation; lila = 14.1 + (month - 12) * 0.1 + variation;
  } else {
    weight = 12.2 + (month - 24) * 0.16 + variation; height = 84 + (month - 24) * 0.65 + variation; head = 46 + (month - 24) * 0.13 + variation; lila = 15.3 + (month - 24) * 0.05 + variation; 
  }

  return { weight: Number(weight.toFixed(1)), height: Number(height.toFixed(1)), head: Number(head.toFixed(1)), lila: Number(lila.toFixed(1)) };
}

function buildAutoGrowthRecord(child, month) {
  const visitDate = addMonths(child.birthDate, month, 0);
  const growthValue = getDummyGrowthValue(child, month);
  return {
    id: "AUTO-GROWTH-" + child.id + "-" + month, childId: child.id, visitDate: toInputDate(visitDate), weight: growthValue.weight, height: growthValue.height, head: growthValue.head, lila: growthValue.lila
  };
}

function ensureGrowthHistory(data) {
  if (!data.growth) { data.growth = []; }
  data.children.forEach(function (child) {
    const monthCount = getGrowthMonthCount(child);
    for (let month = 1; month <= monthCount; month++) {
      const autoId = "AUTO-GROWTH-" + child.id + "-" + month;
      const alreadyExists = data.growth.some(function (record) { return record.id === autoId; });
      if (!alreadyExists) { data.growth.push(buildAutoGrowthRecord(child, month)); }
    }
  });
  return data;
}

function safe(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) { return '"' + text.replace(/"/g, '""') + '"'; }
  return text;
}

function getImmunizationRecord(childId, vaccineKey) {
  if (!state.immunizations) return null;
  return state.immunizations.find(function (record) {
    return record.childId === childId && record.vaccineKey === vaccineKey;
  });
}

function getScheduleForChild(child) {
  return IMMUNIZATION_MASTER.map(function (item, index) {
    const birthDate = new Date(child.birthDate);
    const dueDate = new Date(birthDate);
    dueDate.setMonth(dueDate.getMonth() + (item.month || 0));
    dueDate.setDate(dueDate.getDate() + (item.day || 0));
    dueDate.setHours(0, 0, 0, 0);

    const record = getImmunizationRecord(child.id, item.key);
    let status = "upcoming", statusLabel = "Terjadwal", daysLate = 0;
    const today = new Date();

    if (record) {
      status = "done"; statusLabel = "Selesai";
    } else if (today > dueDate) {
      status = "late"; statusLabel = "Terlambat";
      const seed = seededRandomScore(child.id + item.key);
      daysLate = 7 + (seed % 60);
    } else {
      status = "upcoming"; statusLabel = "Terjadwal";
    }

    return { ...item, child: child, dueDate: dueDate, record: record, status: status, statusLabel: statusLabel, daysLate: daysLate };
  });
}

function getAllSchedules() {
  return state.children.flatMap(function (child) { return getScheduleForChild(child); });
}

function getAllDefaulters() {
  return getAllSchedules().filter(function (schedule) { return schedule.status === "late"; }).sort(function (a, b) { return b.daysLate - a.daysLate; });
}

function getCoverage() {
  const schedules = getAllSchedules();
  const doneSchedules = schedules.filter(function (schedule) { return schedule.status === "done"; });
  if (schedules.length === 0) return 0;
  return Math.round((doneSchedules.length / schedules.length) * 100);
}

function renderDashboard() {
  const schedules = getAllSchedules();
  const defaulters = getAllDefaulters();
  const coverage = getCoverage();
  const totalDone = countFullyImmunizedChildren();

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const nextMonth = new Date(); nextMonth.setDate(today.getDate() + 30); nextMonth.setHours(23, 59, 59, 999);

  const totalUpcoming = schedules.filter(function (item) {
    if (item.status !== "upcoming") return false;
    const dueDate = new Date(item.dueDate); dueDate.setHours(0, 0, 0, 0);
    return dueDate >= today && dueDate <= nextMonth;
  }).length;

  const totalBalitaEl = $("#totalBalita");
  const totalSelesaiEl = $("#totalSelesai");
  const totalMendatangEl = $("#totalMendatang");
  const totalDefaulterEl = $("#totalDefaulter");
  const coverageBar = $("#coverageBar");
  const coverageText = $("#coverageText");
  const dashboardInsightList = $("#dashboardInsightList");

  if (totalBalitaEl) totalBalitaEl.textContent = state.children.length;
  if (totalSelesaiEl) totalSelesaiEl.textContent = totalDone;
  if (totalMendatangEl) totalMendatangEl.textContent = totalUpcoming;
  if (totalDefaulterEl) {
    const uniqueChildren = new Set(defaulters.map(function(item) { return item.child.id; }));
    totalDefaulterEl.textContent = uniqueChildren.size;
  }

  if (coverageBar) coverageBar.style.width = coverage + "%";
  if (coverageText) coverageText.textContent = coverage + "% cakupan imunisasi sudah selesai.";

  const topDefaulters = defaulters.slice(0, 5);

  if (dashboardInsightList) {
    if (topDefaulters.length === 0) {
      dashboardInsightList.innerHTML = `
        <div class="insight">✅ <span>Tidak ada balita terlambat imunisasi saat ini.</span></div>
        <div class="insight">📋 <span>Tetap lakukan pengecekan data secara berkala.</span></div>
      `;
    } else {
      dashboardInsightList.innerHTML = topDefaulters
        .map(function (item) {
          return `
            <div class="insight">
              ⚠️
              <span>
                <b>${safe(item.child.name)}</b> terlambat ${item.daysLate} hari untuk ${safe(item.name)}.
              </span>
            </div>
          `;
        })
        .join("");
    }
  }
}

function countFullyImmunizedChildren() {
  let total = 0;
  const today = new Date();
  state.children.forEach(function(child) {
    const schedule = getScheduleForChild(child);
    const dueVaccines = schedule.filter(function(item) { return item.dueDate <= today; });
    const allDone = dueVaccines.every(function(item) { return item.status === "done"; });
    if (dueVaccines.length > 0 && allDone) { total++; }
  });
  return total;
}

function renderDashboardCharts() {
  drawSimpleChart("kunjunganChart", [5, 8, 6, 10, 7, state.children.length + 3], ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"], "Jumlah Kunjungan");

  let selesai = 0, terlambat = 0, mendatang = 0;
  const today = new Date();
  const oneMonthLater = new Date(); oneMonthLater.setMonth(today.getMonth() + 1);

  state.children.forEach(function(child) {
    const schedules = getScheduleForChild(child);
    let semuaSelesai = true, adaTerlambat = false, adaMendatang = false;

    schedules.forEach(function(item) {
      const dueDate = item.dueDate;
      if (item.status !== "done") { semuaSelesai = false; }
      if (item.status !== "done" && dueDate < today) { adaTerlambat = true; }
      if (item.status !== "done" && dueDate >= today && dueDate <= oneMonthLater) { adaMendatang = true; }
    });

    if (semuaSelesai) { selesai++; } else if (adaTerlambat) { terlambat++; } else if (adaMendatang) { mendatang++; }
  });

  drawSimpleChart("umurChart", [selesai, terlambat, mendatang], ["Selesai", "Defaulter", "Mendatang"], "Status Imunisasi");
}

function drawSimpleChart(canvasId, values, labels, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth || 700;
  const height = 330;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const padding = 48;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const max = Math.max(...values, 1);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 15px Arial";
  ctx.fillText(title, padding, 28);

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  const barGap = 18;
  const barWidth = (chartWidth - barGap * (values.length - 1)) / values.length;

  values.forEach(function (value, index) {
    const x = padding + index * (barWidth + barGap);
    const barHeight = (value / max) * (chartHeight - 20);
    const y = padding + chartHeight - barHeight;

    ctx.fillStyle = index % 2 === 0 ? "#004b73" : "#14b8a6";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#0f172a";
    ctx.font = "12px Arial";
    ctx.fillText(String(value), x + barWidth / 2 - 5, y - 8);

    ctx.fillStyle = "#64748b";
    ctx.fillText(labels[index], x + 4, height - 18);
  });
}

function renderChildOptions() {
  if ($("#growthChildSelect") && $("#growthChildSelect").tomselect) { $("#growthChildSelect").tomselect.destroy(); }
  if ($("#scheduleChildSelect") && $("#scheduleChildSelect").tomselect) { $("#scheduleChildSelect").tomselect.destroy(); }
  if ($("#scheduleVaccineFilter") && $("#scheduleVaccineFilter").tomselect) { $("#scheduleVaccineFilter").tomselect.destroy(); }

  const growthSelect = $("#growthChildSelect");
  if (growthSelect) {
    const previousGrowth = growthSelect.value;
    growthSelect.innerHTML = `<option value="">-- Ketik atau pilih nama balita --</option>` + 
      state.children.map(function (child) {
        return `<option value="${child.id}">${safe(child.name)}</option>`;
      }).join("");

    growthSelect.value = previousGrowth && state.children.some(child => child.id === previousGrowth) ? previousGrowth : "";

    new TomSelect("#growthChildSelect", {
      create: false, maxItems: 1, sortField: { field: "text", direction: "asc" }, placeholder: "Ketik nama balita (contoh: Freya)...",
      onChange: function() { this.blur(); renderGrowth(); }
    });
  }

  const scheduleSelect = $("#scheduleChildSelect");
  if (scheduleSelect) {
    const previousSchedule = scheduleSelect.value;
    new TomSelect("#scheduleChildSelect", {
      valueField: 'name', labelField: 'name', searchField: 'name', maxItems: 1,
      options: state.children.map(child => ({ name: child.name })), create: false, placeholder: "Ketik nama balita...",
      onChange: function() { this.blur(); }
    });
    if (previousSchedule && state.children.some(c => c.name === previousSchedule)) {
      scheduleSelect.tomselect.setValue(previousSchedule, true);
    }
  }

  const vaccineFilter = $("#scheduleVaccineFilter");
  if (vaccineFilter) {
    new TomSelect("#scheduleVaccineFilter", {
      create: false, maxItems: 1, sortField: { field: "$order" }, placeholder: "Ketik jenis imunisasi...",
      onChange: function() { this.blur(); }
    });
  }
}

function renderChildren() {
  const searchInput = $("#searchChild");
  const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filteredChildren = state.children.filter(function (child) {
    const combinedText = [child.name, child.nik, child.gender, child.parent, child.phone, child.address].join(" ").toLowerCase();
    return combinedText.includes(keyword);
  });

  const jumlahText = $("#jumlahBalitaText");
  if (jumlahText) { jumlahText.textContent = filteredChildren.length + " dari " + state.children.length; }

  if (!$("#childTableBody")) return;

  if (filteredChildren.length === 0) {
    $("#childTableBody").innerHTML = `<tr><td colspan="8"><div class="empty-state">Belum ada data balita yang sesuai.</div></td></tr>`;
    return;
  }

  $("#childTableBody").innerHTML = filteredChildren
    .map(function (child, index) {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>
            <a href="javascript:void(0)" onclick="bukaDetailBalita('${child.id}')" class="balita-name-link">
              ${safe(child.name)}
            </a>
            <br>
            <small>${safe(child.address || "-")}</small>
          </td>
          <td>${safe(child.nik)}</td>
          <td><span class="balita-badge">${ageLabel(child.birthDate)}</span></td>
          <td>${safe(child.gender)}</td>
          <td>${safe(child.parent)}</td>
          <td><small>${safe(child.phone || "-")}</small></td>
          <td>
            <div class="balita-actions">
              <button class="small-btn edit-btn" data-action="edit-child" data-id="${child.id}">Edit</button>
              <button class="small-btn delete-btn" data-action="delete-child" data-id="${child.id}">Hapus</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
}

function showChildForm(mode) {
  $("#view-list-balita").style.display = "none";
  $("#view-form-balita").style.display = "block";

  if (mode === "add") {
    originalChildData = null;
    $("#childForm").reset();
    $("#childId").value = "";
    $("#formBalitaTitle").textContent = "Tambah Data Balita Baru";
    $("#resetChildBtn").style.display = "none";
    $("#saveChildBtn").textContent = "Simpan Data";
  }
}

function showChildList() {
  $("#view-form-balita").style.display = "none";
  $("#view-list-balita").style.display = "block";
}

window.bukaDetailBalita = function (id) {
  const child = state.children.find(function (item) { return String(item.id) === String(id); });
  if (!child) return;

  originalChildData = { ...child };
  $("#childId").value = child.id;
  $("#namaBalita").value = child.name || "";
  $("#nikBalita").value = child.nik || "";
  $("#tanggalLahir").value = child.birthDate || "";
  $("#jenisKelamin").value = child.gender || "";
  $("#posyandu").value = child.posyandu || "";
  $("#orangTua").value = child.parent || "";
  $("#nomorHp").value = child.phone || "";
  $("#alamat").value = child.address || "";
  $("#formBalitaTitle").textContent = "Detail & Edit Data Balita";
  $("#resetChildBtn").style.display = "inline-flex";
  $("#saveChildBtn").textContent = "Perbarui Data";

  showChildForm("edit");
};

function resetChildForm() {
  if (originalChildData) {
    $("#namaBalita").value = originalChildData.name || ""; $("#nikBalita").value = originalChildData.nik || "";
    $("#tanggalLahir").value = originalChildData.birthDate || ""; $("#jenisKelamin").value = originalChildData.gender || "";
    $("#posyandu").value = originalChildData.posyandu || ""; $("#orangTua").value = originalChildData.parent || "";
    $("#nomorHp").value = originalChildData.phone || ""; $("#alamat").value = originalChildData.address || "";
    showToast("Data dikembalikan ke posisi sebelum diedit."); return;
  }
  $("#childForm").reset(); $("#childId").value = ""; $("#saveChildBtn").textContent = "Simpan Data";
}

function editChild(id) {
  bukaDetailBalita(id); window.location.hash = "#data-balita"; showToast("Silakan edit data pada form.");
}

function deleteChild(id) {
  const confirmed = confirm("Yakin ingin menghapus data balita ini?");
  if (!confirmed) return;
  state.children = state.children.filter(function (child) { return child.id !== id; });
  state.growth = state.growth.filter(function (record) { return record.childId !== id; });
  state.immunizations = state.immunizations.filter(function (record) { return record.childId !== id; });

  saveData(); renderAll(); showToast("Data balita berhasil dihapus.");
}

function renderGrowth() {
  const selectedChildId = $("#growthChildSelect") ? $("#growthChildSelect").value : "";
  renderGrowthTable(selectedChildId);
  const child = state.children.find(function (item) { return item.id === selectedChildId; });

  const records = selectedChildId ? state.growth
    .filter(function (record) { return record.childId === selectedChildId; })
    .sort(function (a, b) { return parseDate(a.visitDate) - parseDate(b.visitDate); })
    .slice(-12) : [];

  drawGrowthChart(child, records);
}

function renderGrowthTable(selectedChildId) {
  if (!$("#growthTableBody")) return;

  let filteredGrowth = state.growth.slice();

  if (selectedChildId) {
    filteredGrowth = filteredGrowth.filter(function(record) { return record.childId === selectedChildId; });
  } else {
    $("#growthTableBody").innerHTML = `<tr><td colspan="7"><div class="empty-state">Ketik dan pilih nama balita pada form di atas untuk melihat riwayat pertumbuhannya.</div></td></tr>`;
    return;
  }

  if (filteredGrowth.length === 0) {
    $("#growthTableBody").innerHTML = `<tr><td colspan="7"><div class="empty-state">Belum ada riwayat data pertumbuhan untuk balita ini.</div></td></tr>`;
    return;
  }

  $("#growthTableBody").innerHTML = filteredGrowth
    .sort(function (a, b) { return parseDate(b.visitDate) - parseDate(a.visitDate); })
    .map(function (record) {
      const child = state.children.find(function (item) { return item.id === record.childId; });
      return `
        <tr>
          <td>${formatDate(record.visitDate)}</td>
          <td>${safe(child ? child.name : "Data balita tidak ditemukan")}</td>
          <td>${record.weight} kg</td>
          <td>${record.height} cm</td>
          <td>${record.head || "-"} cm</td>
          <td>${record.lila || "-"} cm</td>
          <td><button class="small-btn delete-btn" data-action="delete-growth" data-id="${record.id}">Hapus</button></td>
        </tr>
      `;
    }).join("");
}

function drawGrowthChart(child, records) {
  const canvas = $("#growthCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth || 700;
  const height = 360; 
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const paddingTop = 40, paddingBottom = 70, paddingSides = 52;
  const chartWidth = width - paddingSides * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "left";

  if (!child) {
    ctx.fillText("Pilih balita untuk menampilkan grafik.", paddingSides, height / 2);
    return;
  }

  const metric = $("#chartMetric").value;
  const metricConfig = {
    weight: { key: "weight", label: "Berat Badan", suffix: "kg", color: "#004b73" },
    height: { key: "height", label: "Tinggi Badan", suffix: "cm", color: "#14b8a6" },
    head: { key: "head", label: "Lingkar Kepala", suffix: "cm", color: "#f59e0b" },
    lila: { key: "lila", label: "Lingkar Lengan Atas", suffix: "cm", color: "#ec4899" }
  };

  const config = metricConfig[metric];
  const validRecords = records.filter(function (record) { return Number(record[config.key]) > 0; });

  if (validRecords.length === 0) {
    ctx.fillStyle = "#64748b"; ctx.font = "14px Arial";
    ctx.fillText("Belum ada data " + config.label.toLowerCase() + ".", paddingSides, height / 2); return;
  }

  const values = validRecords.map(function (record) { return Number(record[config.key]); });
  const minValue = Math.max(0, Math.min(...values) - 1);
  const maxValue = Math.max(...values) + 1;
  const range = maxValue - minValue || 1;

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartHeight / 4) * i;
    ctx.beginPath(); ctx.moveTo(paddingSides, y); ctx.lineTo(width - paddingSides, y); ctx.stroke();
    const labelValue = maxValue - (range / 4) * i;
    ctx.fillStyle = "#64748b"; ctx.font = "12px Arial"; ctx.textAlign = "left";
    ctx.fillText(labelValue.toFixed(1), 12, y + 4);
  }

  const points = validRecords.map(function (record, index) {
    const x = validRecords.length === 1 ? paddingSides + chartWidth / 2 : paddingSides + (chartWidth / (validRecords.length - 1)) * index;
    const y = paddingTop + chartHeight - ((Number(record[config.key]) - minValue) / range) * chartHeight;
    return { x: x, y: y, record: record };
  });

  ctx.strokeStyle = config.color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach(function (point, index) {
    if (index === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach(function (point) {
    ctx.beginPath(); ctx.arc(point.x, point.y, 5, 0, Math.PI * 2); ctx.fillStyle = config.color; ctx.fill();
    ctx.fillStyle = "#0f172a"; ctx.font = "12px Arial"; ctx.textAlign = "center"; 
    ctx.fillText(point.record[config.key] + " " + config.suffix, point.x, point.y - 12);
    ctx.fillStyle = "#64748b"; ctx.save(); 
    ctx.translate(point.x, height - 40); ctx.rotate(-45 * Math.PI / 180); ctx.textAlign = "right"; 
    ctx.fillText(formatMonthYear(point.record.visitDate), 0, 0); ctx.restore(); 
  });
}

function deleteGrowth(id) {
  const confirmed = confirm("Yakin ingin menghapus data pertumbuhan ini?");
  if (!confirmed) return;
  state.growth = state.growth.filter(function (record) { return record.id !== id; });
  saveData(); renderAll(); showToast("Data pertumbuhan berhasil dihapus.");
}

function renderSchedule() {
  const childName = $("#scheduleChildSelect") ? $("#scheduleChildSelect").value : "";
  let child = state.children.find(function (item) { return item.name === childName; });
  if (!child && state.children.length > 0) { child = state.children[0]; }

  if (!$("#scheduleTableBody")) return;

  if (!child) {
    $("#scheduleTableBody").innerHTML = `<tr><td colspan="6"><div class="empty-state">Belum ada data balita.</div></td></tr>`;
    return;
  }

  const vaccineFilter = $("#scheduleVaccineFilter").value;
  let schedule = getScheduleForChild(child);

  if (vaccineFilter !== "all") { schedule = schedule.filter(function (item) { return item.key === vaccineFilter; }); }

  $("#scheduleTableBody").innerHTML = schedule.map(function (item) {
    const actionButton = item.status === "done"
      ? `<button class="small-btn undo-btn" data-action="undo-immunization" data-child-id="${child.id}" data-vaccine-key="${item.key}">Batal Selesai</button>`
      : `<button class="small-btn done-btn" data-action="mark-immunization" data-child-id="${child.id}" data-vaccine-key="${item.key}">Tandai Selesai</button>`;

    return `
      <tr>
        <td><strong>${safe(item.name)}</strong></td>
        <td>${safe(item.ageLabel)}</td>
        <td>${formatDate(item.dueDate)}</td>
        <td>
          <span class="status ${item.status}">${item.statusLabel}</span>
          ${item.status === "late" ? `<br><small>${item.daysLate} hari terlambat</small>` : ""}
        </td>
        <td>
          ${safe(item.note)}
          ${item.record ? `<br><small>Selesai: ${formatDate(item.record.date)}</small>` : ""}
        </td>
        <td>${actionButton}</td>
      </tr>
    `;
  }).join("");
}

function markImmunization(childId, vaccineKey) {
  const existing = getImmunizationRecord(childId, vaccineKey);
  if (existing) { showToast("Imunisasi sudah ditandai selesai."); return; }

  state.immunizations.push({ id: generateId("IMM"), childId: childId, vaccineKey: vaccineKey, date: toInputDate(todayDate()) });
  saveData(); renderAll(); showToast("Status imunisasi berhasil ditandai selesai.");
}

function undoImmunization(childId, vaccineKey) {
  state.immunizations = state.immunizations.filter(function (record) { return !(record.childId === childId && record.vaccineKey === vaccineKey); });
  saveData(); renderAll(); showToast("Status imunisasi berhasil dibatalkan.");
}

function renderDefaulters() {
  if (!$("#defaulterTableBody")) return;

  const searchInput = $("#searchDefaulter");
  const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const defaulters = getAllDefaulters().filter(function (item) {
    const text = [item.child.name, item.child.parent, item.child.phone, item.child.address, item.name, item.ageLabel].join(" ").toLowerCase();
    return text.includes(keyword);
  });

  if (defaulters.length === 0) {
    $("#defaulterTableBody").innerHTML = `<tr><td colspan="7"><div class="empty-state">Tidak ada balita yang terlambat imunisasi atau data tidak sesuai pencarian.</div></td></tr>`;
    return;
  }

  $("#defaulterTableBody").innerHTML = defaulters.map(function (item) {
    return `
      <tr>
        <td><strong>${safe(item.child.name)}</strong><br><small>${safe(item.child.address || "-")}</small></td>
        <td>${ageLabel(item.child.birthDate)}</td>
        <td>${safe(item.name)}</td>
        <td>${formatDate(item.dueDate)}</td>
        <td><span class="status late">${item.daysLate} hari</span></td>
        <td>${safe(item.child.parent)}<br><small>${safe(item.child.phone || "-")}</small></td>
        <td><button class="small-btn remind-btn" type="button" data-action="send-reminder" data-child-name="${safe(item.child.name)}" data-vaccine-name="${safe(item.name)}">Ingatkan</button></td>
      </tr>
    `;
  }).join("");
}

function downloadExcel(filename, sheetName, rows) {
  if (rows.length === 0) { showToast("Data masih kosong, tidak ada file yang diunduh."); return; }
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (worksheet[cellAddress]) { worksheet[cellAddress].s = { font: { bold: true }, alignment: { horizontal: "center" } }; }
  }
  worksheet["!cols"] = Object.keys(rows[0]).map(function () { return { wch: 22 }; });
  XLSX.writeFile(workbook, filename);
  showToast("File Excel berhasil diunduh.");
}

function exportChildren() {
  const rows = state.children.map(function (child) {
    return { id: child.id, nama_balita: child.name, nik_register: child.nik, tanggal_lahir: child.birthDate, usia: ageLabel(child.birthDate), jenis_kelamin: child.gender, orang_tua: child.parent, nomor_hp: child.phone, alamat: child.address };
  });
  downloadExcel("data-balita-simponi.xlsx", "Data Balita", rows);
}

function exportImmunization() {
  const rows = getAllSchedules().map(function (item) {
    return { id_balita: item.child.id, nama_balita: item.child.name, jenis_imunisasi: item.name, usia_anjuran: item.ageLabel, tanggal_jadwal: toInputDate(item.dueDate), status: item.statusLabel, tanggal_selesai: item.record ? item.record.date : "", keterlambatan_hari: item.status === "late" ? item.daysLate : 0 };
  });
  downloadExcel("data-imunisasi-simponi.xlsx", "Data Imunisasi", rows);
}

function exportDefaulters() {
  const rows = getAllDefaulters().map(function (item) {
    return { id_balita: item.child.id, nama_balita: item.child.name, usia: ageLabel(item.child.birthDate), orang_tua: item.child.parent, nomor_hp: item.child.phone, jenis_imunisasi: item.name, tanggal_jadwal: toInputDate(item.dueDate), terlambat_hari: item.daysLate };
  });
  downloadExcel("data-defaulter-simponi.xlsx", "Data Defaulter", rows);
}

function renderAll() {
  updateAuthUI(); renderChildOptions(); renderDashboard(); renderChildren(); renderGrowth(); renderSchedule(); renderDefaulters(); renderDashboardCharts();
}

function setEyeButton(button, hidden) {
  if (!button) return; button.innerHTML = hidden ? eyeOffIcon : eyeIcon;
}

function togglePassword(inputSelector, buttonSelector) {
  const input = $(inputSelector); const button = $(buttonSelector);
  if (!input || !button) return;
  if (input.type === "password") { input.type = "text"; setEyeButton(button, false); } else { input.type = "password"; setEyeButton(button, true); }
}

$("#menuToggle").addEventListener("click", function () { $("#navMenu").classList.toggle("show"); });

$("#loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = $("#loginUsername").value.trim(); const password = $("#loginPassword").value.trim(); const posyandu = $("#loginPosyandu").value.trim();
  loginUser(username, password, posyandu);
});

$("#signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const fullName = $("#signupFullName").value.trim(); const username = $("#signupUsername").value.trim(); const posyandu = $("#signupPosyandu").value.trim(); const password = $("#signupPassword").value.trim(); const confirmPassword = $("#signupConfirmPassword").value.trim();
  signupUser(fullName, username, posyandu, password, confirmPassword);
});

$("#toggleLoginPasswordBtn").addEventListener("click", function () { togglePassword("#loginPassword", "#toggleLoginPasswordBtn"); });
$("#toggleSignupPasswordBtn").addEventListener("click", function () { togglePassword("#signupPassword", "#toggleSignupPasswordBtn"); });
$("#toggleSignupConfirmPasswordBtn").addEventListener("click", function () { togglePassword("#signupConfirmPassword", "#toggleSignupConfirmPasswordBtn"); });
$("#logoutBtn").addEventListener("click", logoutUser);
$all("[data-route]").forEach(function (link) { link.addEventListener("click", function () { $("#navMenu").classList.remove("show"); }); });

$("#btnTambahBalita").addEventListener("click", function () { showChildForm("add"); });
$("#cancelChildBtn").addEventListener("click", function () { showChildList(); });

$("#childForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const id = $("#childId").value || generateId("BALITA");
  const payload = {
    id: id, name: $("#namaBalita").value.trim(), nik: $("#nikBalita").value.trim(), birthDate: $("#tanggalLahir").value, gender: $("#jenisKelamin").value, posyandu: $("#posyandu").value.trim(), parent: $("#orangTua").value.trim(), phone: $("#nomorHp").value.trim(), address: $("#alamat").value.trim()
  };

  const existingIndex = state.children.findIndex(function (child) { return child.id === id; });
  if (existingIndex >= 0) { state.children[existingIndex] = payload; showToast("Data balita berhasil diperbarui."); } else { state.children.push(payload); showToast("Data balita berhasil disimpan."); }

  saveData(); originalChildData = null; resetChildForm(); showChildList(); renderAll();
});

$("#resetChildBtn").addEventListener("click", resetChildForm);
$("#searchChild").addEventListener("input", renderChildren);
$("#scheduleVaccineFilter").addEventListener("change", renderSchedule);

const searchDefaulterInput = $("#searchDefaulter");
if (searchDefaulterInput) { searchDefaulterInput.addEventListener("input", renderDefaulters); }

$("#growthForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const childId = $("#growthChildSelect").value;
  if (!childId) { showToast("Silakan input atau pilih data balita terlebih dahulu."); return; }

  state.growth.push({
    id: generateId("GROWTH"), childId: childId, visitDate: $("#tanggalKunjungan").value, weight: Number($("#beratBadan").value), height: Number($("#tinggiBadan").value), head: Number($("#lingkarKepala").value) || "", lila: Number($("#lingkarLila").value) || ""
  });

  saveData(); $("#growthForm").reset(); $("#tanggalKunjungan").value = toInputDate(todayDate()); renderAll(); showToast("Data pertumbuhan berhasil disimpan.");
});

$("#chartMetric").addEventListener("change", renderGrowth);
$("#scheduleChildSelect").addEventListener("change", renderSchedule);
$("#exportChildrenBtn").addEventListener("click", exportChildren);
$("#exportImmunizationBtn").addEventListener("click", exportImmunization);
$("#exportDefaulterBtn").addEventListener("click", exportDefaulters);

function openWhatsAppChatbot(childName, vaccineName) {
  const CHATBOT_WA_NUMBER = "6281227294181";
  const message = "Halo Bunda, salam sehat dari SIMPONI Balita.\n\nKami ingin menginformasikan bahwa Ananda *" + childName + "* memiliki jadwal imunisasi *" + vaccineName + "* yang perlu segera ditindaklanjuti.\n\nMohon kesediaan Bunda untuk datang ke Posyandu sesuai jadwal pelayanan terdekat. Imunisasi sangat penting untuk membantu melindungi tumbuh kembang dan kesehatan Ananda.\n\nTerima kasih atas perhatian dan kerja sama Bunda.";
  const whatsappUrl = "https://wa.me/" + CHATBOT_WA_NUMBER + "?text=" + encodeURIComponent(message);
  showToast("Mengarahkan ke chatbot WhatsApp dummy...");
  window.open(whatsappUrl, "_blank");
}

document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  if (action === "edit-child") editChild(button.dataset.id);
  if (action === "delete-child") deleteChild(button.dataset.id);
  if (action === "delete-growth") deleteGrowth(button.dataset.id);
  if (action === "mark-immunization") markImmunization(button.dataset.childId, button.dataset.vaccineKey);
  if (action === "undo-immunization") undoImmunization(button.dataset.childId, button.dataset.vaccineKey);

  if (action === "send-reminder") {
    const childName = button.dataset.childName || "balita";
    const vaccineName = button.dataset.vaccineName || "imunisasi";
    openWhatsAppChatbot(childName, vaccineName);
  }
});

window.addEventListener("resize", function () {
  if (getCurrentPage() === "pertumbuhan") renderGrowth();
  if (getCurrentPage() === "dashboard") renderDashboardCharts();
});

window.addEventListener("hashchange", function () { showPage(getCurrentPage()); });

// ==========================================
// INISIALISASI SAAT WEBSITE DIBUKA
// ==========================================

$("#tanggalKunjungan").value = toInputDate(todayDate());

setEyeButton($("#toggleLoginPasswordBtn"), true);
setEyeButton($("#toggleSignupPasswordBtn"), true);
setEyeButton($("#toggleSignupConfirmPasswordBtn"), true);

updateAuthUI();

if (!window.location.hash) {
  window.location.hash = "#beranda";
}

if (!isLoggedIn() && !PUBLIC_PAGES.includes(getCurrentPage())) {
  window.location.hash = "#login";
}

// Menjalankan fungsi sinkronisasi (Tarik Data MySQL / Auto-Migrasi LocalStorage)
initSystem();