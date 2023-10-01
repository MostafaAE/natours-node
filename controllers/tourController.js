const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours
  //   }
  // });
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  // const tour = tours.find(el => el.id === Number(id));

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // await Tour.save();
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.updateTourById = (req, res) => {};

exports.deleteTourById = (req, res) => {};
