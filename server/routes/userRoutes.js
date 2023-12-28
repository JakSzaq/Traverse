const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const fuelPriceController = require('../controllers/fuelPriceController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/getFuelPrices', fuelPriceController.getPrices);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/journeys/:id')
  .get(userController.getUserJourneys)
  .patch(userController.createUserJourney);

module.exports = router;
