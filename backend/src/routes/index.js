const express = require('express');
const router = express.Router();

const peopleRoutes = require('./peopleRoutes');

router.use("/people", peopleRoutes);


module.exports = router;