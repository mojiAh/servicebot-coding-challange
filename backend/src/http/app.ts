import express from "express";
import cors from "cors";
import { JsonBotRepository } from "../repositories/JsonBotRepository";
import { JsonWorkerRepository } from "../repositories/JsonWorkerRepository";
import { JsonLogRepository } from "../repositories/JsonLogRepository";
import { createBotsRouter } from "./routes/bots";
import { createWorkersRouter } from "./routes/workers";
import { createBotLogsRouter, createWorkerLogsRouter } from "./routes/logs";

export const app = express();

app.use(cors());
app.use(express.json());

const jsonBotRepository = new JsonBotRepository();
const jsonWorkerRepository = new JsonWorkerRepository();
const jsonLogRepository = new JsonLogRepository();

app.use("/bots", createBotsRouter(jsonBotRepository));
app.use("/bots/:botId/workers", createWorkersRouter(jsonWorkerRepository));
app.use("/bots/:botId/logs", createBotLogsRouter(jsonLogRepository));
app.use(
  "/bots/:botId/workers/:workerId/logs",
  createWorkerLogsRouter(jsonLogRepository)
);
