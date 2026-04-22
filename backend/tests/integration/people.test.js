const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../src/app');
const connection = require('../../src/db/connection');
const { peopleList } = require('../mocks/peopleList');

describe('Testando os endpoints de people', function () {
  it('POST /people', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await chai
      .request(app)
      .post('/people')
      .send({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'luke.skywalker@trybe.com',
        phone: '851 678 4453',
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({
      message: 'Pessoa cadastrada com sucesso com o id: 42'
    });
  });

  it('GET /people', async function () {
    sinon.stub(connection, 'execute').resolves([peopleList]);

    const response = await chai
      .request(app)
      .get('/people');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(peopleList);
  });

  it('GET/:id /people', async function () {
    sinon.stub(connection, 'execute').resolves([[peopleList[0]]]);

    const response = await chai
    .request(app)
    .get('/people/1');
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(peopleList[0]);
  });

  it('PUT/:id /people', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);

    const response = await chai
    .request(app)
    .put('/people/2')
    .send({
        firstName: 'william',
        lastName: 'Nunes',
        email: 'william@gmail.com',
        phone: '851 889 4453',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: `Pessoa de id 2 atualizada com sucesso!` });
  });

  it('DELETE/:id /people', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await chai
    .request(app)
    .delete('/people/2');
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Pessoa de id 2 deletada com sucesso!' });
  });

  afterEach(() => sinon.restore());
});