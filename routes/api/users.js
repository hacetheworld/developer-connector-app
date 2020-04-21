const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
// Load user model
const User = require('../../models/User');



// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// @Route  GET api/users
// @access public

router.post('/register', async (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // check valiation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const isUserExistAlready = await User.findOne({
        email: req.body.email
    });

    if (isUserExistAlready) {
        res.status(400).json({
            msg: 'users exist..'
        });
    } else {
        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar

        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) throw error;
                newUser.password = hash;
                newUser.save().then(user => {
                    res.status(200).json({
                        msg: 'user Created succesfully',
                        user
                    });
                });

            });
        });

    }

});





// @Route  GET api/users
// @access public

router.post('/login', async (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email
    });

    if (user) {
        // user exist now validate it
        bcrypt.compare(password, user.password).then(isMatched => {
            if (isMatched) {

                const payload = {
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar
                }

                jwt.sign(
                    payload,
                    keys.secretORKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        res.status(200).json({
                            msg: 'success',
                            token: 'bearer ' + token
                        });
                    });


            } else {
                res.status(400).json({
                    password: 'password incorrect '
                });
            }
        })

    } else {
        res.status(400).json({
            email: 'users does not exist..'
        });

    }

});


// @Route  POST api/users/register
// @access public


router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    res.json({
        msg: 'Success',
        user: req.user

    })
});


module.exports = router;