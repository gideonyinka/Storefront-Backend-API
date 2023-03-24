import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  let token: string;

  beforeAll(async () => {
    const createuser = await request
      .post('/user')
      .set('Content-Type', 'application/json')
      .send({
        firstname: 'Opeyemi',
        lastname: 'Akinolu',
        password: 'pass24'
      });

    token = createuser.body.headers.authorization.split(' ')[1];
    
    const createproduct = await request
    .post('/orders')
    .set('Content-Type', 'application/json')
    .send({
      user_id: '1',
      status: 'complete'
    });

    const createorder = await request
    .post('/orders/products')
    .set('Content-Type', 'application/json')
    .send({
      order_id: '1',
      product_id: '1',
      quantity: 30
    });

  })   
  
  it(' test order index endpoint for get', async () => {
    const response = await request
      .post('/orders/products')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test the order create endpoint for post', async () => {
    const response = await request
      .post('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it(' test order index endpoint for get', async () => {
    const response = await request
      .get('/orders')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it(' test order show endpoint for get', async () => {
    const response = await request
      .get('/orders/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
