import "reflect-metadata";
import express from "express";
import {router} from "./routes";
import swagger from "swagger-ui-express";
import swaggerJSON from "./swagger.json";


import "./database";

import "./shared/container"

const app = express();

app.use(express.json());

app.use(router);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerJSON));

app.listen(3333, () => console.log("server is running!"));