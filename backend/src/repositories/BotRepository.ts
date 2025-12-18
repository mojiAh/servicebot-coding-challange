import { Bot } from "../models/Bot";

export interface BotRepository {
    list: () => Promise<Bot[]>;
    findById: (id: string) => Promise<Bot | null>;
}