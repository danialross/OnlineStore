import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
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

const ErrorControl = styled(Form.Control)`
  border-color: red;
`;

const ErrorText = styled(Form.Text)`
  color: red;
`;

const SuccessText = styled(Form.Text)`
  color: green;
`;

function Panel(props) {
  const [user, setUser] = useState({ username: "", token: "" });
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [retyped, setRetyped] = useState("");
  const [isRetypedValid, setIsRetypedValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);

  const clearInput = (isLoggingIn) => {
    //isLoggingIn can be true for validating during logging in or false for validating during registering
    setUsername("");
    setPassword("");

    if (!isLoggingIn) {
      setRetyped("");
    }
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setErrorMessage("");
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    setShowLogin(false);
    clearInput(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setErrorMessage("");
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    setIsRetypedValid(true);
    setShowRegister(false);
    clearInput(false);
  };

  const isInputValid = (isLoggingIn) => {
    //isLoggingIn can be true for validating during logging in or false for validating during registering

    if (!isLoggingIn) {
      if (retyped.length === 0) {
        setIsRetypedValid(false);
      } else {
        setIsRetypedValid(true);
      }
    }

    if (username.length === 0 || password.length === 0) {
      if (username.length === 0) {
        setIsUsernameValid(false);
      } else {
        setIsUsernameValid(true);
      }

      if (password.length === 0) {
        setIsPasswordValid(false);
      } else {
        setIsPasswordValid(true);
      }

      setErrorMessage("");
      return false;
    }

    setIsUsernameValid(true);
    setIsPasswordValid(true);

    return true;
  };

  const handleLogin = () => {
    if (!isInputValid(true)) {
      return;
    }

    const url = "http://localhost:3000/login";

    const login = { username: username, password: password };

    axios
      .post(url, login)
      .then((res) => {
        if (res.data.token === "") {
          setErrorMessage("Invalid username or password.");
        } else {
          const userData = { username: username, token: res.data.token };
          setUser(userData);
          handleCloseLogin();
          handleShowLoggedInMessage();
        }
      })
      .catch((err) => {
        console.err({ error: err });
      });
  };

  const handleRegister = () => {
    if (!isInputValid(false)) {
      return;
    }

    if (password !== retyped) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const url = "http://localhost:3000/register";

    const register = { username: username, password: password };

    axios.post(url, register).catch((err) => {
      console.err({ error: err });
    });

    handleCloseRegister();
    handleShowRegisteredMessage();
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value.trim());
  };

  // const handleEnterKey = (isLoggingIn) => {
  //   return (event) => {
  //     if (event.key === "Enter" && isLoggingIn) {
  //       handleLogin();
  //     } else if (event.key === "Enter" && !isLoggingIn) {
  //       handleRegister();
  //     }
  //   };
  // };

  const handleShowLoggedInMessage = () => {
    setShowLoggedInMessage(true);
  };

  const handleCloseLoggedInMessage = () => {
    setShowLoggedInMessage(false);
  };

  const handleShowRegisteredMessage = () => {
    setShowRegisteredMessage(true);
  };

  const handleCloseRegisteredMessage = () => {
    setShowRegisteredMessage(false);
  };

  const handleLogout = () => {
    const url = "http://localhost:3000/logout";
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(url)
      .then(() => {
        handleShowLoggedOutMessage();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleShowLoggedOutMessage = () => {
    setShowLoggedOutMessage(true);
  };

  const handleCloseLoggedOutMessage = () => {
    setShowLoggedOutMessage(false);
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

          {user.username === "" ? (
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
                      {isUsernameValid ? (
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={handleChange(setUsername)}
                        />
                      ) : (
                        <>
                          <ErrorControl
                            type="text"
                            value={username}
                            onChange={handleChange(setUsername)}
                          />
                          <ErrorText>Username is empty</ErrorText>
                        </>
                      )}
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      {isPasswordValid ? (
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={handleChange(setPassword)}
                        />
                      ) : (
                        <>
                          <ErrorControl
                            type="password"
                            value={password}
                            onChange={handleChange(setPassword)}
                          />
                          <ErrorText>Password is empty</ErrorText>
                        </>
                      )}
                    </StyledGroup>

                    <ClickableText
                      onClick={() => {
                        handleCloseLogin();
                        handleShowRegister();
                      }}
                    >
                      Register
                    </ClickableText>
                    {errorMessage !== "" ? (
                      <>
                        <p></p>
                        <ErrorText>{errorMessage}</ErrorText>
                      </>
                    ) : null}
                  </Form>
                </Modal.Body>
                <StyledFooter>
                  <Button variant="danger" onClick={handleCloseLogin}>
                    Cancel
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
                      {isUsernameValid ? (
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={handleChange(setUsername)}
                        />
                      ) : (
                        <>
                          <ErrorControl
                            type="text"
                            value={username}
                            onChange={handleChange(setUsername)}
                          />
                          <ErrorText>Username is empty</ErrorText>
                        </>
                      )}
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      {isPasswordValid ? (
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={handleChange(setPassword)}
                        />
                      ) : (
                        <>
                          <ErrorControl
                            type="password"
                            value={password}
                            onChange={handleChange(setPassword)}
                          />
                          <ErrorText>Password is empty</ErrorText>
                        </>
                      )}
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Re-type Password</Form.Label>
                      {isRetypedValid ? (
                        <Form.Control
                          type="password"
                          value={retyped}
                          onChange={handleChange(setRetyped)}
                        />
                      ) : (
                        <>
                          <ErrorControl
                            type="password"
                            value={retyped}
                            onChange={handleChange(setRetyped)}
                          />
                          <ErrorText>Retyped password is empty</ErrorText>
                        </>
                      )}
                    </StyledGroup>
                    {errorMessage !== "" ? (
                      <>
                        <p></p>
                        <ErrorText>{errorMessage}</ErrorText>
                      </>
                    ) : null}
                  </Form>
                </Modal.Body>
                <StyledFooter>
                  <Button variant="danger" onClick={handleCloseRegister}>
                    Cancel
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
                <StyledItem onClick={handleLogout}>Logout</StyledItem>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Modal show={showLoggedInMessage} onHide={handleCloseLoggedInMessage}>
            <Modal.Body>
              <SuccessText>Login successful</SuccessText>
            </Modal.Body>
            <StyledFooter>
              <p />
              <StyledButton
                variant="secondary"
                onClick={handleCloseLoggedInMessage}
                text="Close"
              />
            </StyledFooter>
          </Modal>
          <Modal
            show={showRegisteredMessage}
            onHide={handleCloseRegisteredMessage}
          >
            <Modal.Body>
              <SuccessText>Account has be successfully created</SuccessText>
            </Modal.Body>
            <StyledFooter>
              <StyledButton
                variant="secondary"
                onClick={handleCloseRegisteredMessage}
                text="Close"
              />
              <StyledButton
                variant="secondary"
                onClick={() => {
                  handleCloseRegisteredMessage();
                  handleShowLogin();
                }}
                text="Go to Login"
              />
            </StyledFooter>
          </Modal>
          <Modal
            show={showLoggedOutMessage}
            onHide={handleCloseLoggedOutMessage}
          >
            <Modal.Body>
              <SuccessText>Successfully Logged out</SuccessText>
            </Modal.Body>
            <StyledFooter>
              <p />
              <StyledButton
                variant="secondary"
                onClick={handleCloseLoggedOutMessage}
                text="Close"
              />
            </StyledFooter>
          </Modal>
        </Container>
      </StyledNavbar>
      {props.children}
      <Footer />
    </>
  );
}

export default Panel;
