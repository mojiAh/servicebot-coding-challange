import { Router } from "express";
import { listBots } from "../../usecases/listBots";
import { BotRepository } from "../../repositories/BotRepository";

export function createBotsRouter(botRepository: BotRepository) {
  const router = Router();

  router.get("/", async (_req, res, next) => {
    try {
      const list = await listBots(botRepository);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  });
  return router;
}
