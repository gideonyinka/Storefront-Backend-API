import { Ordered, ProductOrders } from '../orders';

const store = new ProductOrders();

describe("users' Mode", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.create).toBeDefined();
  });

  it('Test add product method', async function () {
    const quantity = 40;
    const order_id = '1';
    const product_id = '1';

    const orderAddProduct = await store.addProducts(
      order_id,
      product_id,
      quantity
    );

    expect(Object.keys(orderAddProduct).length).toEqual(4);
  });

  it('Test create method', async () => {
    const user_id = '1';
    const status = 'complete';

    const orderCreator = await store.create(user_id, status);

    expect(Object.keys(orderCreator).length).toEqual(5);
  });

  it('Test show method', async () => {
    const user_id = '1';
    const status = 'complete';

    const orderShow = await store.show('1');

    expect(Object.keys(orderShow).length).toEqual(5);
  });
  it('Test index method', async () => {
    const user_id = '1';
    const status = 'complete';

    const orderIndex = await store.index();

    expect(Object.keys(orderIndex).length).toBeGreaterThan(0);
  });
});
