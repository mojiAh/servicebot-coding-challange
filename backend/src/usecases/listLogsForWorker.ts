import { Log } from "../models/Log";
import { LogRepository } from "../repositories/LogRepository";

export async function listLogsForWorker(
  logRepository: LogRepository,
  botId: string,
  workerId: string
): Promise<Log[]> {
  // TODO: Consider validating bot existence and throwing if botId or workerId is invalid.
  // Current behavior returns empty array to keep the API simple.

  return logRepository.listByBotAndWorker(botId, workerId);
}
