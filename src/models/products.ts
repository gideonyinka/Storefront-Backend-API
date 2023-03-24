import express from 'express';
import dotenv from 'dotenv';
import client from '../database';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const SALT_ROUND = process.env.SALT_ROUNDS;

export type productInfo = {
  id: string;
  product_name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<productInfo[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get products: ${err}`);
    }
  }
  async show(id: string): Promise<productInfo> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to show ${id}. Error: ${err}`);
    }
  }
  async create(product_name: string, price: number): Promise<productInfo> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *`;
      const results = await conn.query(sql, [product_name, price]);

      const productOrder = results.rows[0];

      conn.release();

      return productOrder;
    } catch (err) {
      throw new Error(`unable to create ${product_name}: ${err}`);
    }
  }
}
