const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const fuelPriceController = require('../controllers/fuelPriceController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router
  .route('/fuelPrices')
  .get(fuelPriceController.getPrices)
  .patch(fuelPriceController.updatePrices);

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

router
  .route('/journeys/:id/:journeyId')
  .get(userController.getUserJourney)
  .delete(userController.deleteUserJourney)
  .patch(userController.updateUserJourney);

router
  .route('/favourites/:id')
  .get(userController.getUserFavourites)
  .patch(userController.toggleFavourites);

module.exports = router;
