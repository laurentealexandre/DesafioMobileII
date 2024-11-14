const request = require('supertest');
const app = require('../app');

describe('Testes de Cliente', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({
        usuario: 'teste',
        senha: 'teste123'
      });
    
    token = response.body.token;
  });

  test('Deve validar campos do cliente', async () => {
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Jo',  // nome inválido (menor que 3 caracteres)
        sobrenome: 'Silva',
        email: 'joao@example.com',
        idade: 30
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Nome inválido');
  });

  test('Deve validar token na chamada de clientes', async () => {
    const response = await request(app)
      .get('/clientes');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido');
  });

  // Mais testes...
});