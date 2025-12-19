import { Router, Request } from "express";
import { LogRepository } from "../../repositories/LogRepository";
import { listLogsForBot } from "../../usecases/listLogsForBot";
import { listLogsForWorker } from "../../usecases/listLogsForWorker";

type BotLogsParams = {
  botId: string;
};
export function createBotLogsRouter(logRepository: LogRepository) {
  const router = Router();

  router.get("/", async (req: Request<BotLogsParams>, res, next) => {
    try {
      const botId = req.params.botId;
      const list = await listLogsForBot(logRepository, botId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  });
  return router;
}

type WorkerLogsParams = {
  botId: string;
  workerId: string;
};
export function createWorkerLogsRouter(logRepository: LogRepository) {
  const router = Router();

  router.get("/", async (req: Request<WorkerLogsParams>, res, next) => {
    try {
      const { botId, workerId } = req.params;
      const list = await listLogsForWorker(logRepository, botId, workerId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  });
  return router;
}
