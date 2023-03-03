// export and import all controllers in this file

const router = require('express').Router();
const homeRoutes = require('./home_routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard_routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;