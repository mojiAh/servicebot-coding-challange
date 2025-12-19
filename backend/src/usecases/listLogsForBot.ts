import { Log } from "../models/Log";
import { LogRepository } from "../repositories/LogRepository";

export async function listLogsForBot(
  logRepository: LogRepository,
  botId: string
): Promise<Log[]> {
  // TODO: Consider validating bot existence and throwing if botId is invalid.
  // Current behavior returns empty array to keep the API simple.

  return logRepository.listByBot(botId);
}
