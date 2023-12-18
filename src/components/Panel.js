import { useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import StyledButton from "./StyledButton";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import axios from "axios";

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

const StyledGroup = styled(Form.Group)`
  margin-bottom: 1rem;
`;

const ClickableText = styled.div`
  margin-top: 1rem;

  width: 4rem;
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: space-between;
`;

const EmptyControl = styled(Form.Control)`
  border-color: red;
`;

const ErrorMessage = styled.div`
  color: red;
`;

function Panel(props) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [retyped, setRetyped] = useState("");

  const clearInput = (isLoggingIn) => {
    if (isLoggingIn === true) {
      setUsername("");
      setPassword("");
    } else {
      setUsername("");
      setPassword("");
      setRetyped("");
    }
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
    clearInput(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    clearInput(false);
  };

  const handleLogin = () => {
    const url = "http://localhost:3000/login";

    const login = { username: username, password: password };

    axios
      .post(url, login)
      .then((res) => {
        if (res.data !== "") {
          const userData = { username: username, token: res.data.token };
          setUser(userData);
          handleCloseLogin();
        } else {
          console.log(user);
          handleCloseLogin();
          return;
        }
      })
      .catch((err) => {
        console.err({ error: err });
      });
  };

  const handleChangeModal = () => {
    handleCloseLogin();
    handleShowRegister();
  };

  const handleRegister = () => {
    handleCloseRegister();
    //add logic to registering
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value.trim());
  };

  return (
    <>
      <StyledNavbar fixed="top">
        <Container>
          <StyledBrand to="/">Online Store</StyledBrand>

          <StyledNav>
            <StyledLink to="/for-him">For Him</StyledLink>
            <StyledLink to="/for-her">For Her</StyledLink>
          </StyledNav>

          {user.username === undefined ? (
            <>
              <StyledButton
                variant="secondary"
                text="Login"
                onClick={handleShowLogin}
              ></StyledButton>

              <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <StyledGroup>
                      <Form.Label>Username</Form.Label>

                      <Form.Control
                        type="text"
                        value={username}
                        onChange={handleChange(setUsername)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                      />
                    </StyledGroup>

                    <ClickableText onClick={handleChangeModal}>
                      Register
                    </ClickableText>
                  </Form>
                </Modal.Body>
                <StyledFooter>
                  <Button variant="danger" onClick={handleCloseLogin}>
                    Close
                  </Button>
                  <StyledButton
                    variant="secondary"
                    text="Login"
                    onClick={handleLogin}
                  />
                </StyledFooter>
              </Modal>
              <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <StyledGroup>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={handleChange(setUsername)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Re-type Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={retyped}
                        onChange={handleChange(setRetyped)}
                      />
                    </StyledGroup>
                  </Form>
                </Modal.Body>
                <StyledFooter>
                  <Button variant="danger" onClick={handleCloseRegister}>
                    Close
                  </Button>
                  <StyledButton
                    variant="secondary"
                    text="Register"
                    onClick={handleRegister}
                  />
                </StyledFooter>
              </Modal>
            </>
          ) : (
            <Dropdown>
              <StyledDropDown id="dropdown-basic" variant="secondary">
                {user.username}
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
