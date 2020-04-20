const express = require('express');
const router = express.Router();

// @Route  GET api/posts
// @access public

router.get('/', (req, res) => {
    res.json({
        msg: 'posts works..'
    });
});



module.exports = router;