import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import { Connection } from "typeorm";

import createConnection from "@shared/infra/typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = uuid();

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      password: "admin",
      email: "admin@admin.com.br",
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(400);
  });
});