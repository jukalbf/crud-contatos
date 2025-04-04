import { useEffect, useState } from "react";
import "./App.css";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

function App() {
  const [dataContatos, setDataContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState(0);
  const url = "http://localhost:8000/";

  useEffect(() => {
    async function getContatos() {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setDataContatos(data.contatos);
      } catch (err) {
        console.error(err);
      }
    }

    getContatos();
  }, []);

  // Adicionar contato
  async function postContato(e) {
    try {
      e.preventDefault();

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          numero,
        }),
      });

      const { contato } = await res.json();

      setDataContatos((prev) => [...prev, contato]);

      setNome("");
      setNumero("");
    } catch (err) {
      console.error(err);
    }
  }

  // Deletar contato
  async function deleteContato(id) {
    try {
      const res = await fetch(`${url}${id}`, {
        method: "DELETE",
      });

      setDataContatos((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Lista de contatos
  const listContatos = dataContatos.map((contato) => {
    return (
      <li key={contato._id} id={contato._id} className="contato">
        <div className="contato-infos">
          <div className="icons">
            <CiEdit className="edit" />
            <CiTrash
              className="lixeira"
              onClick={() => deleteContato(contato._id)}
            />
          </div>
          <h4>{contato.nome}</h4>
          <span>{contato.numero}</span>
        </div>
        <hr />
      </li>
    );
  });

  return (
    <>
      <div className="container-form">
        <form onSubmit={postContato}>
          <h1>Adicionar Contato</h1>
          <label className="inputs">
            <span>Nome</span>
            <input
              type="text"
              name="nome-contato"
              placeholder="Ex: Marcelo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className="inputs">
            <span>Número</span>
            <input
              type="number"
              name="nome-contato"
              placeholder="Ex: 00123456789"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>
          <button type="submit" className="button-register">
            Registrar
          </button>
        </form>
      </div>
      <div className="container-list">
        <h2>Lista de Contatos</h2>
        <ul className="lista-contatos">{dataContatos && listContatos}</ul>
      </div>
    </>
  );
}

export default App;
