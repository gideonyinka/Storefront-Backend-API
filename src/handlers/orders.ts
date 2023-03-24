import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Ordered, OrderUpdated, ProductOrders } from '../models/orders';
import authoTokenVerify from '../middlewares/auth';

const store = new ProductOrders();

const addedProducts = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.product_id;
    const quantity: number = req.body.quantity;
    const order_id: string = req.body.order_id;

    const productAdd = await store.addProducts(order_id, product_id, quantity);
    res.json(productAdd);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  }
};

const orderIndex = async (req: Request, res: Response) => {
  try {
    const allOrders = await store.index();
    res.json(allOrders);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const orderCreate = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user_id = req.body.user_id;
    const status = req.body.status;

    const createOrder = await store.create(user_id, status);

    res.json(createOrder);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
const orderShow = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const showOrders = await store.show(id);

    res.json(showOrders);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/orders/products', authoTokenVerify, addedProducts);
  app.get('/orders', authoTokenVerify, orderIndex);
  app.post('/orders', authoTokenVerify, orderCreate);
  app.get('/orders/:id', authoTokenVerify, orderShow);
};

export default orderRoutes;
