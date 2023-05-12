const axios = require('axios');
const { Country, Activity } = require('../db.js');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');


const getCountriesApi = async () => {
    try {
        let api = await axios.get('https://restcountries.com/v3/all');
        api = api.data?.map((c) => {
            return {
                id: c.cca3,
                name: c.name.common,
                flag: c.flags[0],
                continent: c.continents[0],
                capital: c.capital ? c.capital[0] : 'No capital',
                subregion: c.subregion,
                area: c.area,
                population: c.population,
            };
        });

        let db = await Country.findAll();
        if (db.length === 0) {
            await Country.bulkCreate(api);
        }

        let allCountries = await Country.findAll({
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },
        });

        allCountries = allCountries.map((c) => {
            return {
                id: c.id,
                name: c.name,
                flag: c.flag,
                continent: c.continent,
                capital: c.capital,
                subregion: c.subregion,
                area: c.area,
                population: c.population,
                activities: c.activities?.map((a) => {
                    return {
                        name: a.name,
                        difficulty: a.difficulty,
                        duration: a.duration,
                        season: a.season,
                    };
                }
                ),
            };
        });

        return allCountries;

    } catch (error) {
        console.log(error);
    }
};

const searchCountryByName = async (name) => {
    try {
        const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: {
                model: Activity,
            },
        });
        return country;
    } catch (error) {
        console.log(error);
    }
}

const getCountryById = async (id) => {
    try {
        let country = await Country.findByPk(id, {
            include: {
                model: Activity,
            },
        });
        return country;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCountriesApi,
    searchCountryByName,
    getCountryById,
};
