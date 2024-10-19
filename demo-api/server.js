const express = require("express");
require("dotenv").config();


const app = express();
const port = 4200;

app.use(express.json());

// Importar rutas
const userRoutes = require("./routes");

// Usar rutas
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
