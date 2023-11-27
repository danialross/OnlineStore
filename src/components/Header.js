import { useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";

function Header(props) {
  const [username, setUsername] = useState("Kevin");

  const StyledNavbar = styled(Navbar)`
    background-color: #89abe3;
    height: 5rem;
  `;

  const StyledButton = styled(Button)`
    background-color: white;
    color: #89abe3;
    border-color: white;

    &:hover {
      background-color: #edcac4;
      border-color: #edcac4;
    }

    &:active {
      background-color: #edcac4;
    }
  `;

  const StyledBrand = styled(NavLink)`
    text-decoration: none;
    font-size: 2rem;
    color: white;

    margin-right: 5rem;

    &:hover {
      color: #edcac4;
    }
  `;

  const StyledLink = styled(NavLink)`
    text-decoration: none;
    font-size: 1.3rem;
    color: white;
    margin-right: 2rem;

    &:hover {
      color: #edcac4;
    }

    &.active {
      color: #edcac4;
    }
  `;

  const StyledDropDown = styled(Dropdown.Toggle)`
    background-color: white;
    color: #89abe3;
    border-radius: 5px;
    border-color: white;

    &:hover {
      color: white;
      background-color: #edcac4;
      border-color: #edcac4;
    }

    &:active {
      color: white;
      background-color: #edcac4;
      border-color: #edcac4;
    }
  `;

  return (
    <>
      <StyledNavbar>
        <Container>
          <StyledBrand to="/">Online Store</StyledBrand>

          <Nav className="me-auto">
            <StyledLink to="/forhim">Gifts for Him</StyledLink>
            <StyledLink to="/forher">Gifts for Her</StyledLink>
            <StyledLink to="/under10">Gifts for under $10</StyledLink>
          </Nav>

          {username === "" ? (
            <StyledButton variant="secondary">Login / Register</StyledButton>
          ) : (
            <Dropdown>
              <StyledDropDown id="dropdown-basic" variant="secondary">
                {username}
              </StyledDropDown>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Cart</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Container>
      </StyledNavbar>
      {props.children}
    </>
  );
}

export default Header;
