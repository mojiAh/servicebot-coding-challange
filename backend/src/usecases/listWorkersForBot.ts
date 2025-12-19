import { Worker } from "../models/Worker";
import { WorkerRepository } from "../repositories/WorkerRepository";

export async function listWorkersForBot(
  workerRepository: WorkerRepository,
  botId: string
): Promise<Worker[]> {
  // TODO: Consider validating bot existence and throwing if botId is invalid.
  // Current behavior returns empty array to keep the API simple.

  return workerRepository.listByBot(botId);
}
