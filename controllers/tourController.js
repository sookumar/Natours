const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};
/* =====================
   GET ALL TOURS
===================== */
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

/* =====================
   GET SINGLE TOUR
===================== */
exports.getTour = (req, res) => {
  // const id = Number(req.params.id);
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

/* =====================
   CREATE TOUR
===================== */
exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = { id: newId, ...req.body };
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
};

/* =====================
   UPDATE TOUR (PATCH)
===================== */
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      // tour,
    },
  });
};

/* =====================
   DELETE TOUR
===================== */
exports.deleteTour = (req, res) => {
  // const id = Number(req.params.id);
  // const index = tours.findIndex((el) => el.id === id);
  // tours.splice(index, 1);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(204).json({
  //       status: 'success',
  //       data: null,
  //     });
  //   },
  // );
};
