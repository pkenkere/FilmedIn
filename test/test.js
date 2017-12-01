process.env.ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let should = chai.should();
let server = require('../server'); // TODO: use your server file

chai.use(chaiHttp);

//testing server start
describe('1. Testing server start', () => {
  describe('GET /', ()=>{
    it('it should send 200', (done) => {
      chai.request(server)
        .get('/')
        .end((err,res) => {
          res.should.have.status(200);
          done();
        });
    })
  });
});

/*descrbe('2. Testing POST /equipment/checkout', () => {
  describe('POST /equipment/checkout', () => {
    it('it should send 200', (done) => {
      chai.request(server)
        .post('/equipment/checkout')
        .end((err,res) => {

        });
    })
  });
});*/
