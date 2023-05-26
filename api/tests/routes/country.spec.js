const { expect } = require('chai');
const app = require('../../src/app.js');
const request = require('supertest');
const { Country, conn } = require('../../src/db.js');

describe('Country routes - Argentina', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() =>
    Country.sync({ force: true }).then(() =>
      Country.create({
        id: 'ARG',
        name: 'Argentina',
        flag: 'arg.svg',
        continent: 'South America',
        capital: 'Buenos Aires',
        population: 45195774,
      })
    )
  );

  describe('GET /countries/ARG', () => {
    it('should get Argentina', async () => {
      const res = await request(app).get('/countries/ARG');

      expect(res.status).to.equal(200);

      const country = res.body;
      expect(country).to.be.an('object');
      expect(country.id).to.equal('ARG');
      expect(country.name).to.equal('Argentina');
      expect(country.flag).to.equal('arg.svg');
      expect(country.continent).to.equal('South America');
      expect(country.capital).to.equal('Buenos Aires');
      expect(country.population).to.equal(45195774);
    });
  });

  describe('GET /countries/XYZ', () => {
    it('should return 404 for non-existent country', async () => {
      const res = await request(app).get('/countries/XYZ');

      expect(res.status).to.equal(404);
    });
  });

  describe('GET /countries/', () => {
    it('should get all countries', async () => {
      const res = await request(app).get('/countries');

      expect(res.status).to.equal(200);

      const countries = res.body;
      expect(countries).to.be.an('array');
    });
  });

  describe('GET /countries?name=argentina', () => {
    it('should get countries that match query name', async () => {
      const res = await request(app).get('/countries?name=argentina');

      expect(res.status).to.equal(200);

      const countries = res.body;
      expect(countries).to.be.an('array');
      expect(countries.length).to.equal(1);
      expect(countries[0].name).to.equal('Argentina');
    });
  });
});
