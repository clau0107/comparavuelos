const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir el frontend si querés probar todo junto en Render:
app.use(express.static("public"));

// ✅ Datos de prueba (5 opciones)
const mockResults = [
  { airline: "Aerolíneas Argentinas", from: "BUE", to: "MAD", price: 1500, bookingUrl: "https://www.aerolineas.com.ar" },
  { airline: "Iberia", from: "BUE", to: "MAD", price: 1420, bookingUrl: "https://www.iberia.com" },
  { airline: "LATAM", from: "BUE", to: "MAD", price: 1390, bookingUrl: "https://www.latamairlines.com" },
  { airline: "Air Europa", from: "BUE", to: "MAD", price: 1310, bookingUrl: "https://www.aireuropa.com" },
  { airline: "American Airlines", from: "BUE", to: "MAD", price: 1280, bookingUrl: "https://www.aa.com" },
];

app.get("/", (req, res) => {
  res.json({ message: "ComparaVuelos API OK ✅" });
});

app.get("/search", (req, res) => {
  res.json(mockResults);
});

app.get("/api/search", (req, res) => {
  res.json(mockResults);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API funcionando en puerto", PORT);
});
