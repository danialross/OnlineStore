const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const users = [];
app.use(express.json());

const initializeDB = () => {
  const accounts = [
    { username: "admin", password: "qwerty" },
    { username: "customer1", password: "asdfgh" },
    { username: "customer2", password: "zxcvbn" },
  ];
  for (const account of accounts) {
    bcrypt.hash(account.password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error while hashing password:", err);
      } else {
        const user = { username: account.username, password: hash, cart: [] };
        users.push(user);
      }
    });
  }
};

initializeDB();

app.get("/login", (req, res) => {
  res.status(200).json({ users: users });
});

// check credentials
app.post("/login", (req, res) => {
  let message = "";
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(200).json({ message: "Unauthorized" });
  }

  // Retrieve hashed password from your database
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(400).json({ err: "Error while comparing passwords:" });
    } else {
      if (result) {
        message = "Authorized";
      } else {
        message = "Unauthorized";
      }

      res.status(200).json({ message: message });
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
