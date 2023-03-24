import express from 'express';
import dotenv from 'dotenv';
import client from '../database';

export type Ordered = {
  order_id: string;
  status: string;
  user_id: string;
};

export type OrderUpdated = {
  order_id: string;
  product_id: string;
  quantity: number;
};

export class ProductOrders {
  async addProducts(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<OrderUpdated> {
    try {
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;

      //@ts-ignore

      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to ${order_id}: ${err}`
      );
    }
  }
  async index(): Promise<Ordered[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get products: ${err}`);
    }
  }
  async show(id: string): Promise<Ordered> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=$1`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to show ${id}. Error: ${err}`);
    }
  }
  async create(user_id: string, status: string): Promise<Ordered> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`;
      const results = await conn.query(sql, [user_id, status]);

      const productOrder = results.rows[0];

      conn.release();

      return productOrder;
    } catch (err) {
      throw new Error(`unable to create ${user_id}: ${err}`);
    }
  }
}
