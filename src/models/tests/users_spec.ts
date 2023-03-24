import { User, Customerdetails } from '../users';

const store = new Customerdetails();

describe(' Test users endpoint', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('Test index method', async function () {
    const first_name = 'Gabriel';
    const last_name = 'Okunola';
    const password = 'pass123';

    await store.create(first_name, last_name, password);

    const getUsers = await store.index();

    expect(getUsers.length).toBeGreaterThan(0);
  });

  it('Test create method', async () => {
    const first_name = 'Gabriel';
    const last_name = 'Okunola';
    const password = 'pass12';

    const userCreator = await store.create(first_name, last_name, password);

    expect(
      await Object.keys(userCreator).forEach(function (first_name) {
        if (userCreator['first_name'] == 'Gabriel') {
          return console.log('exists');
        }
      })
    ).toEqual(console.log('exists'));
  });

  it('Test show method', async () => {
    const first_name = 'Gabriel';
    const last_name = 'Okunola';
    const password = 'pass12';

    const getUserById = await store.show('1');

    expect(
      await Object.keys(getUserById).forEach(function (last_name) {
        if (getUserById['last_name'] == 'Okunola') {
          return console.log('exists');
        }
      })
    ).toEqual(console.log('exists'));
  });
});
