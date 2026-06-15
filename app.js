const STORAGE_KEY = "metrics-gestione-v6";

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
  sales: [
    { period: "2026-06", proposals: 0, closed: 0, salesHours: 5, otherCosts: 0, firstContract: 0 },
    { period: "2026-07", proposals: 0, closed: 0, salesHours: 0, otherCosts: 0, firstContract: 0 },
    { period: "2026-08", proposals: 0, closed: 0, salesHours: 0, otherCosts: 0, firstContract: 0 },
  ],
};

let state = loadState();

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

function loadState() {
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
}

function showSavedState() {
  const marker = document.querySelector("#saveMarker");
  if (!marker) return;
  marker.textContent = "Salvato";
  marker.classList.add("is-saved");
  window.clearTimeout(showSavedState.timer);
  showSavedState.timer = window.setTimeout(() => marker.classList.remove("is-saved"), 900);
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
  const directCosts = state.costs
    .filter((cost) => cost.project === client.name && cost.impacts === "Si")
    .reduce((sum, cost) => sum + monthlyAmount(cost), 0);
  const activities = state.activities.filter((item) => item.client === client.name);
  const hours = activities.reduce((sum, item) => sum + hoursFor(item), 0);
  const laborValue = activities.reduce((sum, item) => sum + hoursFor(item) * rateFor(item.owner), 0);
  const margin = revenue - directCosts;
  const marginPct = revenue > 0 ? margin / revenue : 0;
  const target = Number(state.settings.targetMargin) / 100;
  const minimumPrice = target >= 1 ? directCosts + laborValue : (directCosts + laborValue) / Math.max(0.05, 1 - target);
  const alert = alertFor({ client, revenue, marginPct, minimumPrice, hours });
  return { revenue, directCosts, hours, laborValue, margin, marginPct, minimumPrice, alert };
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
  saveState();
  syncOptions();
  const rows = allEconomics();
  renderKpis(rows);
  renderClients(rows);
  renderPeople();
  renderSettings();
  renderActivities();
  renderCosts();
  renderSales();
  renderRenewals(rows);
  showSavedState();
}

function renderKpis(rows) {
  const active = rows.filter((row) => row.client.status === "Attivo");
  const revenue = active.reduce((sum, row) => sum + row.revenue, 0);
  const directCosts = active.reduce((sum, row) => sum + row.directCosts, 0);
  const margin = active.reduce((sum, row) => sum + row.margin, 0);
  const hours = active.reduce((sum, row) => sum + row.hours, 0);
  const fabioHours = state.activities.filter((item) => item.owner === "Fabio").reduce((sum, item) => sum + hoursFor(item), 0);
  const splitGross = Math.max(0, margin / 2);
  const netFabio = splitGross * Number(state.settings.taxCoefficient) * (1 - Number(state.settings.inpsRate) / 100);
  const kpis = [
    ["Ricavi clienti attivi", euro.format(revenue), `${active.length} clienti in gestione`, "teal"],
    ["Margine clienti", euro.format(margin), `${pct.format(revenue ? margin / revenue : 0)} dopo costi diretti`, "green"],
    ["Ore operative", `${decimal.format(hours)} h`, `${decimal.format(fabioHours)} h su Fabio`, "blue"],
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
      <td>${decimal.format(row.hours)} h</td>
      <td>${euro.format(row.margin)}<br><span class="muted">${pct.format(row.marginPct)}</span></td>
      <td><span class="status ${row.alert.kind}">${row.alert.label}</span></td>
      <td><button class="icon-btn danger" data-action="delete" data-scope="clients" data-index="${index}" title="Elimina cliente">x</button></td>
    </tr>
  `;
}

function renderPeople() {
  const html = state.people.map((person) => {
    const hours = state.activities.filter((item) => item.owner === person).reduce((sum, item) => sum + hoursFor(item), 0);
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

function syncOptions() {
  els.targetMargin.value = state.settings.targetMargin;
  setOptions(document.querySelector('form#activityForm select[name="client"]'), state.clients.map((client) => client.name));
  setOptions(document.querySelector('form#costForm select[name="project"]'), [...state.clients.map((client) => client.name), "Metrics", "Acquisizione Metrics"]);
  setOptions(document.querySelector('form#activityForm select[name="owner"]'), state.people);
  setOptions(document.querySelector('form#activityForm select[name="idealOwner"]'), state.people);
  setOptions(document.querySelector('form#activityForm select[name="delegation"]'), state.delegations);
  setOptions(document.querySelector('form#activityForm select[name="frequency"]'), state.frequencies);
  setOptions(els.ownerFilter, ["", ...state.people], ["Tutti", ...state.people]);
  setOptions(els.delegationFilter, ["", ...state.delegations], ["Tutte", ...state.delegations]);
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
    state.settings[field] = settingsFields.has(field) ? Number(target.value) || 0 : target.value.trim();
    state.settings.targetMargin = Number(state.settings.targetMargin) || 0;
    els.targetMargin.value = state.settings.targetMargin;
    if (shouldRender) {
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
  const numericFields = new Set([
    "monthlyFee",
    "adsBudget",
    "monthlyExtra",
    "oneTimeExtra",
    "variable",
    "minutes",
    "times",
    "manualHours",
    "amount",
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
  }

  if (shouldRender) {
    render();
  } else {
    saveState();
    showSavedState();
  }
}

function deleteRow(scope, index) {
  const collection = state[scope];
  if (!Array.isArray(collection) || !collection[index]) return;
  if (scope === "clients") {
    const clientName = collection[index].name;
    state.activities = state.activities.filter((activity) => activity.client !== clientName);
    state.costs = state.costs.filter((cost) => cost.project !== clientName);
  }
  collection.splice(index, 1);
  render();
}

function handleForm(id, mapper) {
  document.querySelector(id).addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    mapper(Object.fromEntries(new FormData(form)));
    form.reset();
    render();
  });
}

handleForm("#clientForm", (data) => {
  state.clients.push({
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
  });
});

handleForm("#activityForm", (data) => {
  state.activities.push({
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
  });
});

handleForm("#costForm", (data) => {
  state.costs.push({
    name: data.name,
    category: data.category,
    project: data.project,
    type: data.type,
    frequency: data.frequency,
    amount: Number(data.amount) || 0,
    impacts: data.impacts,
    notes: data.notes,
  });
});

handleForm("#salesForm", (data) => {
  state.sales.push({
    period: data.period,
    proposals: Number(data.proposals) || 0,
    closed: Number(data.closed) || 0,
    salesHours: Number(data.salesHours) || 0,
    otherCosts: Number(data.otherCosts) || 0,
    firstContract: Number(data.firstContract) || 0,
  });
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("is-active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
    button.classList.add("is-active");
    document.querySelector(`#${button.dataset.view}`).classList.add("is-active");
    els.viewTitle.textContent = button.textContent;
  });
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
  const button = event.target.closest("[data-action='delete']");
  if (!button) return;
  deleteRow(button.dataset.scope, Number(button.dataset.index));
});

els.targetMargin.addEventListener("change", () => {
  state.settings.targetMargin = Number(els.targetMargin.value) || 0;
  render();
});

[els.activitySearch, els.ownerFilter, els.delegationFilter].forEach((input) => {
  input.addEventListener("input", render);
});

document.querySelector("#resetData").addEventListener("click", () => {
  if (!confirm("Ripristinare i dati demo iniziali?")) return;
  state = structuredClone(baseData);
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

render();
