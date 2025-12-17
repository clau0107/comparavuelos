// ===============================
// ComparaVuelos - main.js (MVP mock)
// Compatible con Netlify (sin backend)
// ===============================

const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

// Datos mock (simulan resultados de una API)
const flights = [
  { airline: "Aerolíneas Argentinas", from: "BUE", to: "MAD", price: 1500, currency: "USD", bookingUrl: "https://www.aerolineas.com.ar/" },
  { airline: "Iberia",               from: "BUE", to: "MAD", price: 1420, currency: "USD", bookingUrl: "https://www.iberia.com/" },
  { airline: "LATAM",                from: "BUE", to: "MAD", price: 1390, currency: "USD", bookingUrl: "https://www.latamairlines.com/" },
  { airline: "Air Europa",           from: "BUE", to: "MAD", price: 1310, currency: "USD", bookingUrl: "https://www.aireuropa.com/" },
  { airline: "American Airlines",    from: "BUE", to: "MAD", price: 1280, currency: "USD", bookingUrl: "https://www.aa.com/" },

  // Algunas rutas extra para que no quede “vacío” cuando pruebes otras
  { airline: "Air France",           from: "EZE", to: "CDG", price: 1200, currency: "USD", bookingUrl: "https://www.airfrance.com/" },
  { airline: "ITA Airways",          from: "EZE", to: "FCO", price: 1180, currency: "USD", bookingUrl: "https://www.ita-airways.com/" },
  { airline: "Copa Airlines",        from: "EZE", to: "MIA", price: 980,  currency: "USD", bookingUrl: "https://www.copaair.com/" },
  { airline: "Avianca",              from: "BUE", to: "BOG", price: 520,  currency: "USD", bookingUrl: "https://www.avianca.com/" },
  { airline: "GOL",                  from: "BUE", to: "RIO", price: 260,  currency: "USD", bookingUrl: "https://www.voegol.com.br/" }
];

// Helpers
function normalizeCode(str) {
  return (str || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function renderLoading() {
  resultsDiv.innerHTML = `<p>Buscando vuelos…</p>`;
}

function renderEmpty(from, to) {
  resultsDiv.innerHTML = `
    <p>No encontramos resultados para <strong>${from}</strong> → <strong>${to}</strong>.</p>
    <p>Probá con: <strong>BUE</strong> → <strong>MAD</strong> (o EZE→CDG, EZE→FCO, BUE→BOG).</p>
  `;
}

function renderResults(list) {
  // Ordenar por precio ascendente
  const sorted = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

  resultsDiv.innerHTML = "";

  sorted.forEach((f) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <strong>${f.airline}</strong><br>
          <span>${f.from} → ${f.to}</span>
        </div>
        <div style="text-align:right;">
          <div><strong>${f.currency} ${f.price}</strong></div>
          <a href="${f.bookingUrl}" target="_blank" rel="noopener">Reservar</a>
        </div>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}

// Evento principal
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const from = normalizeCode(document.getElementById("from").value);
  const to = normalizeCode(document.getElementById("to").value);

  // fechas (por ahora no filtran, pero quedan guardadas para fase 3)
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value;

  // Validaciones mínimas
  if (!from || !to) {
    resultsDiv.innerHTML = `<p>Completá origen y destino.</p>`;
    return;
  }

  renderLoading();

  // Simular “latencia” para que parezca real
  setTimeout(() => {
    const filtered = flights.filter((f) => f.from === from && f.to === to);

    if (filtered.length === 0) {
      renderEmpty(from, to);
      return;
    }

    renderResults(filtered);
  }, 350);
});
