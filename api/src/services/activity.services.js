const { Activity, Country } = require('../db.js');

const createActivity = async (Activity) => {
    const activity = await Activity.create({
        name: Activity.name,
        difficulty: Activity.difficulty,
        duration: Activity.duration,
        season: Activity.season,
    });

    Promise.all(Activity.countries.map(async (country) => {
        const countryFound = await Country.findOne({
            where: { id: country.id },
        });
        await activity.addCountry(countryFound);
    }
    ));
    return activity;
};