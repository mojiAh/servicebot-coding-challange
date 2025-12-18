export type BotStatus = "DISABLED" | "ENABLED" | "PAUSED";

export type Bot = {
    id: string;
    name: string;
    description?: string;
    status: BotStatus;
    created: number;        //Epoc timestamp
}