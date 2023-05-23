const { expect } = require('chai');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

describe('Country routes - Argentina', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create({
      id: 'ARG',
      name: 'Argentina',
      flag: 'arg.scg',
      continent: 'South America',
      capital: 'Buenos Aires',
      population: 45195774,
    })));

  describe('GET /countries/ARG', () => {
    it('should get Argentina', async () => {
      const res = await app.get({
        method: 'GET',
        url: '/countries/ARG',
      });

      expect(res.statusCode).to.equal(200);

      const country = JSON.parse(res.payload);
      expect(country).to.be.an('object');
      expect(country.id).to.equal('ARG');
      expect(country.name).to.equal('Argentina');
      expect(country.flag).to.equal('arg.svg');
      expect(country.continent).to.equal('South America');
      expect(country.capital).to.equal('Buenos Aires');
      expect(country.population).to.equal(45195774);
    });

    it('should return 404 for non-existent country', async () => {
      const res = await app.get({
        method: 'GET',
        url: '/countries/XYZ',
      });

      expect(res.statusCode).to.equal(404);
      // Agrega más expectativas según la respuesta esperada para un país que no existe
    });
  });

  // Agrega más pruebas para otros endpoints específicos de Argentina

});
