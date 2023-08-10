//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const exp = require("constants");
const { log } = require("console");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  // connect mongo
  await mongoose.connect("mongodb://localhost:27017/userDB").then(() => {
    console.log("connected to mongo");
  });
}
// schema declared
const userSchema = {
  email: String,
  password: String,
};
// model created
const User = new mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
// creating new user
app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save().then((err) => {
    if (err) {
      console.log("new user created");

      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

// listening on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("connected to port 3000");
});
