import { Log } from "../models/Log";
import { LogRepository } from "./LogRepository";
import logsData from "../../data/logs.json";

export class JsonLogRepository implements LogRepository {
    private readonly logs: Log[];

    constructor() {
        this.logs = logsData.map(l => (
            {
                id: l.id,
                message: l.message,
                created: l.created,
                botId: l.bot,
                workerId: l.worker
            }
        ));
    }

    async listByBot(botId: string): Promise<Log[]> {
        return [...this.logs.filter(l => l.botId === botId)];
    }

    async listByBotAndWorker(botId: string, workerId: string): Promise<Log[]> {
        return [...this.logs.filter(l => l.botId === botId && l.workerId === workerId)]
    }
}