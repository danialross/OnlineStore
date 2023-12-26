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
import UserInput from "./UserInput";
import ErrorMessage from "./ErrorMessage";
import CartItem from "./CartItem";

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

const SuccessText = styled(Form.Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: green;
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.div`
  border-radius: 5px;
  outline: 2px solid #89abe3;
  color: #89abe3;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const urls = new Map();
urls.set("/login", "http://localhost:3000/login");
urls.set("/register", "http://localhost:3000/register");
urls.set("/checkout", "http://localhost:3000/checkout");
urls.set("/cart", "http://localhost:3000/cart");
urls.set("/items", "http://localhost:3000/items/");

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
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

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

    const url = urls.get("/login");

    const login = { username: username, password: password };

    axios
      .post(url, login)
      .then((res) => {
        if (res.data.token === "") {
          setErrorMessage("Invalid username or password.");
        } else {
          const userData = { username: username, token: res.data.token };
          //remove object and replace as string
          setUser(userData);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          handleUpdateCart();
          handleCloseLogin();
          handleShowLoggedInMessage();
        }
      })
      .catch((err) => {});
  };
  const handleRegister = () => {
    if (!isInputValid(false)) {
      return;
    }

    if (password !== retyped) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const url = urls.get("/register");

    const register = { username: username, password: password };

    axios.post(url, register).catch((err) => {
      console.error({ error: err });
    });

    handleCloseRegister();
    handleShowRegisteredMessage();
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value.trim());
  };

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
    const url = urls.get("/logout");
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

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleUpdateCart = () => {
    const url = urls.get("/cart");
    const cartWithDetails = [];

    axios
      .get(url)
      .then((res) => {
        for (const item of res.data) {
          const url = urls.get("/items");
          const itemInCart = { item: {}, quantity: item.quantity };
          console.log(res.data);

          axios
            .get(url + item.id)
            .then((res) => {
              console.log("item " + res.data.item);
              itemInCart.item = res.data.item;
              console.log(itemInCart);
              cartWithDetails.push(itemInCart);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        console.log(cartWithDetails);
        setCart(cartWithDetails);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckout = () => {
    const url = urls.get("/checkout");
    axios.put(url).catch((err) => {
      console.error(err);
    });
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
                      <UserInput
                        isInputValid={isUsernameValid}
                        input={"Username"}
                        type="text"
                        value={username}
                        onChange={handleChange(setUsername)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      <UserInput
                        isInputValid={isPasswordValid}
                        input={"Password"}
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                      />
                    </StyledGroup>

                    <ClickableText
                      onClick={() => {
                        handleCloseLogin();
                        handleShowRegister();
                      }}
                    >
                      Register
                    </ClickableText>

                    <ErrorMessage message={errorMessage} />
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
                      <UserInput
                        isInputValid={isUsernameValid}
                        input={"Username"}
                        type="text"
                        value={username}
                        onChange={handleChange(setUsername)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Password</Form.Label>
                      <UserInput
                        isInputValid={isPasswordValid}
                        input={"Password"}
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                      />
                    </StyledGroup>
                    <StyledGroup>
                      <Form.Label>Re-type Password</Form.Label>
                      <UserInput
                        isInputValid={isRetypedValid}
                        input={"Retyped Password"}
                        type="password"
                        value={retyped}
                        onChange={handleChange(setRetyped)}
                      />
                    </StyledGroup>
                    <ErrorMessage message={errorMessage} />
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
                <StyledItem onClick={handleShowCart}>Cart</StyledItem>
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
              <SuccessText>Account Created Successfully</SuccessText>
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
              <SuccessText>Log Out Successful</SuccessText>
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

          <Modal show={showCart} onHide={handleCloseCart}>
            <Modal.Body>
              <Title>Cart</Title>
              {cart.map((object) => {
                return (
                  <CartItem
                    image={object.item.image}
                    title={object.item.title}
                    price={object.item.price}
                    quantity={object.quantity}
                  />
                );
              })}
            </Modal.Body>
            <StyledFooter>
              <StyledButton
                variant="secondary"
                onClick={handleCloseCart}
                text="Close"
              />
              <StyledButton
                variant="secondary"
                onClick={handleCheckout}
                text="Checkout"
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
