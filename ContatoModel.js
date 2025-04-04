const mongoose = require("mongoose");

const contatoSchema = new mongoose.Schema({
    nome: String,
    numero: Number
})

const Contato = mongoose.model("Contato", contatoSchema);

module.exports = Contato;