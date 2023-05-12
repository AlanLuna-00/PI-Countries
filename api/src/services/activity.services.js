const { Activity, Country } = require('../db.js');

const createActivity = async ({ name, difficulty, duration, season, countryID }) => {
    try {
        const activity = await Activity.create({ name, difficulty, duration, season });
        const country = await Country.findAll({
            where: {
                id: countryID,
            },
        });
        const addActivity = await activity.addCountries(country);
        return addActivity;
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
}


module.exports = {
    createActivity,
    getActivities,
};