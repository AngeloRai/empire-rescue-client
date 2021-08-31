import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./NavbarComponent.css";

function NavbarComponent() {
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
      style={{backgroundColor: '#FDF1E5'}} 
      variant="light"
      className="nav-bar d-flex w-100"
    >
      <Navbar.Brand to="/home">
        <NavLink className="nav-link-logo" to="/">
          <img
            src={"http://empirerescue.com.br/wp-content/uploads/2019/03/empiremedical-homerescue-180px.png"}
            alt="logo"
            className="logo "
          />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle className="humburger" onClick={expand} aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav text-center">
        <Nav className="">
          <NavLink
            onClick={() => setExpanded(false)}
            className="nav-link"
            activeClassName="active"
            to="/"
          >
            HOME
          </NavLink>
         
          
        </Nav>
        {/* {loggedInUser.user.name ? (

          <div className="d-flex  justify-content-center " >

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ backgroundColor: "#0a0a0a", border: "none"}}
              >
                <span className="mr-2">
                  Hi, {loggedInUser.user.name.split(" ")[0]}!
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="overlay">
                <Dropdown.Item to="/profile" as={NavLink}>
                  PROFILE
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(event) => {
                    event.preventDefault();
                    // Logout Process
                    setLoggedInUser({ user: {}, token: "" });
                    localStorage.removeItem("loggedInUser");
                  }}
                >
                  LOGOUT
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <NavLink
            className="nav-link text-white"
            activeClassName="active"
            to="/login"
          >
            LOGIN
          </NavLink>
        )} */}
      </Navbar.Collapse>
      {/* <Nav>{loggedInUser.user.name ? <Cart /> : null}</Nav> */}
    </Navbar>
  );
}

export default NavbarComponent;
