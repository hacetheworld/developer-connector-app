const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

// Load user model
const User = require('../../models/User');



// @Route  GET api/users
// @access public

router.post('/register', async (req, res) => {
    const isUserExistAlready = await User.findOne({
        email: req.body.email
    });

    if (isUserExistAlready) {
        res.status(400).json({
            msg: 'users exist..'
        });
    } else {
        console.log(req.body);
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

        console.log(newUser);

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



// @Route  POST api/users/register
// @access public

// router.post('/register', (req, res) => {
//     res.json({
//         msg: 'users Registerd..'
//     });
// });


module.exports = router;