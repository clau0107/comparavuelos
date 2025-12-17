const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

// Resultados simulados (MVP)
const mockResults = [
  {
    airline: "Aerolíneas Argentinas",
    from: "BUE",
    to: "MAD",
    price: 1500,
    currency: "USD",
    bookingUrl: "https://www.aerolineas.com.ar"
  },
  {
    airline: "Iberia",
    from: "BUE",
    to: "MAD",
    price: 1420,
    currency: "USD",
    bookingUrl: "https://www.iberia.com"
  },
  {
    airline: "LATAM",
    from: "BUE",
    to: "MAD",
    price: 1390,
    currency: "USD",
    bookingUrl: "https://www.latam.com"
  },
  {
    airline: "Air Europa",
    from: "BUE",
    to: "MAD",
    price: 1310,
    currency: "USD",
    bookingUrl: "https://www.aireuropa.com"
  },
  {
    airline: "American Airlines",
    from: "BUE",
    to: "MAD",
    price: 1280,
    currency: "USD",
    bookingUrl: "https://www.aa.com"
  }
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  resultsDiv.innerHTML = "<p>Buscando vuelos...</p>";

  // Simular delay
  setTimeout(() => {
    renderResults(mockResults);
  }, 600);
});

function renderResults(flights) {
  resultsDiv.innerHTML = "";

  if (!flights.length) {
    resultsDiv.innerHTML = "<p>No se encontraron vuelos.</p>";
    return;
  }

  const sorted = [...flights].sort((a, b) => a.price - b.price);
  const cheapestPrice = sorted[0].price;

  sorted.forEach(f => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <strong>${f.airline}</strong>
        ${f.price === cheapestPrice ? `<span class="badge">Mejor precio</span>` : ``}
      </div>

      <p>${f.from} → ${f.to}</p>

      <div class="card-footer">
        <strong>${f.currency} ${f.price}</strong>
        <a href="${f.bookingUrl}" target="_blank" rel="noopener">Reservar</a>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}
