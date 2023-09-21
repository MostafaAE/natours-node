const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'),
);

exports.checkId = (req, res, next, val) => {
  const tour = tours.find((el) => el.id === Number(val));

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));

  const updatedTour = {
    ...tour,
    ...req.body,
  };
  tours = tours.map((el) => {
    if (el.id === Number(id)) return updatedTour;
    return el;
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(200).json({
        status: 'success',
        data: {
          updatedTour,
        },
      });
    },
  );
};

exports.deleteTourById = (req, res) => {
  const { id } = req.params;

  tours = tours.filter((el) => el.id !== Number(id));

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
