import React from "react";
import "./../../scss/_header.scss";
import { Link } from "react-router-dom";

export default function Navbar() {

const email = localStorage.getItem("email")

let user_id = localStorage.getItem("user_id")
  const logout = () => {
    localStorage.clear()
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            The Daily Todo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user_id ? (
                <>
                  <li className="list-item pt-1">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8345/8345328.png"
                      alt="accout"
                      style={{ width: "30px", display: "inline" }}
                    />
                  </li>
                  <li className="nav-item pt-2 px-3">Welcome {email}</li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-danger"
                      href="/"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                  <li className="list-item pt-1">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1053/1053210.png"
                      alt="logout"
                      style={{ width: "30px", display: "inline" }}
                    />
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white bg-primary rounded-2"
                    to="/auth/login"
                  >
                    Login to existing account
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
