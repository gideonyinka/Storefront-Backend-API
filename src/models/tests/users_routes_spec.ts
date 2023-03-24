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
        firstname: 'Femi',
        lastname: 'Taiwo',
        password: 'Pass142'
      });

    token = response.body.headers.authorization.split(' ')[1];
  });
  it('test if the create endpoint respond and test index endpoint for get', async () => {
    const response = await request
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test the show endpoint for get', async () => {
    const response = await request
      .get('/user/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
