const express = require("express");
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Contato = require("./ContatoModel");
const ContatoController = require("./ContatoController");

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());

app.get("/", ContatoController.getContatos);

app.post("/", ContatoController.postContato);

app.delete("/:id", ContatoController.deleteContato);

app.put("/:id", ContatoController.putContato);

const port = 8000;

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port} :D`);
});
