// export and import all controllers in this file

const router = require('express').Router();
const homeRoutes = require('./home_routes');
const userRoutes = require('./user_routes');

router.use('/', homeRoutes);
router.use('/', userRoutes);

module.exports = router;