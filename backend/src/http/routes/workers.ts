import { Router, Request } from "express";
import { WorkerRepository } from "../../repositories/WorkerRepository";
import { listWorkersForBot } from "../../usecases/listWorkersForBot";

type WorkersParams = {
  botId: string;
};

export function createWorkersRouter(workerRepository: WorkerRepository) {
  const router = Router();

  router.get("/", async (req: Request<WorkersParams>, res, next) => {
    try {
      const { botId } = req.params;
      const list = await listWorkersForBot(workerRepository, botId);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
