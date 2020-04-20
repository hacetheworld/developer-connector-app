const express = require("express");
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 3000;


//
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// DB CONFIG
const db = require('./config/keys').mongoURI;

// connect DB
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => console.log('connected...'))
    .catch(err => console.log(err));


// Middle ware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


//Passport Middleware

app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

// default
// app.get('/', (req, res) => {
//     res.send('Hello world !!')
// });

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);

})