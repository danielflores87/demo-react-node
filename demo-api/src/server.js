const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 4200;


app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
