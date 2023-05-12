const { Router } = require('express');

const { getCountries, getCountryByIdController } = require('../controllers/country.controller');

const countriesRouter = Router();

countriesRouter.get('/', getCountries);

countriesRouter.get('/:id', getCountryByIdController);


module.exports = countriesRouter;