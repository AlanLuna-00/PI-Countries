const { createActivity, getActivities, } = require('../services/activity.services');

const postActivity = async (req, res) => {
    const { name, difficulty, duration, season, countriesID } = req.body;
    try {
        const activity = await createActivity({ name, difficulty, duration, season, countriesID });
        res.status(200).send('Activity created successfully')
    } catch (error) {
        res.status(500).json({ message: 'Error creating activity' });
    }
}

const getActivitiesController = async (req, res) => {
    try {
        const activities = await getActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error getting activities' });
    }
}

module.exports = {
    postActivity,
    getActivitiesController,
};