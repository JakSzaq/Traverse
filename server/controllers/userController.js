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

exports.getUserJourneys = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id, (err) => {
    if (err.name === 'CastError') {
      console.log(err);
      next();
    } else next(new AppError('No user found with that ID', 404));
  });

  const userJourneys = user.journeys;

  res.status(200).json({
    status: 'success',
    results: userJourneys.length,
    data: {
      userJourneys,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

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

  res.status(200).json({
    status: 'success',
    data: {
      journeys: updatedUser.journeys,
    },
  });
});

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
