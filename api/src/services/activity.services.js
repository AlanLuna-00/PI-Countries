const { Activity, Country } = require('../db.js');

const createActivity = async ({ name, difficulty, duration, season, countriesID }) => {
    try {
        const activity = await Activity.create({ name, difficulty, duration, season, countriesID });

        // Buscar los países por sus IDs
        const countries = await Country.findAll({
            where: {
                id: countriesID,
            },
        });

        // Asociar la actividad a los países encontrados
        await activity.setCountries(countries);

        return activity;
    } catch (error) {
        console.log(error);
    }
};

const getActivities = async () => {
    try {
        const activities = await Activity.findAll();
        return activities;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createActivity,
    getActivities,
};
