const mongoose = require("mongoose");
const Contato = require("./ContatoModel");

async function getContatos(req, res) {
  try {
    const data = await Contato.find();

    return res.status(200).json({ contatos: data });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function getOneContato(req, res) {
  try {
    const { id } = req.params;

    const findContato = await Contato.findById(id);

    res.status(200).json({ message: "Usuário encontrado com sucesso.", contato: findContato });
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

async function postContato(req, res) {
  const { nome, numero } = req.body;

  try {
    const newContato = new Contato({
      nome,
      numero,
    });

    await newContato.save();
    res
      .status(201)
      .json({ message: "Contato enviado com sucesso", contato: newContato });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function deleteContato(req, res) {
    try {
        const { id } = req.params;
        
        const contatoFind = await Contato.findByIdAndDelete(id);

        if (!id) {
            return res.json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso." });
        
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

async function putContato(req, res) {
    try {
        const { id } = req.params;
        const { nome, numero } = req.body;

        const updateData = {};
        if (nome) updateData.nome = nome;
        if (numero) updateData.numero = numero;

        if (!nome && !numero) {
            return res.json({ message: "Preencha pelo menos um dos campos." });
        }

        const updateContato = await Contato.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateContato) {
            res.status(404).json({ message: "Contato não encontrado" });
        }

        res.status(200).json({ message: `Contato ${nome} atualizado.`, contato: updateContato });

    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

module.exports = {
    getContatos,
    postContato,
    deleteContato,
    putContato,
    getOneContato,
}
