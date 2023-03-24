import express, { NextFunction, Request, Response } from 'express';
import { User, Customerdetails } from '../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const store = new Customerdetails();

const authoTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenAuth = req.headers.authorization?.split(' ')[1];
    // verify token not missing
    if (!tokenAuth) {
      throw new Error('Unauthorized, please pass in a token');
    }

    // Verify Invalid token
    const tokenDecode = jwt.verify(
      tokenAuth as string,
      process.env.TOKEN_SECRET as string
    );

    const user = await store.getUserByFirstname(
      (tokenDecode as any).first_name
    );

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(401).json(`${err}`);
  }
};

export default authoTokenVerify;
