const STORAGE_KEY = "metrics-gestione-v6";
const REMOTE_STATE_ID = "main";
const REMOTE_TABLE = "metrics_app_state";
const AUDIT_TABLE = "metrics_audit_log";

const baseData = {
  settings: {
    fabioRate: 40,
    fregoRate: 40,
    jessicaRate: 0,
    jessicaClosedClientCost: 200,
    fabioCapacity: 100,
    fregoCapacity: 60,
    jessicaCapacity: 40,
    targetMargin: 45,
    taxCoefficient: 0.78,
    inpsRate: 26.07,
  },
  people: ["Fabio", "Frego", "Jessica"],
  delegations: ["Non delegabile", "Delegabile subito", "Delegabile con procedura", "Delegabile in futuro"],
  frequencies: ["Una tantum", "Giornaliera", "Settimanale", "Mensile", "Variabile"],
  clients: [
    {
      name: "Startupdata",
      status: "Attivo",
      type: "Strategico / caso studio",
      reason: "Validazione servizio + caso studio",
      service: "Full Stack Acquisition System",
      monthlyFee: 1500,
      adsBudget: 500,
      monthlyExtra: 0,
      oneTimeExtra: 0,
      variable: 0,
      renewalStatus: "Da decidere",
      activeMonths: 4,
    },
    {
      name: "Mirko / Evolution",
      status: "Attivo",
      type: "Strategico / caso studio",
      reason: "Validazione multicanale + relazione importante",
      service: "Outreach multicanale LK + Email + WA",
      monthlyFee: 700,
      adsBudget: 0,
      monthlyExtra: 0,
      oneTimeExtra: 0,
      variable: 0,
      renewalStatus: "Da decidere",
      activeMonths: 4,
    },
  ],
  activities: [
    ["Startupdata", "Setup iniziale", "Strategia", "Strategia sistema appuntamenti e target", "Fabio", "Fabio", "Alta", "Non delegabile", "Si", "Mensile", 0, 0, 0],
    ["Startupdata", "Setup iniziale", "LinkedIn", "Impostazione automazione richieste collegamento", "Fabio", "Fabio", "Alta", "Non delegabile", "Si", "Mensile", 0, 0, 0],
    ["Startupdata", "Delivery mensile", "LinkedIn", "Controllo automazione LinkedIn", "Fabio", "Fabio", "Alta", "Delegabile in futuro", "Si", "Settimanale", 20, 4, 0],
    ["Startupdata", "Delivery mensile", "LinkedIn", "Risposte ai messaggi LinkedIn in entrata", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Giornaliera", 30, 22, 0],
    ["Startupdata", "Delivery mensile", "LinkedIn", "Qualifica conversazioni LinkedIn", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Giornaliera", 20, 22, 0],
    ["Startupdata", "Delivery mensile", "LinkedIn", "Fissaggio appuntamenti da LinkedIn", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Settimanale", 45, 4, 0],
    ["Startupdata", "Delivery mensile", "CRM", "Aggiornamento CRM LinkedIn/appuntamenti", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Settimanale", 45, 4, 0],
    ["Startupdata", "Delivery mensile", "Follow-up", "Follow-up post call", "Jessica", "Jessica", "Alta", "Delegabile subito", "Si", "Settimanale", 60, 4, 0],
    ["Startupdata", "Delivery mensile", "Creativita", "Ricerca angle e messaggi per campagne Startupdata", "Fabio", "Fabio", "Alta", "Non delegabile", "Si", "Mensile", 120, 1, 0],
    ["Startupdata", "Delivery mensile", "Creativita", "Scrittura copy creativita e varianti messaggi", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Mensile", 90, 1, 0],
    ["Startupdata", "Delivery mensile", "Creativita", "Brief e revisione creativita per advertising", "Fabio", "Frego", "Media", "Delegabile in futuro", "Si", "Settimanale", 45, 4, 0],
    ["Startupdata", "Delivery mensile", "Creativita", "Archivio insight e aggiornamento libreria creativa", "Jessica", "Jessica", "Media", "Delegabile subito", "Si", "Settimanale", 30, 4, 0],
    ["Mirko / Evolution", "Delivery mensile", "Email", "Preparazione liste e sequenze email", "Fabio", "Frego", "Alta", "Delegabile con procedura", "Si", "Mensile", 0, 0, 16],
    ["Mirko / Evolution", "Delivery mensile", "LinkedIn", "Gestione conversazioni e follow-up", "Fabio", "Jessica", "Alta", "Delegabile con procedura", "Si", "Giornaliera", 25, 22, 0],
    ["Mirko / Evolution", "Delivery mensile", "CRM", "Pulizia CRM e aggiornamento stato lead", "Fabio", "Jessica", "Media", "Delegabile subito", "Si", "Settimanale", 40, 4, 0],
  ].map(activityFromRow),
  costs: [
    { name: "Tool LinkedIn Startupdata", category: "Tool cliente", project: "Startupdata", type: "Dedicato", frequency: "Mensile", amount: 45, impacts: "Si", notes: "Costo operativo Metrics su Startupdata" },
    { name: "Tool email quota Mirko", category: "Tool cliente", project: "Mirko / Evolution", type: "Condiviso", frequency: "Mensile", amount: 10.42, impacts: "Si", notes: "Quota provvisoria email" },
    { name: "Tool email quota Acquisizione Metrics", category: "Acquisizione Metrics", project: "Acquisizione Metrics", type: "Condiviso", frequency: "Mensile", amount: 10.42, impacts: "Si", notes: "Quota provvisoria email" },
    { name: "Taqtic", category: "Costi personali Fabio", project: "Metrics", type: "Personale", frequency: "Mensile", amount: 20, impacts: "No", notes: "Solo informativo" },
    { name: "LinkedIn Premium / Sales Navigator", category: "Costi personali Fabio", project: "Metrics", type: "Personale", frequency: "Mensile", amount: 90, impacts: "No", notes: "Solo informativo" },
  ],
  creatives: [
    {
      client: "Startupdata",
      owner: "Frego",
      months: 4,
      monthlyGraphicsTarget: 8,
      graphicsDone: 0,
      adsCreativesDone: 3,
      minutesPerGraphic: 45,
      minutesPerAdCreative: 60,
      notes: "Operativita grafica attuale: 8 contenuti mensili per 4 mesi. Creativita ads fatte finora: 3.",
    },
    {
      client: "Mirko / Evolution",
      owner: "Frego",
      months: 4,
      monthlyGraphicsTarget: 8,
      graphicsDone: 0,
      adsCreativesDone: 0,
      minutesPerGraphic: 45,
      minutesPerAdCreative: 60,
      notes: "Default per clienti con operativita grafica simile.",
    },
  ],
  sales: [
    { period: "2026-06", proposals: 0, closed: 0, salesHours: 5, otherCosts: 0, firstContract: 0 },
    { period: "2026-07", proposals: 0, closed: 0, salesHours: 0, otherCosts: 0, firstContract: 0 },
    { period: "2026-08", proposals: 0, closed: 0, salesHours: 0, otherCosts: 0, firstContract: 0 },
  ],
  crmLeads: [],
};

let state = structuredClone(baseData);
let selectedCrmClient = "";
let remoteStore = {
  client: null,
  enabled: false,
  loaded: false,
  saveTimer: null,
  user: null,
  audit: [],
};

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 });
const pct = new Intl.NumberFormat("it-IT", { style: "percent", maximumFractionDigits: 1 });

const els = {
  viewTitle: document.querySelector("#viewTitle"),
  kpiGrid: document.querySelector("#kpiGrid"),
  targetMargin: document.querySelector("#targetMargin"),
  dashboardClientRows: document.querySelector("#dashboardClientRows"),
  clientRows: document.querySelector("#clientRows"),
  clientCount: document.querySelector("#clientCount"),
  peopleLoad: document.querySelector("#peopleLoad"),
  settingsPanel: document.querySelector("#settingsPanel"),
  activityRows: document.querySelector("#activityRows"),
  activityTotal: document.querySelector("#activityTotal"),
  costRows: document.querySelector("#costRows"),
  costTotal: document.querySelector("#costTotal"),
  creativeRows: document.querySelector("#creativeRows"),
  creativeTotal: document.querySelector("#creativeTotal"),
  crmKpiGrid: document.querySelector("#crmKpiGrid"),
  crmClientList: document.querySelector("#crmClientList"),
  crmCurrentClient: document.querySelector("#crmCurrentClient"),
  crmCampaignRows: document.querySelector("#crmCampaignRows"),
  crmLeadRows: document.querySelector("#crmLeadRows"),
  crmTotal: document.querySelector("#crmTotal"),
  crmCsvInput: document.querySelector("#crmCsvInput"),
  crmSearch: document.querySelector("#crmSearch"),
  crmStatusFilter: document.querySelector("#crmStatusFilter"),
  crmCampaignFilter: document.querySelector("#crmCampaignFilter"),
  auditRows: document.querySelector("#auditRows"),
  loginForm: document.querySelector("#loginForm"),
  loginMessage: document.querySelector("#loginMessage"),
  userBadge: document.querySelector("#userBadge"),
  logoutButton: document.querySelector("#logoutButton"),
  salesRows: document.querySelector("#salesRows"),
  salesTotal: document.querySelector("#salesTotal"),
  renewalRows: document.querySelector("#renewalRows"),
  activitySearch: document.querySelector("#activitySearch"),
  ownerFilter: document.querySelector("#ownerFilter"),
  delegationFilter: document.querySelector("#delegationFilter"),
};

function activityFromRow(row) {
  return {
    client: row[0],
    phase: row[1],
    type: row[2],
    task: row[3],
    owner: row[4],
    idealOwner: row[5],
    priority: row[6],
    delegation: row[7],
    included: row[8],
    frequency: row[9],
    minutes: Number(row[10]) || 0,
    times: Number(row[11]) || 0,
    manualHours: Number(row[12]) || 0,
  };
}

function loadLocalState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(baseData);
  try {
    const parsed = JSON.parse(saved);
    return { ...structuredClone(baseData), ...parsed };
  } catch {
    return structuredClone(baseData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  queueRemoteSave();
}

function setupRemoteStore() {
  const config = window.METRICS_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) return;

  remoteStore.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  remoteStore.enabled = true;
}

async function requireAuth() {
  if (!remoteStore.enabled) {
    document.body.classList.remove("is-locked");
    return true;
  }

  const { data } = await remoteStore.client.auth.getSession();
  remoteStore.user = data?.session?.user || null;

  remoteStore.client.auth.onAuthStateChange((_event, session) => {
    remoteStore.user = session?.user || null;
    if (remoteStore.user) {
      document.body.classList.remove("is-locked");
      renderUser();
      loadRemoteState().then(() => render());
      loadAuditLog().then(renderAuditLog);
    } else {
      document.body.classList.add("is-locked");
    }
  });

  if (!remoteStore.user) {
    document.body.classList.add("is-locked");
    return false;
  }

  document.body.classList.remove("is-locked");
  renderUser();
  return true;
}

function renderUser() {
  if (!els.userBadge) return;
  els.userBadge.textContent = remoteStore.user?.email || "Locale";
}

async function login(email, password) {
  if (!remoteStore.enabled) return;
  els.loginMessage.textContent = "Accesso in corso...";
  const { error } = await remoteStore.client.auth.signInWithPassword({ email, password });
  if (error) {
    els.loginMessage.textContent = "Login non riuscito. Controlla email e password.";
    return;
  }
  els.loginMessage.textContent = "";
}

async function logout() {
  if (!remoteStore.enabled) return;
  await remoteStore.client.auth.signOut();
}

async function loadRemoteState() {
  if (!remoteStore.enabled || !remoteStore.user) return false;

  const { data, error } = await remoteStore.client
    .from(REMOTE_TABLE)
    .select("data")
    .eq("id", REMOTE_STATE_ID)
    .maybeSingle();

  if (error) {
    console.warn("Remote load failed", error);
    setSaveMarker("Database non raggiungibile");
    return false;
  }

  if (data?.data) {
    state = { ...structuredClone(baseData), ...data.data };
    normalizeState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    remoteStore.loaded = true;
    setSaveMarker("Database online");
    return true;
  }

  await saveRemoteStateNow();
  remoteStore.loaded = true;
  setSaveMarker("Database inizializzato");
  return true;
}

function queueRemoteSave() {
  if (!remoteStore.enabled) return;
  window.clearTimeout(remoteStore.saveTimer);
  remoteStore.saveTimer = window.setTimeout(() => {
    saveRemoteStateNow();
  }, 650);
}

async function saveRemoteStateNow() {
  if (!remoteStore.enabled || !remoteStore.user) return;
  const { error } = await remoteStore.client
    .from(REMOTE_TABLE)
    .upsert({
      id: REMOTE_STATE_ID,
      data: state,
      updated_at: new Date().toISOString(),
      updated_by: remoteStore.user.id,
      updated_by_email: remoteStore.user.email,
    });

  if (error) {
    console.warn("Remote save failed", error);
    setSaveMarker("Errore salvataggio online");
    return;
  }

  setSaveMarker("Salvato online");
}

async function recordAudit(action, scope, details = {}) {
  const entry = {
    created_at: new Date().toISOString(),
    user_email: remoteStore.user?.email || "locale",
    action,
    scope,
    details,
  };

  remoteStore.audit = [entry, ...remoteStore.audit].slice(0, 50);
  renderAuditLog();

  if (!remoteStore.enabled || !remoteStore.user) return;

  const { error } = await remoteStore.client
    .from(AUDIT_TABLE)
    .insert({
      user_id: remoteStore.user.id,
      user_email: remoteStore.user.email,
      action,
      scope,
      details,
    });

  if (error) console.warn("Audit log failed", error);
}

async function loadAuditLog() {
  if (!remoteStore.enabled || !remoteStore.user) return;
  const { data, error } = await remoteStore.client
    .from(AUDIT_TABLE)
    .select("created_at,user_email,action,scope,details")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) {
    console.warn("Audit load failed", error);
    return;
  }

  remoteStore.audit = data || [];
}

function showSavedState() {
  setSaveMarker(remoteStore.enabled ? "Salvataggio..." : "Salvato in locale", true);
}

function setSaveMarker(text, pulse = false) {
  const marker = document.querySelector("#saveMarker");
  if (!marker) return;
  marker.textContent = text;
  if (pulse) marker.classList.add("is-saved");
  window.clearTimeout(showSavedState.timer);
  showSavedState.timer = window.setTimeout(() => marker.classList.remove("is-saved"), 1100);
}

function monthlyAmount(cost) {
  const amount = Number(cost.amount) || 0;
  if (cost.frequency === "Annuale") return amount / 12;
  if (cost.frequency === "Lifetime") return 0;
  return amount;
}

function hoursFor(activity) {
  if (Number(activity.manualHours) > 0) return Number(activity.manualHours);
  return ((Number(activity.minutes) || 0) * (Number(activity.times) || 0)) / 60;
}

function creativeHoursFor(plan) {
  const graphicHours = ((Number(plan.monthlyGraphicsTarget) || 0) * (Number(plan.minutesPerGraphic) || 0)) / 60;
  const adsHours = ((Number(plan.adsCreativesDone) || 0) * (Number(plan.minutesPerAdCreative) || 0)) / Math.max(1, Number(plan.months) || 1) / 60;
  return graphicHours + adsHours;
}

function creativePlanTotal(plan) {
  return (Number(plan.months) || 0) * (Number(plan.monthlyGraphicsTarget) || 0);
}

function personMonthlyHours(person) {
  const activityHours = state.activities
    .filter((item) => item.owner === person)
    .reduce((sum, item) => sum + hoursFor(item), 0);
  const creativeHours = (state.creatives || [])
    .filter((item) => item.owner === person)
    .reduce((sum, item) => sum + creativeHoursFor(item), 0);
  return activityHours + creativeHours;
}

function rateFor(person) {
  const key = `${String(person).toLowerCase()}Rate`;
  return Number(state.settings[key]) || 0;
}

function capacityFor(person) {
  const key = `${String(person).toLowerCase()}Capacity`;
  return Number(state.settings[key]) || 0;
}

function clientEconomics(client) {
  const revenue = Number(client.monthlyFee) + Number(client.monthlyExtra) + Number(client.oneTimeExtra) + Number(client.variable);
  const activeMonths = Number(client.activeMonths) || 0;
  const totalGenerated = revenue * activeMonths;
  const directCosts = state.costs
    .filter((cost) => cost.project === client.name && cost.impacts === "Si")
    .reduce((sum, cost) => sum + monthlyAmount(cost), 0);
  const activities = state.activities.filter((item) => item.client === client.name);
  const creativePlans = (state.creatives || []).filter((item) => item.client === client.name);
  const activityHours = activities.reduce((sum, item) => sum + hoursFor(item), 0);
  const creativeHours = creativePlans.reduce((sum, item) => sum + creativeHoursFor(item), 0);
  const hours = activityHours + creativeHours;
  const laborValue = activities.reduce((sum, item) => sum + hoursFor(item) * rateFor(item.owner), 0)
    + creativePlans.reduce((sum, item) => sum + creativeHoursFor(item) * rateFor(item.owner), 0);
  const margin = revenue - directCosts;
  const marginPct = revenue > 0 ? margin / revenue : 0;
  const target = Number(state.settings.targetMargin) / 100;
  const minimumPrice = target >= 1 ? directCosts + laborValue : (directCosts + laborValue) / Math.max(0.05, 1 - target);
  const alert = alertFor({ client, revenue, marginPct, minimumPrice, hours });
  return { revenue, activeMonths, totalGenerated, directCosts, hours, laborValue, margin, marginPct, minimumPrice, alert };
}

function alertFor(info) {
  if (info.client.status !== "Attivo") return { label: info.client.status, kind: "info" };
  if (info.revenue < info.minimumPrice) return { label: "Sottoprezzato", kind: "bad" };
  if (info.marginPct < 0.6) return { label: "Margine fragile", kind: "warn" };
  if (info.hours > 60 && info.client.type.includes("Strategico")) return { label: "Strategico intenso", kind: "warn" };
  return { label: "Sostenibile", kind: "good" };
}

function allEconomics() {
  return state.clients.map((client) => ({ client, ...clientEconomics(client) }));
}

function render() {
  normalizeState();
  saveState();
  syncOptions();
  const rows = allEconomics();
  renderKpis(rows);
  renderClients(rows);
  renderPeople();
  renderSettings();
  renderActivities();
  renderCreatives();
  renderCrm();
  renderCosts();
  renderSales();
  renderRenewals(rows);
  renderAuditLog();
  showSavedState();
}

function normalizeState() {
  state.creatives = Array.isArray(state.creatives) ? state.creatives : structuredClone(baseData.creatives);
  state.people = Array.isArray(state.people) ? state.people : structuredClone(baseData.people);
  state.clients = Array.isArray(state.clients) ? state.clients : [];
  state.clients = state.clients.map((client) => ({
    renewalStatus: "Da decidere",
    activeMonths: 0,
    ...client,
  }));
  state.activities = Array.isArray(state.activities) ? state.activities : [];
  state.costs = Array.isArray(state.costs) ? state.costs : [];
  state.sales = Array.isArray(state.sales) ? state.sales : [];
  state.crmLeads = Array.isArray(state.crmLeads) ? state.crmLeads.map(normalizeCrmLead) : [];
  state.settings = { ...structuredClone(baseData.settings), ...(state.settings || {}) };
}

function normalizeCrmLead(lead) {
  return {
    client: lead.client || lead.Cliente || selectedCrmClient || state.clients?.[0]?.name || "",
    name: lead.name || lead["Nome e cognome"] || "",
    company: lead.company || lead["Ragione sociale"] || "",
    phone: lead.phone || lead.Telefono || "",
    email: lead.email || lead.Email || "",
    linkedin: lead.linkedin || lead.LinkedIn || "",
    website: lead.website || lead["Sito web"] || "",
    channel: lead.channel || lead.Canale || "",
    campaign: lead.campaign || lead.Campagna || "",
    entryDate: lead.entryDate || lead["Data ingresso"] || lead["Lead grezzi"] || "",
    area: lead.area || lead["Provincia / Area"] || "",
    profile: lead.profile || lead.Profilo || "",
    interest: lead.interest || lead["Livello interesse"] || "",
    status: lead.status || lead.Stato || "Da contattare",
    appointmentDate: lead.appointmentDate || lead["Data appuntamento"] || "",
    teamsLink: lead.teamsLink || lead["Link Teams"] || "",
    emailSent: lead.emailSent || lead["Link inviato via mail"] || "",
    reminderSent: lead.reminderSent || lead["Reminder inviato"] || "",
    whatsappSent: lead.whatsappSent || lead["Comunicato su gruppo WA"] || "",
    backofficeNotes: lead.backofficeNotes || lead["Note Back-Office"] || "",
    nextFollowup: lead.nextFollowup || lead["Prossimo follow-up"] || "",
    followupType: lead.followupType || lead["Tipo follow-up"] || "",
    lastOutcome: lead.lastOutcome || lead["Esito ultimo contatto"] || "",
    postCallNotes: lead.postCallNotes || lead["Note post-call"] || "",
    discardReason: lead.discardReason || lead["Motivo scarto"] || "",
    rawLead: lead.rawLead || lead["Lead grezzi"] || "",
  };
}

function isClosedLead(lead) {
  return /contratto|firmato|chius[oa]|cliente/i.test(lead.status || "") || /firmato|accordo/i.test(lead.lastOutcome || "");
}

function isAppointmentLead(lead) {
  return Boolean(lead.appointmentDate) || /appuntamento|rischedulato|qualificato/i.test(lead.status || "");
}

function isQualifiedLead(lead) {
  return /qualificato|appuntamento|contratto|firmato/i.test(lead.status || "") || /alto|molto alto|medio-alto/i.test(lead.interest || "");
}

function isDiscardedLead(lead) {
  return /scartato|non in target|numero errato|annullato/i.test(lead.status || "");
}

function crmMetrics(leads) {
  const total = leads.length;
  const qualified = leads.filter(isQualifiedLead).length;
  const appointments = leads.filter(isAppointmentLead).length;
  const closed = leads.filter(isClosedLead).length;
  const discarded = leads.filter(isDiscardedLead).length;
  const notAnswered = leads.filter((lead) => /non risposto/i.test(lead.status || "")).length;
  return {
    total,
    qualified,
    appointments,
    closed,
    discarded,
    notAnswered,
    qualifiedRate: total ? qualified / total : 0,
    appointmentRate: total ? appointments / total : 0,
    closeRate: total ? closed / total : 0,
  };
}

function currentCrmClient() {
  if (!selectedCrmClient || !state.clients.some((client) => client.name === selectedCrmClient)) {
    selectedCrmClient = state.clients[0]?.name || "";
  }
  return selectedCrmClient;
}

function renderKpis(rows) {
  const active = rows.filter((row) => row.client.status === "Attivo");
  const revenue = active.reduce((sum, row) => sum + row.revenue, 0);
  const totalGenerated = rows.reduce((sum, row) => sum + row.totalGenerated, 0);
  const directCosts = active.reduce((sum, row) => sum + row.directCosts, 0);
  const margin = active.reduce((sum, row) => sum + row.margin, 0);
  const hours = active.reduce((sum, row) => sum + row.hours, 0);
  const peopleBreakdown = state.people
    .map((person) => `${person} ${decimal.format(personMonthlyHours(person))} h`)
    .join(" · ");
  const splitGross = Math.max(0, margin / 2);
  const netFabio = splitGross * Number(state.settings.taxCoefficient) * (1 - Number(state.settings.inpsRate) / 100);
  const kpis = [
    ["Ricavi clienti attivi", euro.format(revenue), `${active.length} attivi · ${euro.format(totalGenerated)} generati`, "teal"],
    ["Margine clienti", euro.format(margin), `${pct.format(revenue ? margin / revenue : 0)} dopo costi diretti`, "green"],
    ["Ore operative", `${decimal.format(hours)} h`, peopleBreakdown, "blue"],
    ["Netto Fabio stimato", euro.format(netFabio), `Split lordo ${euro.format(splitGross)}`, "amber"],
  ];
  els.kpiGrid.innerHTML = kpis.map(([label, value, note, color]) => `
    <article class="kpi" data-color="${color}">
      <small>${label}</small>
      <strong>${value}</strong>
      <span>${note}</span>
    </article>
  `).join("");
}

function renderClients(rows) {
  els.clientCount.textContent = `${rows.length} clienti`;
  els.dashboardClientRows.innerHTML = rows.map((row) => dashboardClientRow(row)).join("");
  els.clientRows.innerHTML = rows.map((row, index) => clientEditRow(row, index)).join("");
}

function dashboardClientRow(row) {
  return `
    <tr>
      <td><strong>${escapeHtml(row.client.name)}</strong><br><span class="muted">${escapeHtml(row.client.type)}</span></td>
      <td>${euro.format(row.revenue)}</td>
      <td>${decimal.format(row.activeMonths)}</td>
      <td>${euro.format(row.totalGenerated)}</td>
      <td><span class="status ${renewalKind(row.client.renewalStatus)}">${escapeHtml(row.client.renewalStatus)}</span></td>
      <td>${euro.format(row.directCosts)}</td>
      <td>${decimal.format(row.hours)} h</td>
      <td>${euro.format(row.margin)}<br><span class="muted">${pct.format(row.marginPct)}</span></td>
      <td>${euro.format(row.minimumPrice)}</td>
      <td><span class="status ${row.alert.kind}">${row.alert.label}</span></td>
    </tr>
  `;
}

function clientEditRow(row, index) {
  return `
    <tr>
      <td>
        <input class="cell-input wide-input" data-scope="clients" data-index="${index}" data-field="name" value="${escapeAttr(row.client.name)}" />
        <input class="cell-input sub-input" data-scope="clients" data-index="${index}" data-field="type" value="${escapeAttr(row.client.type)}" />
      </td>
      <td>${selectHtml("clients", index, "status", ["Attivo", "In trattativa", "In pausa", "Lead Metrics"], row.client.status)}</td>
      <td><input class="cell-input wide-input" data-scope="clients" data-index="${index}" data-field="service" value="${escapeAttr(row.client.service)}" /></td>
      <td><input class="cell-input money-input" type="number" min="0" step="50" data-scope="clients" data-index="${index}" data-field="monthlyFee" value="${Number(row.client.monthlyFee) || 0}" /></td>
      <td><input class="cell-input money-input" type="number" min="0" step="50" data-scope="clients" data-index="${index}" data-field="monthlyExtra" value="${Number(row.client.monthlyExtra) || 0}" /></td>
      <td><input class="cell-input number-input" type="number" min="0" step="1" data-scope="clients" data-index="${index}" data-field="activeMonths" value="${Number(row.client.activeMonths) || 0}" /></td>
      <td>${euro.format(row.totalGenerated)}</td>
      <td>${selectHtml("clients", index, "renewalStatus", ["Da decidere", "Rinnovato", "Non rinnovato"], row.client.renewalStatus, renewalKind(row.client.renewalStatus))}</td>
      <td>${decimal.format(row.hours)} h</td>
      <td>${euro.format(row.margin)}<br><span class="muted">${pct.format(row.marginPct)}</span></td>
      <td><span class="status ${row.alert.kind}">${row.alert.label}</span></td>
      <td>
        <div class="row-actions">
          <button class="mini-btn" data-action="select-crm-client" data-client="${escapeAttr(row.client.name)}">CRM</button>
          <button class="icon-btn danger" data-action="delete" data-scope="clients" data-index="${index}" title="Elimina cliente">x</button>
        </div>
      </td>
    </tr>
  `;
}

function renewalKind(label) {
  if (label === "Rinnovato") return "good";
  if (label === "Non rinnovato") return "bad";
  return "warn";
}

function renderPeople() {
  const html = state.people.map((person) => {
    const hours = personMonthlyHours(person);
    const capacity = capacityFor(person);
    const load = capacity ? hours / capacity : 0;
    const width = Math.min(load * 100, 130);
    const status = load > 0.9 ? "Sovraccarico" : load > 0.7 ? "Attenzione" : "Sostenibile";
    return `
      <div class="load-item">
        <div class="load-meta"><strong>${person}</strong><span>${decimal.format(hours)} / ${capacity} h - ${status}</span></div>
        <div class="load-line"><span class="${load > 0.9 ? "over" : ""}" style="width:${width}%"></span></div>
      </div>
    `;
  }).join("");
  els.peopleLoad.innerHTML = html;
}

function renderSettings() {
  const fields = [
    ["fabioRate", "Valore ora Fabio", "EUR/h"],
    ["fregoRate", "Valore ora Frego", "EUR/h"],
    ["jessicaRate", "Valore ora Jessica", "EUR/h"],
    ["fabioCapacity", "Capacita Fabio", "h/mese"],
    ["fregoCapacity", "Capacita Frego", "h/mese"],
    ["jessicaCapacity", "Capacita Jessica", "h/mese"],
    ["targetMargin", "Margine target", "%"],
    ["taxCoefficient", "Coeff. forfettario", "0-1"],
    ["inpsRate", "Aliquota INPS", "%"],
    ["jessicaClosedClientCost", "Costo Jessica per chiuso", "EUR"],
  ];
  els.settingsPanel.innerHTML = fields.map(([field, label, unit]) => `
    <label>
      <span>${label}</span>
      <input class="cell-input" type="number" step="0.01" data-scope="settings" data-field="${field}" value="${Number(state.settings[field]) || 0}" />
      <small>${unit}</small>
    </label>
  `).join("");
}

function renderActivities() {
  const search = els.activitySearch.value.trim().toLowerCase();
  const owner = els.ownerFilter.value;
  const delegation = els.delegationFilter.value;
  const filtered = state.activities.filter((item) => {
    const haystack = `${item.client} ${item.task} ${item.owner} ${item.idealOwner}`.toLowerCase();
    return (!search || haystack.includes(search))
      && (!owner || item.owner === owner)
      && (!delegation || item.delegation === delegation);
  });
  const total = filtered.reduce((sum, item) => sum + hoursFor(item), 0);
  els.activityTotal.textContent = `${filtered.length} attivita, ${decimal.format(total)} h/mese`;
  els.activityRows.innerHTML = filtered.map((item) => {
    const index = state.activities.indexOf(item);
    const hours = hoursFor(item);
    return `
      <tr>
        <td>${selectHtml("activities", index, "client", state.clients.map((client) => client.name), item.client)}<input class="cell-input sub-input" data-scope="activities" data-index="${index}" data-field="phase" value="${escapeAttr(item.phase)}" /></td>
        <td><input class="cell-input wide-input" data-scope="activities" data-index="${index}" data-field="task" value="${escapeAttr(item.task)}" /><input class="cell-input sub-input" data-scope="activities" data-index="${index}" data-field="type" value="${escapeAttr(item.type)}" /></td>
        <td>${selectHtml("activities", index, "owner", state.people, item.owner)}</td>
        <td>${selectHtml("activities", index, "idealOwner", state.people, item.idealOwner)}</td>
        <td>${selectHtml("activities", index, "delegation", state.delegations, item.delegation, delegationKind(item.delegation))}</td>
        <td><input class="cell-input number-input" type="number" min="0" step="5" data-scope="activities" data-index="${index}" data-field="minutes" value="${Number(item.minutes) || 0}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="1" data-scope="activities" data-index="${index}" data-field="times" value="${Number(item.times) || 0}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="0.5" data-scope="activities" data-index="${index}" data-field="manualHours" value="${Number(item.manualHours) || 0}" /></td>
        <td>${decimal.format(hours)}</td>
        <td>${euro.format(hours * rateFor(item.owner))}</td>
        <td><button class="icon-btn danger" data-action="delete" data-scope="activities" data-index="${index}" title="Elimina attivita">x</button></td>
      </tr>
    `;
  }).join("");
}

function delegationKind(label) {
  if (label === "Non delegabile") return "bad";
  if (label === "Delegabile subito") return "good";
  if (label === "Delegabile con procedura") return "warn";
  return "info";
}

function renderCreatives() {
  const plans = state.creatives || [];
  const totalHours = plans.reduce((sum, item) => sum + creativeHoursFor(item), 0);
  const totalGraphics = plans.reduce((sum, item) => sum + creativePlanTotal(item), 0);
  els.creativeTotal.textContent = `${decimal.format(totalHours)} h/mese, ${totalGraphics} grafiche pianificate`;
  els.creativeRows.innerHTML = plans.map((plan, index) => {
    const monthlyHours = creativeHoursFor(plan);
    const totalPlan = creativePlanTotal(plan);
    return `
      <tr>
        <td>${selectHtml("creatives", index, "client", state.clients.map((client) => client.name), plan.client)}</td>
        <td>${selectHtml("creatives", index, "owner", state.people, plan.owner)}</td>
        <td><input class="cell-input number-input" type="number" min="1" step="1" data-scope="creatives" data-index="${index}" data-field="months" value="${Number(plan.months) || 1}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="1" data-scope="creatives" data-index="${index}" data-field="monthlyGraphicsTarget" value="${Number(plan.monthlyGraphicsTarget) || 0}" /></td>
        <td>${totalPlan}</td>
        <td><input class="cell-input number-input" type="number" min="0" step="1" data-scope="creatives" data-index="${index}" data-field="graphicsDone" value="${Number(plan.graphicsDone) || 0}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="1" data-scope="creatives" data-index="${index}" data-field="adsCreativesDone" value="${Number(plan.adsCreativesDone) || 0}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="5" data-scope="creatives" data-index="${index}" data-field="minutesPerGraphic" value="${Number(plan.minutesPerGraphic) || 0}" /></td>
        <td><input class="cell-input number-input" type="number" min="0" step="5" data-scope="creatives" data-index="${index}" data-field="minutesPerAdCreative" value="${Number(plan.minutesPerAdCreative) || 0}" /></td>
        <td>${decimal.format(monthlyHours)}</td>
        <td>${euro.format(monthlyHours * rateFor(plan.owner))}</td>
        <td><input class="cell-input note-input" data-scope="creatives" data-index="${index}" data-field="notes" value="${escapeAttr(plan.notes)}" /></td>
        <td><button class="icon-btn danger" data-action="delete" data-scope="creatives" data-index="${index}" title="Elimina operativita">x</button></td>
      </tr>
    `;
  }).join("");
}

function renderCrm() {
  if (!els.crmLeadRows) return;
  const clientName = currentCrmClient();
  renderCrmClients(clientName);
  const leads = (state.crmLeads || []).filter((lead) => lead.client === clientName);
  const filtered = filteredCrmLeads();
  const metrics = crmMetrics(filtered);
  const allMetrics = crmMetrics(leads);

  els.crmKpiGrid.innerHTML = [
    ["Contatti", metrics.total, `${allMetrics.total} totali nel CRM`],
    ["Qualificati", metrics.qualified, pct.format(metrics.qualifiedRate)],
    ["Appuntamenti", metrics.appointments, pct.format(metrics.appointmentRate)],
    ["Chiusure", metrics.closed, pct.format(metrics.closeRate)],
  ].map(([label, value, note]) => `
    <article class="kpi">
      <small>${label}</small>
      <strong>${value}</strong>
      <span>${note}</span>
    </article>
  `).join("");

  els.crmTotal.textContent = `${filtered.length} contatti filtrati per ${clientName || "cliente"}`;
  renderCrmCampaigns(filtered);
  renderCrmLeadRows(filtered);
  syncCrmFilters();
}

function renderCrmClients(activeClient) {
  els.crmCurrentClient.textContent = activeClient ? `CRM aperto: ${activeClient}` : "Seleziona un cliente";
  if (!state.clients.length) {
    els.crmClientList.innerHTML = `<p class="empty-state">Aggiungi un cliente per creare il suo CRM dedicato.</p>`;
    return;
  }
  els.crmClientList.innerHTML = state.clients.map((client) => {
    const clientLeads = (state.crmLeads || []).filter((lead) => lead.client === client.name);
    const metrics = crmMetrics(clientLeads);
    const active = client.name === activeClient ? " is-active" : "";
    return `
      <button class="client-chip${active}" data-action="select-crm-client" data-client="${escapeAttr(client.name)}">
        <strong>${escapeHtml(client.name)}</strong>
        <span>${metrics.total} contatti · ${metrics.appointments} app. · ${metrics.closed} chiusure</span>
      </button>
    `;
  }).join("");
}

function filteredCrmLeads() {
  const clientName = currentCrmClient();
  const search = (els.crmSearch?.value || "").trim().toLowerCase();
  const status = els.crmStatusFilter?.value || "";
  const campaign = els.crmCampaignFilter?.value || "";
  return (state.crmLeads || []).filter((lead) => {
    const haystack = `${lead.name} ${lead.company} ${lead.email} ${lead.phone}`.toLowerCase();
    return lead.client === clientName
      && (!search || haystack.includes(search))
      && (!status || lead.status === status)
      && (!campaign || lead.campaign === campaign);
  });
}

function renderCrmCampaigns(leads) {
  const groups = new Map();
  leads.forEach((lead) => {
    const key = lead.campaign || "(senza campagna)";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lead);
  });
  const rows = [...groups.entries()]
    .map(([campaign, items]) => ({ campaign, items, metrics: crmMetrics(items) }))
    .sort((a, b) => b.metrics.total - a.metrics.total);

  els.crmCampaignRows.innerHTML = rows.map((row) => `
    <tr>
      <td><strong>${escapeHtml(row.campaign)}</strong></td>
      <td>${row.metrics.total}</td>
      <td>${row.metrics.qualified}</td>
      <td>${row.metrics.appointments}</td>
      <td>${row.metrics.closed}</td>
      <td>${row.metrics.discarded}</td>
      <td>${pct.format(row.metrics.closeRate)}</td>
    </tr>
  `).join("");
}

function renderCrmLeadRows(leads) {
  els.crmLeadRows.innerHTML = leads.map((lead) => {
    const index = state.crmLeads.indexOf(lead);
    return `
      <tr>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="name" value="${escapeAttr(lead.name)}" /></td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="company" value="${escapeAttr(lead.company)}" /></td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="phone" value="${escapeAttr(lead.phone)}" /></td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="email" value="${escapeAttr(lead.email)}" /></td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="channel" value="${escapeAttr(lead.channel)}" /></td>
        <td><input class="cell-input note-input" data-scope="crmLeads" data-index="${index}" data-field="campaign" value="${escapeAttr(lead.campaign)}" /></td>
        <td>${selectHtml("crmLeads", index, "interest", crmInterestOptions(), lead.interest)}</td>
        <td>${selectHtml("crmLeads", index, "status", crmStatusOptions(), lead.status, crmStatusKind(lead.status))}</td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="appointmentDate" value="${escapeAttr(lead.appointmentDate)}" /></td>
        <td><input class="cell-input medium-input" data-scope="crmLeads" data-index="${index}" data-field="nextFollowup" value="${escapeAttr(lead.nextFollowup)}" /></td>
        <td><input class="cell-input note-input" data-scope="crmLeads" data-index="${index}" data-field="backofficeNotes" value="${escapeAttr(lead.backofficeNotes || lead.postCallNotes)}" /></td>
        <td><button class="icon-btn danger" data-action="delete" data-scope="crmLeads" data-index="${index}" title="Elimina lead">x</button></td>
      </tr>
    `;
  }).join("");
}

function crmStatusOptions() {
  const defaults = ["Da contattare", "Non risposto", "Richiamare", "Qualificato", "Appuntamento fissato", "Rischedulato", "Non presentato", "CONTRATTO FIRMATO", "Scartato", "Non in target", "Numero errato", "ANNULLATO"];
  const clientName = currentCrmClient();
  return uniqueOptions(defaults, (state.crmLeads || []).filter((lead) => lead.client === clientName).map((lead) => lead.status));
}

function crmInterestOptions() {
  const clientName = currentCrmClient();
  return uniqueOptions(["", "Basso", "Medio", "Medio-Alto", "Alto", "Molto Alto", "Da verificare"], (state.crmLeads || []).filter((lead) => lead.client === clientName).map((lead) => lead.interest));
}

function uniqueOptions(defaults, values) {
  return [...new Set([...defaults, ...values.filter(Boolean)])];
}

function crmStatusKind(status) {
  if (/contratto|firmato/i.test(status || "")) return "good";
  if (/appuntamento|qualificato|rischedulato/i.test(status || "")) return "info";
  if (/scartato|non in target|errato|annullato/i.test(status || "")) return "bad";
  return "warn";
}

function renderCosts() {
  const total = state.costs.filter((cost) => cost.impacts === "Si").reduce((sum, cost) => sum + monthlyAmount(cost), 0);
  els.costTotal.textContent = `${euro.format(total)} / mese su margine`;
  els.costRows.innerHTML = state.costs.map((cost, index) => `
    <tr>
      <td><input class="cell-input wide-input" data-scope="costs" data-index="${index}" data-field="name" value="${escapeAttr(cost.name)}" /></td>
      <td><input class="cell-input medium-input" data-scope="costs" data-index="${index}" data-field="category" value="${escapeAttr(cost.category)}" /></td>
      <td>${selectHtml("costs", index, "project", [...state.clients.map((client) => client.name), "Metrics", "Acquisizione Metrics"], cost.project)}</td>
      <td><input class="cell-input medium-input" data-scope="costs" data-index="${index}" data-field="type" value="${escapeAttr(cost.type)}" /></td>
      <td>${selectHtml("costs", index, "frequency", ["Mensile", "Annuale", "Lifetime", "Variabile"], cost.frequency)}</td>
      <td><input class="cell-input money-input" type="number" min="0" step="1" data-scope="costs" data-index="${index}" data-field="amount" value="${Number(cost.amount) || 0}" /></td>
      <td>${euro.format(monthlyAmount(cost))}</td>
      <td>${selectHtml("costs", index, "impacts", ["Si", "No"], cost.impacts, cost.impacts === "Si" ? "warn" : "info")}</td>
      <td><input class="cell-input note-input" data-scope="costs" data-index="${index}" data-field="notes" value="${escapeAttr(cost.notes)}" /></td>
      <td><button class="icon-btn danger" data-action="delete" data-scope="costs" data-index="${index}" title="Elimina costo">x</button></td>
    </tr>
  `).join("");
}

function renderSales() {
  const maxValue = Math.max(1, ...state.sales.map((row) => Number(row.firstContract) || 0));
  const totals = state.sales.reduce((acc, row) => {
    const cost = salesCost(row);
    acc.contracts += Number(row.firstContract) || 0;
    acc.costs += cost;
    acc.closed += Number(row.closed) || 0;
    return acc;
  }, { contracts: 0, costs: 0, closed: 0 });
  els.salesTotal.textContent = `${totals.closed} chiusi, CAC ${euro.format(totals.costs)}`;
  els.salesRows.innerHTML = state.sales.map((row, index) => {
    const cost = salesCost(row);
    const margin = (Number(row.firstContract) || 0) - cost;
    const width = ((Number(row.firstContract) || 0) / maxValue) * 100;
    return `
      <article class="timeline-item">
        <input class="cell-input" type="month" data-scope="sales" data-index="${index}" data-field="period" value="${escapeAttr(row.period)}" />
        <div>
          <div class="sales-edit-grid">
            <label>Proposte<input class="cell-input number-input" type="number" min="0" data-scope="sales" data-index="${index}" data-field="proposals" value="${Number(row.proposals) || 0}" /></label>
            <label>Chiusi<input class="cell-input number-input" type="number" min="0" data-scope="sales" data-index="${index}" data-field="closed" value="${Number(row.closed) || 0}" /></label>
            <label>Ore vendita<input class="cell-input number-input" type="number" min="0" step="0.5" data-scope="sales" data-index="${index}" data-field="salesHours" value="${Number(row.salesHours) || 0}" /></label>
            <label>Contratto<input class="cell-input money-input" type="number" min="0" step="50" data-scope="sales" data-index="${index}" data-field="firstContract" value="${Number(row.firstContract) || 0}" /></label>
          </div>
          <div class="load-meta"><span>${row.proposals} proposte / ${row.closed} chiusi</span><span>${euro.format(margin)}</span></div>
          <div class="mini-bar"><span style="width:${width}%"></span></div>
        </div>
        <div class="row-actions">
          <span class="status ${margin >= 0 ? "good" : "bad"}">${euro.format(cost)} CAC</span>
          <button class="icon-btn danger" data-action="delete" data-scope="sales" data-index="${index}" title="Elimina periodo">x</button>
        </div>
      </article>
    `;
  }).join("");
}

function salesCost(row) {
  return (Number(row.closed) || 0) * Number(state.settings.jessicaClosedClientCost)
    + (Number(row.salesHours) || 0) * Number(state.settings.fabioRate)
    + (Number(row.otherCosts) || 0);
}

function renderRenewals(rows) {
  els.renewalRows.innerHTML = rows.map((row) => {
    const current = Number(row.client.monthlyFee) || 0;
    const suggested = Math.ceil(row.minimumPrice / 50) * 50;
    const increase = suggested - current;
    const after = row.margin + Math.max(0, increase);
    return `
      <article class="renewal">
        <h3>${escapeHtml(row.client.name)}</h3>
        <dl>
          <dt>Prezzo attuale</dt><dd>${euro.format(current)}</dd>
          <dt>Rinnovo</dt><dd><span class="status ${renewalKind(row.client.renewalStatus)}">${escapeHtml(row.client.renewalStatus)}</span></dd>
          <dt>Mesi attivi</dt><dd>${decimal.format(row.activeMonths)}</dd>
          <dt>Totale generato</dt><dd>${euro.format(row.totalGenerated)}</dd>
          <dt>Prezzo minimo</dt><dd>${euro.format(suggested)}</dd>
          <dt>Aumento suggerito</dt><dd>${euro.format(increase)}</dd>
          <dt>Margine dopo rinnovo</dt><dd>${euro.format(after)}</dd>
          <dt>Ore attuali</dt><dd>${decimal.format(row.hours)} h</dd>
          <dt>Stato</dt><dd><span class="status ${row.alert.kind}">${row.alert.label}</span></dd>
        </dl>
      </article>
    `;
  }).join("");
}

function renderAuditLog() {
  if (!els.auditRows) return;
  const rows = remoteStore.audit || [];
  els.auditRows.innerHTML = rows.map((row) => {
    const when = row.created_at ? new Date(row.created_at).toLocaleString("it-IT") : "";
    const detail = auditDetail(row.details || {});
    return `
      <tr>
        <td>${escapeHtml(when)}</td>
        <td>${escapeHtml(row.user_email || "")}</td>
        <td><span class="status info">${escapeHtml(row.action || "")}</span></td>
        <td>${escapeHtml(row.scope || "")}</td>
        <td>${escapeHtml(detail)}</td>
      </tr>
    `;
  }).join("");
}

function auditDetail(details) {
  if (details.field) return `${details.field}: ${details.before ?? ""} -> ${details.after ?? ""}`;
  if (details.name) return details.name;
  if (details.index !== undefined) return `Riga ${Number(details.index) + 1}`;
  return JSON.stringify(details);
}

function syncOptions() {
  els.targetMargin.value = state.settings.targetMargin;
  setOptions(document.querySelector('form#activityForm select[name="client"]'), state.clients.map((client) => client.name));
  setOptions(document.querySelector('form#costForm select[name="project"]'), [...state.clients.map((client) => client.name), "Metrics", "Acquisizione Metrics"]);
  setOptions(document.querySelector('form#creativeForm select[name="client"]'), state.clients.map((client) => client.name));
  setOptions(document.querySelector('form#creativeForm select[name="owner"]'), state.people);
  setOptions(document.querySelector('form#activityForm select[name="owner"]'), state.people);
  setOptions(document.querySelector('form#activityForm select[name="idealOwner"]'), state.people);
  setOptions(document.querySelector('form#activityForm select[name="delegation"]'), state.delegations);
  setOptions(document.querySelector('form#activityForm select[name="frequency"]'), state.frequencies);
  setOptions(els.ownerFilter, ["", ...state.people], ["Tutti", ...state.people]);
  setOptions(els.delegationFilter, ["", ...state.delegations], ["Tutte", ...state.delegations]);
}

function syncCrmFilters() {
  const statuses = crmStatusOptions();
  const clientName = currentCrmClient();
  const campaigns = uniqueOptions([], (state.crmLeads || []).filter((lead) => lead.client === clientName).map((lead) => lead.campaign));
  setOptions(els.crmStatusFilter, ["", ...statuses], ["Tutti", ...statuses]);
  setOptions(els.crmCampaignFilter, ["", ...campaigns], ["Tutte", ...campaigns]);
}

function setOptions(select, values, labels = values) {
  const current = select.value;
  select.innerHTML = values.map((value, index) => `<option value="${escapeHtml(value)}">${escapeHtml(labels[index])}</option>`).join("");
  if (values.includes(current)) select.value = current;
}

function selectHtml(scope, index, field, values, current, statusKind = "") {
  const options = values.map((value) => {
    const selected = value === current ? " selected" : "";
    return `<option value="${escapeAttr(value)}"${selected}>${escapeHtml(value)}</option>`;
  }).join("");
  const klass = statusKind ? `cell-select status-select ${statusKind}` : "cell-select";
  return `<select class="${klass}" data-scope="${scope}" data-index="${index}" data-field="${field}">${options}</select>`;
}

function commitCellEdit(target, shouldRender = true) {
  const scope = target.dataset.scope;
  const index = Number(target.dataset.index);
  const field = target.dataset.field;
  if (!scope || !field) return;

  const settingsFields = new Set([
    "fabioRate",
    "fregoRate",
    "jessicaRate",
    "jessicaClosedClientCost",
    "fabioCapacity",
    "fregoCapacity",
    "jessicaCapacity",
    "targetMargin",
    "taxCoefficient",
    "inpsRate",
  ]);

  if (scope === "settings") {
    const before = state.settings[field];
    state.settings[field] = settingsFields.has(field) ? Number(target.value) || 0 : target.value.trim();
    state.settings.targetMargin = Number(state.settings.targetMargin) || 0;
    els.targetMargin.value = state.settings.targetMargin;
    if (shouldRender) {
      recordAudit("modifica", scope, { field, before, after: state.settings[field] });
      render();
    } else {
      saveState();
      showSavedState();
    }
    return;
  }

  if (Number.isNaN(index)) return;

  const collection = state[scope];
  if (!Array.isArray(collection) || !collection[index]) return;

  const previousName = scope === "clients" && field === "name" ? collection[index].name : null;
  const before = collection[index][field];
  const numericFields = new Set([
    "monthlyFee",
    "adsBudget",
    "monthlyExtra",
    "activeMonths",
    "oneTimeExtra",
    "variable",
    "minutes",
    "times",
    "manualHours",
    "amount",
    "months",
    "monthlyGraphicsTarget",
    "graphicsDone",
    "adsCreativesDone",
    "minutesPerGraphic",
    "minutesPerAdCreative",
    "proposals",
    "closed",
    "salesHours",
    "otherCosts",
    "firstContract",
  ]);
  const nextValue = numericFields.has(field) ? Number(target.value) || 0 : target.value.trim();

  collection[index][field] = nextValue;

  if (previousName && nextValue && previousName !== nextValue) {
    state.activities.forEach((activity) => {
      if (activity.client === previousName) activity.client = nextValue;
    });
    state.costs.forEach((cost) => {
      if (cost.project === previousName) cost.project = nextValue;
    });
    (state.creatives || []).forEach((plan) => {
      if (plan.client === previousName) plan.client = nextValue;
    });
    (state.crmLeads || []).forEach((lead) => {
      if (lead.client === previousName) lead.client = nextValue;
    });
    if (selectedCrmClient === previousName) selectedCrmClient = nextValue;
  }

  if (shouldRender) {
    recordAudit("modifica", scope, { index, field, before, after: nextValue });
    render();
  } else {
    saveState();
    showSavedState();
  }
}

function deleteRow(scope, index) {
  const collection = state[scope];
  if (!Array.isArray(collection) || !collection[index]) return;
  const deleted = collection[index];
  if (scope === "clients") {
    const clientName = collection[index].name;
    state.activities = state.activities.filter((activity) => activity.client !== clientName);
    state.costs = state.costs.filter((cost) => cost.project !== clientName);
    state.creatives = (state.creatives || []).filter((plan) => plan.client !== clientName);
    state.crmLeads = (state.crmLeads || []).filter((lead) => lead.client !== clientName);
    if (selectedCrmClient === clientName) selectedCrmClient = "";
  }
  collection.splice(index, 1);
  recordAudit("elimina", scope, { index, name: deleted.name || deleted.client || deleted.task || deleted.period || "" });
  render();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

function csvRowsToObjects(text) {
  const rows = parseCsv(text);
  const headers = rows.shift() || [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

async function importCrmCsv(file) {
  if (!file) return;
  const text = await file.text();
  const clientName = currentCrmClient();
  const imported = csvRowsToObjects(text).map((lead) => normalizeCrmLead({ ...lead, client: clientName }));
  state.crmLeads = [
    ...(state.crmLeads || []).filter((lead) => lead.client !== clientName),
    ...imported,
  ];
  recordAudit("importa", "crmLeads", { name: `${imported.length} contatti importati nel CRM ${clientName}` });
  render();
}

function handleForm(id, mapper) {
  document.querySelector(id).addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const created = mapper(Object.fromEntries(new FormData(form)));
    if (created) recordAudit("aggiunge", created.scope, created.details);
    form.reset();
    render();
  });
}

handleForm("#clientForm", (data) => {
  const item = {
    name: data.name,
    status: data.status,
    type: data.type,
    reason: data.reason,
    service: data.service,
    monthlyFee: Number(data.monthlyFee) || 0,
    adsBudget: Number(data.adsBudget) || 0,
    monthlyExtra: Number(data.monthlyExtra) || 0,
    oneTimeExtra: 0,
    variable: 0,
    renewalStatus: data.renewalStatus,
    activeMonths: Number(data.activeMonths) || 0,
  };
  state.clients.push(item);
  return { scope: "clients", details: { name: item.name } };
});

handleForm("#activityForm", (data) => {
  const item = {
    client: data.client,
    phase: data.phase,
    type: data.type,
    task: data.task,
    owner: data.owner,
    idealOwner: data.idealOwner,
    priority: data.priority,
    delegation: data.delegation,
    included: data.included,
    frequency: data.frequency,
    minutes: Number(data.minutes) || 0,
    times: Number(data.times) || 0,
    manualHours: 0,
  };
  state.activities.push(item);
  return { scope: "activities", details: { name: item.task, client: item.client } };
});

handleForm("#costForm", (data) => {
  const item = {
    name: data.name,
    category: data.category,
    project: data.project,
    type: data.type,
    frequency: data.frequency,
    amount: Number(data.amount) || 0,
    impacts: data.impacts,
    notes: data.notes,
  };
  state.costs.push(item);
  return { scope: "costs", details: { name: item.name, client: item.project } };
});

handleForm("#creativeForm", (data) => {
  state.creatives = state.creatives || [];
  const item = {
    client: data.client,
    owner: data.owner,
    months: Number(data.months) || 1,
    monthlyGraphicsTarget: Number(data.monthlyGraphicsTarget) || 0,
    graphicsDone: Number(data.graphicsDone) || 0,
    adsCreativesDone: Number(data.adsCreativesDone) || 0,
    minutesPerGraphic: Number(data.minutesPerGraphic) || 0,
    minutesPerAdCreative: Number(data.minutesPerAdCreative) || 0,
    notes: data.notes,
  };
  state.creatives.push(item);
  return { scope: "creatives", details: { name: `${item.client} - ${item.monthlyGraphicsTarget} grafiche/mese`, client: item.client } };
});

handleForm("#salesForm", (data) => {
  const item = {
    period: data.period,
    proposals: Number(data.proposals) || 0,
    closed: Number(data.closed) || 0,
    salesHours: Number(data.salesHours) || 0,
    otherCosts: Number(data.otherCosts) || 0,
    firstContract: Number(data.firstContract) || 0,
  };
  state.sales.push(item);
  return { scope: "sales", details: { name: item.period } };
});

function activateView(viewId) {
  const tab = document.querySelector(`.tab[data-view="${viewId}"]`);
  const view = document.querySelector(`#${viewId}`);
  if (!tab || !view) return;

  document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("is-active"));
  tab.classList.add("is-active");
  view.classList.add("is-active");
  els.viewTitle.textContent = tab.textContent;
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => activateView(button.dataset.view));
});

document.addEventListener("input", (event) => {
  if (event.target.matches("input[data-scope][data-field]")) {
    commitCellEdit(event.target, false);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-scope][data-field]")) {
    commitCellEdit(event.target);
  }
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (button.dataset.action === "delete") {
    deleteRow(button.dataset.scope, Number(button.dataset.index));
    return;
  }

  if (button.dataset.action === "select-crm-client") {
    selectedCrmClient = button.dataset.client || "";
    els.crmSearch.value = "";
    els.crmStatusFilter.value = "";
    els.crmCampaignFilter.value = "";
    activateView("crm");
    render();
  }
});

els.targetMargin.addEventListener("change", () => {
  const before = state.settings.targetMargin;
  state.settings.targetMargin = Number(els.targetMargin.value) || 0;
  recordAudit("modifica", "settings", { field: "targetMargin", before, after: state.settings.targetMargin });
  render();
});

[els.activitySearch, els.ownerFilter, els.delegationFilter].forEach((input) => {
  input.addEventListener("input", render);
});

[els.crmSearch, els.crmStatusFilter, els.crmCampaignFilter].forEach((input) => {
  input.addEventListener("input", render);
});

els.crmCsvInput.addEventListener("change", (event) => {
  importCrmCsv(event.target.files?.[0]);
  event.target.value = "";
});

document.querySelector("#resetData").addEventListener("click", () => {
  if (!confirm("Ripristinare i dati demo iniziali?")) return;
  state = structuredClone(baseData);
  recordAudit("reset", "app", { name: "Ripristino demo" });
  render();
});

document.querySelector("#exportJson").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "metrics-gestione-export.json";
  a.click();
  URL.revokeObjectURL(url);
});

els.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  login(data.email, data.password);
});

els.logoutButton.addEventListener("click", logout);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

async function bootApp() {
  state = loadLocalState();
  setupRemoteStore();

  const canOpen = await requireAuth();
  if (!canOpen) return;

  if (remoteStore.enabled && remoteStore.user) {
    await loadRemoteState();
    await loadAuditLog();
  } else {
    setSaveMarker("Locale: configura Supabase");
  }

  render();
}

bootApp();
