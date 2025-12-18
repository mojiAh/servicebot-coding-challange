import { Worker } from "../models/Worker";
import { WorkerRepository } from "./WorkerRepository";
import workerData from "../../data/workers.json";
import botsData from "../../data/bots.json";

export class JsonWorkerRepository implements WorkerRepository {
    private readonly workers: Worker[];
    constructor() {
        // Normalize external JSON data: workers reference bots by name, domain uses botId.
        const botsNameToId = new Map(botsData.map(bot => [bot.name, bot.id]))
        this.workers = workerData.map(w => {
            const botId = botsNameToId.get(w.bot);
            if (!botId) {
                throw new Error(`invalid bot reference: ${w.bot}`);
            }
            const { bot, ...prunedWorker } = w;
            return { ...prunedWorker, botId }
        });
    }

    async findById(id: string): Promise<Worker | null> {
        const worker = this.workers.find(w => w.id === id);
        return worker ?? null;
    }

    async listByBot(botId: string): Promise<Worker[]> {
        return [...this.workers.filter(w => w.botId === botId)];
    }

}