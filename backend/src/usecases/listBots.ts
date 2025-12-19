import { Bot } from "../models/Bot";
import { BotRepository } from "../repositories/BotRepository";

export async function listBots(botRepository: BotRepository): Promise<Bot[]> {
  return botRepository.list();
}
