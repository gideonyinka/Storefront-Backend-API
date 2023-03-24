import express, { NextFunction, Request, Response } from 'express';
import { productInfo, ProductStore } from '../models/products';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authoTokenVerify from '../middlewares/auth';
const store = new ProductStore();

const productIndex = async (req: Request, res: Response) => {
  try {
    const allProducts = await store.index();

    res.json(allProducts);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const productCreate = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const product_name = req.body.productName;
    const price = req.body.price;

    const createProducts = await store.create(product_name, price);

    res.json(createProducts);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const productShow = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const createProducts = await store.show(id);

    res.json(createProducts);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', productIndex);
  app.post('/products', authoTokenVerify, productCreate);
  app.get('/products/:id', productShow);
};

export default productRoutes;
