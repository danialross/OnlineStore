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
import ModalWithMessage from "./ModalWithMessage";
import addToCartContext from "../context/AddToCartContext";

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

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  padding: 1rem;
  color: #89abe3;
  text-align: center;
  height: 10rem;
`;

const urls = new Map();
urls.set("/login", "http://localhost:3000/login");
urls.set("/register", "http://localhost:3000/register");
urls.set("/checkout", "http://localhost:3000/checkout");
urls.set("/cart", "http://localhost:3000/cart");
urls.set("/items", "http://localhost:3000/items/");
urls.set("/logout", "http://localhost:3000/logout");
urls.set("/verify", "http://localhost:3000/verify");
urls.set("/change-password", "http://localhost:3000/change-password");
urls.set(
  "/increase-item-quantity",
  "http://localhost:3000/increase-item-quantity"
);
urls.set(
  "/decrease-item-quantity",
  "http://localhost:3000/decrease-item-quantity"
);

function Panel(props) {
  const [user, setUser] = useState({ username: "", token: "" });
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [retyped, setRetyped] = useState("");
  const [isRetypedValid, setIsRetypedValid] = useState(true);
  const [cart, setCart] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const clearInput = (isLoggingIn) => {
    //isLoggingIn can be true for validating during logging in or false for validating during registering
    setUsername("");
    setPassword("");

    if (!isLoggingIn) {
      setRetyped("");
    }
  };

  const handleShow = (setter) => {
    setter(true);
  };

  const handleClose = (setter) => {
    setter(false);
  };

  const handleCloseLogin = () => {
    setErrorMessage("");
    setIsUsernameValid(true);
    setIsPasswordValid(true);
    setShowLogin(false);
    clearInput(true);
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
          setPassword("");
        } else {
          const userData = { username: username, token: res.data.token };
          //remove object and replace as string
          setUser(userData);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          handleUpdateCart();
          handleCloseLogin();
          handleShow(setShowLoggedInMessage);
        }
      })
      .catch((err) => {
        console.error(err);
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

    const url = urls.get("/register");

    const register = { username: username, password: password };

    axios.post(url, register).catch((err) => {
      console.error({ error: err });
    });

    handleCloseRegister();
    handleShow(setShowRegisteredMessage);
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value.trim());
  };

  const handleLogout = () => {
    const url = urls.get("/logout");
    console.log("url " + url);
    axios
      .get(url)
      .then(() => {
        handleShow(setShowLoggedOutMessage);
        setUser({ username: "", token: "" });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateCart = () => {
    const cartUrl = urls.get("/cart");
    const itemUrl = urls.get("/items");

    const cartWithDetails = [];

    axios
      .get(cartUrl)
      .then(async (res) => {
        const result = res.data;

        for (const object of result) {
          await axios
            .get(itemUrl + object.id)
            .then((res) => {
              cartWithDetails.push({
                item: res.data.item,
                quantity: object.quantity,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
        setCart(cartWithDetails);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckout = () => {
    const body = { username: user.username };
    const url = urls.get("/checkout");
    axios
      .put(url, body)
      .then(() => {
        handleUpdateCart();
        handleClose(setShowCart);
        handleShow(setShowCheckoutMessage);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseResetPass = () => {
    setShowReset(false);
    setPassword("");
    setRetyped("");
    setErrorMessage("");
  };

  const handleShowVerification = () => {
    setShowVerification(true);
    setIsPasswordValid(true);
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
    setPassword("");
    setErrorMessage("");
  };

  const handleVerify = () => {
    if (password.length === 0) {
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
    }

    const url = urls.get("/verify");
    const body = { username: user.username, password: password };
    console.log(body);
    axios
      .post(url, body)
      .then((res) => {
        console.log(res.data);
        if (res.data.result === "verified") {
          handleShow(setShowReset);
          handleCloseVerification();
          setErrorMessage("");
        } else {
          setErrorMessage("Incorrect Password");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleResetPassword = () => {
    const url = urls.get("/change-password");

    if (password.length === 0) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }

    if (retyped.length === 0) {
      setIsRetypedValid(false);
      return;
    } else {
      setIsRetypedValid(true);
    }

    if (retyped !== password) {
      setErrorMessage("Passwords Do Not Match");
      return;
    } else {
      setErrorMessage("");
    }

    const body = { username: user.username, password: password };

    axios
      .put(url, body)
      .then(() => {
        handleCloseResetPass();
        handleShow(setShowResetMessage);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddToCart = (id) => {
    if (user.username !== "") {
      const url = urls.get("/increase-item-quantity");
      const body = { username: user.username, id: id };

      axios
        .put(url, body)
        .then((res) => {
          handleUpdateCart();
          handleShow(setShowAddedToCartMessage);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      handleShow(setShowLogin);
      return;
    }
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
                onClick={() => handleShow(setShowLogin)}
              ></StyledButton>
            </>
          ) : (
            <Dropdown>
              <StyledDropDown id="dropdown-basic" variant="secondary">
                {user.username}
              </StyledDropDown>

              <Dropdown.Menu>
                <StyledItem
                  onClick={() => {
                    handleShow(setShowCart);
                  }}
                >
                  Cart
                </StyledItem>
                <StyledItem onClick={handleShowVerification}>
                  Change Password
                </StyledItem>
                <Dropdown.Divider />
                <StyledItem onClick={handleLogout}>Logout</StyledItem>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Modal show={showLogin} onHide={handleCloseLogin}>
            <Modal.Header>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                    handleShow(setShowRegister);
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
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
          <ModalWithMessage
            show={showLoggedInMessage}
            message={"Login Successful"}
            hide={() => handleClose(setShowLoggedInMessage)}
          />
          <ModalWithMessage
            show={showLoggedOutMessage}
            message={"Log Out Successful"}
            hide={() => handleClose(setShowLoggedOutMessage)}
          />
          <ModalWithMessage
            show={showRegisteredMessage}
            message={"Account Created Successfully"}
            hide={() => handleClose(setShowRegisteredMessage)}
            secondButton={
              <StyledButton
                variant="secondary"
                onClick={() => {
                  handleClose(setShowRegisteredMessage);
                  handleShow(setShowLogin);
                }}
                text="Go to Login"
              />
            }
          />
          <ModalWithMessage
            show={showResetMessage}
            message={"Reset Password Successful"}
            hide={() => handleClose(setShowResetMessage)}
          />
          <ModalWithMessage
            show={showCheckoutMessage}
            message={"Checkout Successful"}
            hide={() => handleClose(setShowCheckoutMessage)}
          />
          <ModalWithMessage
            show={showAddedToCartMessage}
            message={"Item Added To Cart"}
            hide={() => handleClose(setShowAddedToCartMessage)}
          />
          <Modal show={showCart} onHide={() => handleClose(setShowCart)}>
            <Modal.Body>
              <Title>Cart</Title>
              {cart.length > 0 ? (
                cart.map((object) => {
                  return (
                    <CartItem
                      key={object.item.id}
                      id={object.item.id}
                      username={user.username}
                      image={object.item.image}
                      title={object.item.title}
                      price={object.item.price}
                      quantity={object.quantity}
                      updateParent={handleUpdateCart}
                    />
                  );
                })
              ) : (
                <EmptyCart>No Items In Cart</EmptyCart>
              )}
            </Modal.Body>
            <StyledFooter>
              <StyledButton
                variant="secondary"
                onClick={() => handleClose(setShowCart)}
                text="Close"
              />
              <StyledButton
                variant="secondary"
                disabled={cart.length === 0}
                onClick={handleCheckout}
                text="Checkout"
              />
            </StyledFooter>
          </Modal>
          <Modal show={showVerification} onHide={handleCloseVerification}>
            <Modal.Header>Enter Current Password</Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <StyledGroup>
                  <Form.Label>Password</Form.Label>
                  <UserInput
                    isInputValid={isPasswordValid}
                    input={"Password"}
                    type="password"
                    value={password}
                    onChange={handleChange(setPassword)}
                  />
                  <ErrorMessage message={errorMessage} />
                </StyledGroup>
              </Form>
            </Modal.Body>
            <StyledFooter>
              <StyledButton
                variant="secondary"
                text="Close"
                onClick={handleCloseVerification}
              />
              <StyledButton
                variant="secondary"
                text="Confirm"
                onClick={handleVerify}
              />
            </StyledFooter>
          </Modal>
          <Modal show={showReset} onHide={handleCloseResetPass}>
            <Modal.Header>Enter New Password</Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                  <ErrorMessage message={errorMessage} />
                </StyledGroup>
              </Form>
            </Modal.Body>
            <StyledFooter>
              <StyledButton
                variant="secondary"
                text={"Close"}
                onClick={handleCloseResetPass}
              />
              <StyledButton
                variant="secondary"
                text={"Confirm"}
                onClick={handleResetPassword}
              />
            </StyledFooter>
          </Modal>
        </Container>
      </StyledNavbar>
      <addToCartContext.Provider value={{ handleAddToCart }}>
        {props.children}
      </addToCartContext.Provider>
      <Footer />
    </>
  );
}

export default Panel;
