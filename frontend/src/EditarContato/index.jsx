import { useState } from "react";
import "./styles.css";

const EditarContato = ({ contatoData, display, close, setDataContatos }) => {
  const [nome, setNome] = useState(contatoData.nome);
  const [numero, setNumero] = useState(contatoData.numero);
  const [idContato, setIdContato] = useState(contatoData._id);
  const url = "http://localhost:8000/";

  // edita contato
  async function editContato() {
    try {
      const res = await fetch(`${url}${idContato}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          numero,
        }),
      });

      const { contato } = await res.json();
      setDataContatos((prev) => prev.map((c) => (c._id === contato._id ? contato : c)));

      close(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-form-edit" style={{ display: display }}>
      <form>
        <label>
          <span>Nome</span>
          <input
            type="text"
            name="input-nome"
            className="input-edit"
            placeholder={nome}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          <span>Numero</span>
          <input
            type="text"
            name="input-numero"
            className="input-edit"
            placeholder={numero}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </label>
        <div className="buttons-container">
          <button type="button" className="btn-editar" onClick={editContato}>
            Editar
          </button>
          <button type="button" className="btn-cancelar" onClick={close}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarContato;
