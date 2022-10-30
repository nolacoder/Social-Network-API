const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/courses', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
