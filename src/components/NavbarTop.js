import { Link, useNavigate } from "react-router-dom";

export default function NavbarTop() {
  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/home" className="navbar-brand">GoCode Lab</Link>
      <div className="d-flex gap-3">
        <Link to="/home" className="text-white">Início</Link>
        <Link to="/pacientes" className="text-white">Pacientes</Link>
        <Link to="/geladeira" className="text-white">Geladeira</Link>
        <button className="btn btn-sm btn-outline-light" onClick={logout}>Sair</button>
      </div>
    </nav>
  );
}