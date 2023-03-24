import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  let token: string;
  beforeAll(async () => {
    const response = await request
      .post('/user')
      .set('Content-Type', 'application/json')
      .send({
        firstname: 'Afees',
        lastname: 'Akinade',
        password: 'gideon123'
      });

    token = response.body.headers.authorization.split(' ')[1];
  });

  beforeAll(async () => {
    const response = await request
      .post('/products')
      .set('Content-Type', 'application/json')
      .send({
        productName: 'diclomol',
        price: 300
      });
  });

  it('test the product create endpoint', async () => {
    const response = await request
      .post('/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it(' test product index endpoint for get', async () => {
    const response = await request
      .get('/products')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
  });

  it(' test product show endpoint for get', async () => {
    const response = await request
      .get('/products/1')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
  });
});
