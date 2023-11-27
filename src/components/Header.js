import { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState("");

  const StyledNavbar = styled(Navbar)`
    background-color: #89abe3;
    height: 5rem;
  `;

  const StyledButton = styled(Button)`
    background-color: white;
    color: #89abe3ff;
    border-color: white;

    &:hover {
      background-color: #edcac4;
      border-color: #edcac4;
    }
  `;

  const StyledBrand = styled(Navbar.Brand)`
    font-size: 2rem;
    color: white;

    margin-right: 5rem;

    &:hover {
      color: #edcac4;
    }
  `;

  const StyledLink = styled(Nav.Link)`
    font-size: 1.3rem;
    color: white;
    margin-right: 1rem;

    &:hover {
      color: #edcac4;
    }
  `;

  return (
    <>
      <StyledNavbar>
        <Container>
          <StyledBrand href="#home">Online Store</StyledBrand>

          <Nav className="me-auto">
            <StyledLink href="#home">Home</StyledLink>
            <StyledLink href="#features">Sale</StyledLink>
          </Nav>

          {username === "" ? (
            <StyledButton>Login / Register</StyledButton>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Cart</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Container>
      </StyledNavbar>
    </>
  );
}

export default Header;
