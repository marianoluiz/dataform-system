import "../styles/header.scss";
import { NavLink } from "react-router-dom";
import plmLogo from "../img/plm-logo.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top py-0 px-md-5">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <img
              src={plmLogo}
              className="nav__plm-logo"
              height="54px"
              width="56px"
              alt="Pamantasan ng Lungsod ng Maynila"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-md-auto text-center">
              <li className="nav-item me-md-3">
                {/* NavLink has built in active class adder / remover */}
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
