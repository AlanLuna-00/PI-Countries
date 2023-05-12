const { Router } = require('express');

const { getActivitiesController, postActivity } = require('../controllers/activity.controller');

const activitiesRouter = Router();

activitiesRouter.get('/', getActivitiesController);

activitiesRouter.post('/', postActivity);

module.exports = activitiesRouter;