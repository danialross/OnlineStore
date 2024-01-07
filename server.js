const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const users = [];
const blacklist = [];

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
const secretKey = "super-secret-key";

const initializeDB = async () => {
  const accounts = [
    {
      username: "customer1",
      password: "qwerty",
      cart: [
        { id: 9, quantity: 2 },
        { id: 10, quantity: 1 },
        { id: 11, quantity: 1 },
      ],
    },
    {
      username: "customer2",
      password: "asdfgh",
      cart: [
        { id: 17, quantity: 1 },
        { id: 18, quantity: 1 },
      ],
    },
    {
      username: "customer3",
      password: "zxcvbn",
      cart: [
        { id: 6, quantity: 1 },
        { id: 7, quantity: 2 },
        { id: 8, quantity: 1 },
      ],
    },
  ];
  for (const account of accounts) {
    try {
      const hashedPassword = await bcrypt.hash(account.password, saltRounds);

      const user = {
        username: account.username,
        password: hashedPassword,
        cart: account.cart,
      };
      users.push(user);
    } catch {
      console.error("Error hashing initialization data");
    }
  }
};

initializeDB();

//check database
//testing purposes
app.get("/login", (req, res) => {
  res.status(200).json({ users: users });
});

//get all items
app.get("/items", async (req, res) => {
  try {
    const result = await axios.get("https://fakestoreapi.com/products");
    const products = result.data;
    console.log(products);
    res.status(200).json({ items: products });
  } catch (e) {
    console.error("Something Went Wrong");
    res.status(400).json({ err: e });
  }
});

//get single item
app.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await axios.get("https://fakestoreapi.com/products/" + id);
    const product = result.data;
    console.log(product);
    res.status(200).json({ item: product });
  } catch (e) {
    console.error("Something Went Wrong");
    res.status(400).json({ err: e });
  }
});

// check credentials
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(200).json({ token: "" });
  }

  // Retrieve hashed password from database
  try {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ username: username }, secretKey, {
        expiresIn: "1h",
      });

      // Send the token in the response
      res.status(200).json({ token: token });
    } else {
      res.status(200).json({ token: "" });
    }
  } catch {
    return res.status(500).json({ err: "Error while comparing passwords" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  const isBlackListed = blacklist.includes(token);

  if (!token || isBlackListed) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

//get cart
app.get("/cart", authenticateToken, (req, res) => {
  const account = users.find((account) => {
    return account.username === req.user.username;
  });
  console.log(account.cart);
  res.status(200).json(account.cart);
});

//log out
app.get("/logout", authenticateToken, (req, res) => {
  const token = req.headers.authorization.substring(7);
  blacklist.push(token);
  console.log(blacklist);
  res.status(200).json({ message: "Logout successful" });
});

// add item
app.put("/increase-item-quantity", authenticateToken, (req, res) => {
  const itemId = req.body.id;
  const username = req.body.username;

  const user = users.find((user) => {
    return user.username === username;
  });

  const itemInCart = user.cart.find((item) => {
    return item.id === itemId;
  });
  if (itemInCart) {
    itemInCart.quantity = ++itemInCart.quantity;
  } else {
    const cartItem = { id: itemId, quantity: 1 };
    user.cart.push(cartItem);
  }
  res.status(200).json("item id: " + itemId + " added.");
});

// reduce item
app.put("/decrease-item-quantity", authenticateToken, (req, res) => {
  const itemId = req.body.id;
  const username = req.body.username;
  const isRemoving = req.body.isRemoving;

  const user = users.find((user) => {
    return user.username === username;
  });

  const itemInCart = user.cart.find((item) => {
    return item.id === itemId;
  });

  if (isRemoving === true || itemInCart.quantity === 1) {
    const arrayWithoutItem = user.cart.filter((item) => {
      return item.id !== itemId;
    });
    user.cart = arrayWithoutItem;
    res.status(200).json("item id: " + itemId + " removed");
  } else {
    itemInCart.quantity = --itemInCart.quantity;
    res.status(200).json("item id: " + itemId + " reduced.");
  }
});

//check out
app.put("/checkout", authenticateToken, async (req, res) => {
  const username = req.body.username;

  const user = users.find((user) => {
    return user.username === username;
  });

  user.cart = [];

  res.status(200).json("user has checked out, cart is now empty");
});

//verify password for resetting purpose
app.post("/verify", authenticateToken, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const currUser = users.find((user) => {
    return user.username === username;
  });

  try {
    const result = await bcrypt.compare(password, currUser.password);
    if (result) {
      res.status(200).json({ result: "verified" });
    } else {
      res.status(200).json({ result: "unverified" });
    }
  } catch (err) {
    console.error(err);
  }
});

//update password
app.put("/change-password", authenticateToken, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const currUser = users.find((user) => {
    return user.username === username;
  });

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    currUser.password = hashedPassword;
    res.status(200).json({ message: username + " has changed passwords" });
  } catch {
    console.error("Error while changing password");
    res.status(500);
  }
});

//sign up
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      username: username,
      password: hashedPassword,
      cart: [],
    };
    users.push(user);
    console.log(users);
    res.status(200).json({ message: username + " created" });
  } catch {
    console.error("Error while creating user");
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
