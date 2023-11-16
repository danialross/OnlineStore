const express = require("express");
const bcrypt = require("bcrypt");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const users = [];
app.use(express.json());

const initializeDB = () => {
  const accounts = [
    {
      username: "customer1",
      password: "qwerty",
      cart: [
        { id: 9, quantity: 1 },
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
    bcrypt.hash(account.password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error while hashing password:", err);
      } else {
        const user = {
          username: account.username,
          password: hash,
          cart: account.cart,
        };
        users.push(user);
      }
    });
  }
};

initializeDB();

//check database
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
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(200).json({ data: "" });
  }

  // Retrieve hashed password from your database
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ err: "Error while comparing passwords:" });
    } else {
      if (result) {
        res.status(200).json({ data: user });
      } else {
        res.status(200).json({ data: "" });
      }
    }
  });
});

//sign up
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error while hashing password:", err);
    } else {
      const user = { username: username, password: hash, cart: [] };
      users.push(user);
      console.log(users);
      res.status(200).json({ message: user.username + " created" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
