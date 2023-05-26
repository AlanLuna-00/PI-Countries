const app = require('../../src/app.js');
const request = require('supertest');
const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Activity routes', () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    beforeEach(() =>
        Activity.sync({ force: true }).then(() =>
            Activity.create({
                name: 'Futbol',
                difficulty: 5,
                duration: 1,
                season: 'Summer',
                countriesID: ['ARG'],
            })
        )
    );

    describe('GET /activities', () => {
        it('should get 200', async () => {
            const res = await request(app).get('/activities');
            expect(res.status).to.equal(200);
            const activities = res.body;
            expect(activities).to.be.an('array');
            expect(activities.length).to.equal(1);
            expect(activities[0].name).to.equal('Futbol');
            expect(activities[0].difficulty).to.equal("5");
            expect(activities[0].duration).to.equal(1);
            expect(activities[0].season).to.equal('Summer');
            expect(activities[0].countriesID).to.deep.equal(['ARG']);
        });
    });

    describe('POST /activity', () => {
        it('should get 200', async () => {
            const res = await request(app)
                .post('/activities')
                .send({
                    name: 'Basketball',
                    difficulty: 3,
                    duration: 2,
                    season: 'Winter',
                    countriesID: ['USA', 'CAN'],
                });

            expect(res.status).to.equal(200);
            const activity = res.body;
            expect(activity).to.be.an('object');
            expect(activity.name).to.equal('Basketball');
            expect(activity.difficulty).to.equal("3");
            expect(activity.duration).to.equal(2);
            expect(activity.season).to.equal('Winter');
            expect(activity.countriesID).to.deep.equal(['USA', 'CAN']);
        });
    });
});
