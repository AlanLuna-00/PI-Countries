const { getCountriesApi, searchCountryByName, getCountryById } = require('../services/country.services');
const { Country, Activity } = require('../db.js');

const getCountries = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const country = await searchCountryByName(name);
            res.status(200).json(country);
        } else {
            const countries = await getCountriesApi();
            res.status(200).json(countries);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting countries' });
    }
}

// get country by id
const getCountryByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const country = await getCountryById(id);
        country ? res.status(200).json(country) : res.status(404).json({ message: 'Country not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error getting country' });
    }
}



module.exports = {
    getCountries,
    getCountryByIdController,
};
