const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const port = process.env.PORT || 5000;
const path = require("path");
//
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// DB CONFIG
const db = require("./config/keys").mongoURI;
console.log(db);

// connect DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("connected..."))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Passport Middleware

app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// default
// app.get('/', (req, res) => {
//     res.send('Hello world !!')
// });

// USE ROUTES
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// server static
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
