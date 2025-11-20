import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nm_usuario, setNmUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    //const resp = await api.post("/auth/login", { nm_usuario, senha });
    //localStorage.setItem("token", resp.data.token);
    navigate("/home");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>GoCode Lab</h3>
      <h5>Área de Acesso</h5>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" placeholder="Nome de Usuário" onChange={e=>setNmUsuario(e.target.value)}/>
        <input className="form-control mb-3" placeholder="Senha" type="password" onChange={e=>setSenha(e.target.value)}/>
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}