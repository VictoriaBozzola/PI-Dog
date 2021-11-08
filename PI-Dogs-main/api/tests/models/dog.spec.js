const { Dog, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
        it('Should not be created without all required fields completed', function(done) {
        Temperament.create({
          id: '11',
        })
        .then(() => done('Should not have been created, dude!'))
        .catch(() => done());
      });
      it('Name should be a string', function(){
        expect(typeof Temperament.name).equal("string")
      })
    });
});
