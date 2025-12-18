import { Worker } from "../models/Worker";

export interface WorkerRepository {
    findById: (id: string) => Promise<Worker | null>
    listByBot: (botId: string) => Promise<Worker[]>
}