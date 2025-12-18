import { Bot } from "../models/Bot";
import { BotRepository } from "./BotRepository";
import botsData from "../../data/bots.json";

export class JsonBotRepository implements BotRepository {
    private readonly bots: Bot[];
    constructor() {
        this.bots = botsData as Bot[];
    }
    async list(): Promise<Bot[]> {
        return [...this.bots];
    }
    async findById(id: string): Promise<Bot | null> {
        const bot = this.bots.find(b => b.id === id);
        return bot ?? null;
    }
}
