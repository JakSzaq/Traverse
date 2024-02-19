const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getUserJourneys = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const userJourneys = user.journeys;

  res.status(200).json({
    status: 'success',
    results: userJourneys.length,
    data: {
      userJourneys,
    },
  });
});

exports.createUserJourney = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const journeys = user.journeys;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { journeys: [...journeys, req.body] },
    {
      new: true,
      runValidators: true,
    }
  );

  const arr2 = journeys;
  const arr1 = updatedUser.journeys;

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1._id.toString() === object2._id.toString();
      });
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      journey: getDifference(arr1, arr2)[0],
    },
  });
});

exports.getUserJourney = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  let journey = user.journeys.find(
    (journey) => journey._id == req.params.journeyId
  );

  if (journey == undefined) {
    journey = user.favourites.find(
      (journey) => journey._id == req.params.journeyId
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      journey: journey,
    },
  });
});

exports.deleteUserJourney = catchAsync(async (req, res, next) => {
  try {
    const { id, journeyId } = req.params;
    const user = await User.findById(id);
    user.journeys.remove(journeyId);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { journeys: user.journeys },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

exports.updateUserJourney = catchAsync(async (req, res, next) => {
  try {
    const { id, journeyId } = req.params;
    const journey = req.body;
    const user = await User.findById(id);
    const existingInJourneys = user.journeys.find(
      (journeyA) => journeyA._id == journey._id
    );
    const existingInFavourites = user.favourites.find(
      (favourite) => favourite._id == journey._id
    );

    if (existingInJourneys !== undefined) {
      const updatedUser = await User.findOneAndUpdate(
        { 'journeys._id': journey._id },
        {
          $set: {
            'journeys.$._id': journey._id,
            'journeys.$.startPlace': journey.startPlace,
            'journeys.$.endPlace': journey.endPlace,
            'journeys.$.startDate': journey.startDate,
            'journeys.$.endDate': journey.endDate,
            'journeys.$.transportType': journey.transportType,
            'journeys.$.length': journey.length,
            'journeys.$.journeyType': journey.journeyType,
            'journeys.$.items': journey.items,
            'journeys.$.people': journey.people,
            'journeys.$.fuel': journey.fuel,
          },
        },
        { new: true }
      );
      res.status(200).json(journey);
    }
    if (existingInFavourites !== undefined) {
      const updatedUser = await User.findOneAndUpdate(
        { 'favourites._id': journey._id },
        {
          $set: {
            'favourites.$._id': journey._id,
            'favourites.$.startPlace': journey.startPlace,
            'favourites.$.endPlace': journey.endPlace,
            'favourites.$.startDate': journey.startDate,
            'favourites.$.endDate': journey.endDate,
            'favourites.$.transportType': journey.transportType,
            'favourites.$.length': journey.length,
            'favourites.$.journeyType': journey.journeyType,
            'favourites.$.items': journey.items,
            'favourites.$.people': journey.people,
            'favourites.$.fuel': journey.fuel,
          },
        },
        { new: true }
      );
      res.status(200).json(journey);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

exports.getUserFavourites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const userFavourites = user.favourites;

  res.status(200).json({
    status: 'success',
    results: userFavourites.length,
    data: {
      userFavourites,
    },
  });
});

exports.toggleFavourites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const favourites = user.favourites;

  const isFavourite = favourites.some((o) => o.id === req.body._id);

  if (isFavourite) {
    favourites.remove(req.body._id);
  } else {
    favourites.push(req.body);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { favourites: favourites },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      favourites: updatedUser.favourites,
      isFavourite: isFavourite,
    },
  });
});
