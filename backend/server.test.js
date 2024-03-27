import { app, io } from "./server.js";
import supertest from "supertest";
import mongoose from "mongoose";

const request = supertest(app);

describe("/health endpoint", () => {
  it("should return a response", async () => {
    const response = await request.get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Health check passed",
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  io.close();
});
