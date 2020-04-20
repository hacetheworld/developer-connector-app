const express = require('express');
const router = express.Router();

// @Route  GET api/profile
// @access public

router.get('/', (req, res) => {
    res.json({
        msg: 'profiles works..'
    });
});



module.exports = router;