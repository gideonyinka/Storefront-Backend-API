import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  password_digest: string;
};

export class Customerdetails {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to show ${id}. Error: ${err}`);
    }
  }

  async getUserByFirstname(first_name: string): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE first_name=$1`;

      const result = await conn.query(sql, [first_name]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to retrieve the user with ${first_name}. Error ${error}`
      );
    }
  }

  async create(
    first_name: string,
    last_name: string,
    password_digest: string
  ): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *`;
      const hash = bcrypt.hashSync(password_digest + pepper, 10);
      const result = await conn.query(sql, [first_name, last_name, hash]);
      const user = result.rows[0];

      conn.release;

      return user;
    } catch (err) {
      throw new Error(`unable to create user ${first_name} : ${err}`);
    }
  }
}
