// ===============================
// ComparaVuelos - main.js (MVP UX mejorado)
// ===============================

const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

// Datos mock (simulan una API)
const flights = [
  { airline: "Aerolíneas Argentinas", from: "BUE", to: "MAD", price: 1500, currency: "USD", bookingUrl: "https://www.aerolineas.com.ar/" },
  { airline: "Iberia", from: "BUE", to: "MAD", price: 1420, currency: "USD", bookingUrl: "https://www.iberia.com/" },
  { airline: "LATAM", from: "BUE", to: "MAD", price: 1390, currency: "USD", bookingUrl: "https://www.latamairlines.com/" },
  { airline: "Air Europa", from: "BUE", to: "MAD", price: 1310, currency: "USD", bookingUrl: "https://www.aireuropa.com/" },
  { airline: "American Airlines", from: "BUE", to: "MAD", price: 1280, currency: "USD", bookingUrl: "https://www.aa.com/" }
];

// Helpers
function normalizeCode(str) {
  return (str || "").trim().toUpperCase();
}

function renderLoading() {
  resultsDiv.innerHTML = `
    <div class="loader">
      ✈️ Buscando las mejores tarifas…
    </div>
  `;
}

function renderEmpty(from, to) {
  resultsDiv.innerHTML = `
    <p>No encontramos resultados para <strong>${from}</strong> → <strong>${to}</strong>.</p>
  `;
}

function renderResults(list) {
  // Ordenar por precio (más barato primero)
  const sorted = [...list].sort((a, b) => a.price - b.price);

  // Precio más barato
  const cheapestPrice = sorted[0].price;

  resultsDiv.innerHTML = "";

  sorted.forEach((f) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <strong>${f.air
