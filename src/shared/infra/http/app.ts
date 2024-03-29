import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { router } from "./routes";
import swagger from "swagger-ui-express";
import swaggerJSON from "../../../swagger.json";

import { AppError } from "../../errors/AppError";

import createConnection from "../typeorm";

import "../../container"

const app = express();

createConnection();
app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerJSON));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
})

export { app };