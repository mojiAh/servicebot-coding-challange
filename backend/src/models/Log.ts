export type Log = {
    id: string;
    message: string;
    bot: string;        //TODO: bot => botId
    worker: string;     //TODO: worker => workerId
    created: string;    //TODO: ISO string => Epoc timestamp       
}