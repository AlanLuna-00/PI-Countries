const axios = require('axios');
const { Country, Activity } = require('../db.js');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

const countries = async () => {
    try {
        const api = await axios.get('https://restcountries.com/v3/all');
        const countries = api.data?.map(async (country) => {
            await Country.findOrCreate({
                where: {
                    id: country.cca3,
                    name: country.name.common,
                    flag: country.flags[0],
                    continent: country.continent[0],
                    capital: country.capital ? country.capital[0] : 'No capital',
                    subregion: country.subregion || 'No subregion',
                    area: country.area,
                    population: country.population,
                },
                row: false
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};

const getCountriesApi = async () => {
    try {
        const countriesData = await countries();
        const getCountries = await Country.findAll({
            attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population'],
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },
        });
        return getCountries;
    } catch (error) {
        console.log(error);
    }
};

const getDetailCountry = async (id) => {
    try {
        const countriesData = await countries();
        const ID = id.toUpperCase();
        const detailCountry = await Country.findOne({
            where: { id: ID },
            attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population'],
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },
        });
        return detailCountry;
    } catch (error) {
        console.log(error);
    }
};

const searchCountryByName = async (name) => {
    try {
        const countriesData = await countries();
        const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
                raw: true
            },
        });
        Promise.all(country)
        if (country.length > 0) {
            return country;
        } return 'Country not found';
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    countries,
    getCountriesApi,
    getDetailCountry,
    searchCountryByName,
};
