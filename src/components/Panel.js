import { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import StyledButton from "./StyledButton";
import Footer from "./Footer";

const StyledNavbar = styled(Navbar)`
  background-color: #89abe3;
  height: 5rem;
  outline: 8px solid white;
`;

const StyledBrand = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  color: white;
  white-space: nowrap;
  margin-right: 3rem;

  &:hover {
    color: #edcac4;
  }
`;

const StyledNav = styled(Nav)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.4rem;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 6rem;

  &:hover {
    color: #edcac4;
  }

  &.active {
    color: #edcac4;
  }

  &:not(:last-child) {
    text-decoration: none;
    font-size: 1.4rem;
    color: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-right: 2em;
    display: flex;
    align-items: center;
    justify-items: center;
    height: 6rem;

    &:hover {
      color: #edcac4;
    }

    &.active {
      color: #edcac4;
    }
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

const StyledItem = styled(Dropdown.Item)`
  color: #89abe3;

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

function Panel(props) {
  const [username] = useState("John Wick");

  return (
    <>
      <StyledNavbar fixed="top">
        <Container>
          <StyledBrand to="/">Online Store</StyledBrand>

          <StyledNav>
            <StyledLink to="/for-him">For Him</StyledLink>
            <StyledLink to="/for-her">For Her</StyledLink>
          </StyledNav>

          {username === "" ? (
            <StyledButton
              variant="secondary"
              text="Login / Register"
            ></StyledButton>
          ) : (
            <Dropdown>
              <StyledDropDown id="dropdown-basic" variant="secondary">
                {username}
              </StyledDropDown>

              <Dropdown.Menu>
                <StyledItem href="#/action-1">Cart</StyledItem>
                <StyledItem href="#/action-2">Settings</StyledItem>
                <Dropdown.Divider />
                <StyledItem href="#/action-3">Logout</StyledItem>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Container>
      </StyledNavbar>
      {props.children}
      <Footer />
    </>
  );
}

export default Panel;
