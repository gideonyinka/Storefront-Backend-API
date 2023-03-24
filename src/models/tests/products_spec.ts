import { productInfo, ProductStore } from '../products';

const store = new ProductStore();

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

  it('Test index method', async function () {
    const product_name = 'Panadol';
    const price = 300;

    const productCreator = await store.create(product_name, price);

    const getProducts = await store.index();

    expect(getProducts.length).toBeGreaterThan(0);
  });

  it('Test create method', async () => {
    const product_name = 'Panadol';
    const price = 300;

    const productCreator = await store.create(product_name, price);

    expect(Object.keys(productCreator).length).toEqual(3);
  });

  it('Test show method', async () => {
    const getProductId = await store.show('1');

    expect(Object.keys(getProductId).length).toEqual(3);
  });
});
