/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err)
    })
  )

describe('/api/dogs', function() {
  it('GET respons with status 200', function(){
    return agent
      .get('/api/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  }).timeout(10000)
  it('Elements received are Object type',  function() {
    return agent 
      .get('/api/dogs') 
      .expect(function(res) {
        expect(typeof res.body[0]).equal('object'); 
      });
  }).timeout(10000)
})
describe('/api/dogs?name=', function() {
  it('GET receives a body lenght larger if there is query coincidences',  function() {
    return agent 
      .get('/api/dogs?name=toy') 
      .expect(function(res) {
        expect(res.body.length).equal(5); 
      });
  }).timeout(3000)
})
describe('/api/dogs/:id', function() {
  it('GET responses with status 200 if a dog is found',  function() {
    return agent 
      .get('/api/dogs/13') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  it('GET gets dog data by the :id as a parameter',  function() {
    return agent 
      .get('/api/dogs/13')
      .expect(function(res) {
        expect(res.body.name).equal('American Eskimo Dog (Miniature)'); 
      });
  }).timeout(10000)
})

});