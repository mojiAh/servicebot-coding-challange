export type Worker = {
    id: string;
    name: string;
    description?: string;
    bot: string;        //TODO: use bot id instead
    created: number;    //Epoc time
}