import express, { NextFunction, Request, Response } from 'express';
import { User, Customerdetails } from '../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authoTokenVerify from '../middlewares/auth';

dotenv.config();

const store = new Customerdetails();

const index = async (_req: Request, res: Response) => {
  try {
    const weapons = await store.index();
    res.json(weapons);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const showUser = await store.show(id);

    res.json(showUser);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const first_name = req.body.firstname;
    const last_name = req.body.lastname;
    const password_digest = req.body.password;

    const log = await store.create(first_name, last_name, password_digest);

    var token = jwt.sign(
      { first_name: log, password_digest: log },
      process.env.TOKEN_SECRET as string,
      { expiresIn: '2d' }
    );
    res.send({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/user', authoTokenVerify, index);
  app.post('/user', create);
  app.get('/user/:id', authoTokenVerify, show);
};

export default user_routes;
