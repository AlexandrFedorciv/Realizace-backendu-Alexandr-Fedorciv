import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiMovieOpenStar } from "@mdi/js";

function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      bg="primary"
      data-bs-theme="dark"
      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("/films")}>
          <Icon path={mdiMovieOpenStar} size={1} />
          Filmcenze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("/films")}
              active={window.location.pathname === "/films"}
              eventKey="films"
            >
              Knihovna filmů
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
