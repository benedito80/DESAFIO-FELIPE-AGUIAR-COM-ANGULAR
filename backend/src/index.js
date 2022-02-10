require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const usuario = require("./routes/Usuario.router");
const path = require("path");
const cors = require("cors");

/*Conectando ao banco mongoDb */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//fazendo com que as imagem(estaticas) sejam acessadas atraves das url no navegador
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "temp", "uploads"))
);

app.use(require("./routes/Post.routes"));
app.use("/usuarios", usuario);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
