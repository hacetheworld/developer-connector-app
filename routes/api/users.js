const express = require('express');
const router = express.Router();

// @Route  GET api/users
// @access public

router.get('/', (req, res) => {
    res.json({
        msg: 'users works..'
    });
});



module.exports = router;