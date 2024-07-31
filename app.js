const express = require("express");
const app = express();
require("./connection/connection");
const auth = require("./Routes/authenticate");
const list = require("./Routes/list");
const cors = require("cors")
const path = require("path");

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
  res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
 
app.use("/api/v1", auth);
app.use("/api/v2", list);

