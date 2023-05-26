const app = require('../../src/app.js');
const request = require('supertest');
const { Activity, conn } = require('../../src/db.js');

describe('Activity routes', () => {

    before(() =>
        conn.authenticate().catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    beforeEach(() => Activity.sync({ force: true })
        .then(() => Activity.create({
            name: 'Futbol',
            difficulty: 5,
            duration: 1,
            season: 'Summer',
            countriesID: ['ARG']
        }))
    );

    describe('GET /activities', () => {
        it('should get 200', () =>
            request(app)
                .get('/activities')
                .expect(200)
        );
    }
    );

    describe('POST /activity', () => {
        it('should get 200', () =>
            request(app)
                .post('/activities')
                .send({
                    name: 'Futbol',
                    difficulty: 5,
                    duration: 5,
                    season: 'Summer',
                    countriesID: ['ARG', 'BRA']
                })
                .expect(200)
        );
    }
    );

});