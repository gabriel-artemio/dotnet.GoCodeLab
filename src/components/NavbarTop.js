import { Link } from "react-router-dom";

export default function NavbarTop() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        GoCode Lab
      </Link>
      <div className="d-flex gap-3">
        <Link to="/" className="text-white">
          Início
        </Link>
      </div>
    </nav>
  );
}
