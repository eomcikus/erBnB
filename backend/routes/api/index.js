const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingsRouter = require('./bookings.js');
const reviewsRouter = require('./reviews.js');
const reviewImagesRouter = require('./review-images.js');
const spotImagesrouter = require('./spot-images.js');
const { restoreUser } = require("../../utils/auth.js");

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});
const mapsRouter = require('./maps');

router.use('/maps', mapsRouter);

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/bookings', bookingsRouter);

router.use('/reviews', reviewsRouter);

router.use('/review-images', reviewImagesRouter);

router.use('/spot-images', spotImagesrouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;