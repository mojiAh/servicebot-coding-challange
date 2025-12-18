import { Log } from "../models/Log";

export interface LogRepository {
    listByBot: (botId: string) => Promise<Log[]>;
    listByBotAndWorker: (botId: string, workerId: string) => Promise<Log[]>
}