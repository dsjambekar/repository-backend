const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
module.exports = router;

router.get('/:idToken/verify', user_controller.verify);

router.get('/:id', user_controller.user_details);

router.post('/create', user_controller.user_create);