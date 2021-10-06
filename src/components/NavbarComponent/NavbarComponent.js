import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./NavbarComponent.css";
import { AuthContext } from "../../contexts/authContext";

import { RiLogoutBoxLine } from "react-icons/ri";
import logo from '../../images/empire-rescue-logo.png'

function NavbarComponent() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  function expand() {
    if (expanded === false) {
      setExpanded(true);
    } else if (expanded === true) setExpanded(false);
  }

  return (
    <Navbar
      collapseOnSelect
      expanded={expanded}
      expand="lg"
      style={{ backgroundColor: "#FFFFFF" }}
      variant="light"
      className="nav-bar d-flex shadow"
    >
      <Navbar.Brand to="/home">
        <NavLink className="nav-link-logo" to="/">
          <img
            src={logo}
            alt="logo"
            className="logo "
          />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle
        className="humburger"
        onClick={expand}
        aria-controls="responsive-navbar-nav d-flex"
      />
      <Navbar.Collapse id="responsive-navbar-nav ">
        <div className="d-flex justify-content-end w-100">
          <Nav>
            {loggedInUser.user.email ? (
              <div
              type="button"
              className="nav-link mx-4 navlink-logout"
                onClick={(event) => {
                  event.preventDefault();
                  // Logout Process
                  setLoggedInUser({ user: {}, token: "" });
                  localStorage.removeItem("loggedInUser");
                }}
              >
                
                <RiLogoutBoxLine/>
                <span class="tooltiptext">LOGOUT</span>
              </div>
            ) : (
              <NavLink
                onClick={() => setExpanded(false)}
                className="nav-link mx-4"
                activeClassName="active"
                to="/login"
              >
                LOGIN
              </NavLink>
            )}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
