const app = require('../../src/app.js');
const request = require('supertest');
const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country routes - Argentina', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    beforeEach(() => Country.sync({ force: true })
        .then(() => Country.create({
            id: 'ARG',
            name: 'Argentina',
            flag: 'arg.png',
            continent: 'South America',
            capital: 'Buenos Aires',
            population: 45195774,
        })));

    describe('GET /countries/ARG', () => {
        it('should get Argentina', async () => {
            const res = await request(app).get('/countries/ARG');

            expect(res.status).to.equal(200);

            const country = res.body;
            expect(country).to.be.an('object');
            expect(country.id).to.equal('ARG');
            expect(country.name).to.equal('Argentina');
            expect(country.flag).to.equal('arg.png');
            expect(country.continent).to.equal('South America');
            expect(country.capital).to.equal('Buenos Aires');
            expect(country.population).to.equal(45195774);
            // Agrega más expectativas según la respuesta esperada para Argentina
        });

        it('should return 404 for non-existent country', async () => {
            const res = await request(app).get('/countries/XYZ');

            expect(res.status).to.equal(404);
            // Agrega más expectativas según la respuesta esperada para un país que no existe
        });
    });

    // Agrega más pruebas para otros endpoints específicos de Argentina

});
