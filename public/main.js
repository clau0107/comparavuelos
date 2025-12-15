// ===============================
// CONFIG
// ===============================
const API_URL = "https://comparavuelos.onrender.com/api/search";

// ===============================
// ELEMENTOS
// ===============================
const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

// ===============================
// EVENTO SUBMIT
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultsDiv.innerHTML = "<p>Buscando vuelos...</p>";

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value;

  try {
  const response = await fetch(API_URL);



    const data = await response.json();

    renderResults(data);
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML =
      "<p style='color:red'>Error al buscar vuelos</p>";
  }
});

// ===============================
// RENDER RESULTADOS (5)
// ===============================
function renderResults(data) {
  resultsDiv.innerHTML = "";

  if (!data || data.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron vuelos</p>";
    return;
  }

  data.slice(0, 5).forEach((flight) => {
    const card = document.createElement("div");
    card.className = "cv-result-card";

    card.innerHTML = `
      <div>
        <strong>${flight.airline}</strong><br />
        ${flight.from} → ${flight.to}
      </div>
      <div>
        <strong>${flight.price} USD</strong><br />
        <button class="cv-btn-secondary">Ver tarifa</button>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}
