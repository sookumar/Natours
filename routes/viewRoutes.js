const express = require('express');
const viewsController = require('../controllers/viewController');

const router = express.Router();

router.get('/');

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

//  /login
router.get('/login', viewsController.getLoginForm);

module.exports = router;
