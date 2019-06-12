const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const question_controller = require('../controllers/question.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', question_controller.test);
module.exports = router;

router.post('/create', question_controller.question_create);

router.get('/:id', question_controller.question_details);

router.put('/:id/update', question_controller.question_update);

router.delete('/:id/delete', question_controller.question_delete);