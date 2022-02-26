export type Transaction = {
    type: TransactionType;
    id: string;
    statusUpdated: number;
    created: number;
    status: string;
    rostersInvolved: number[];
    week: number;
    creatorId: string;
    // details about what resources were actually swapped
    picks: PickTransaction[];
    faab: FAABTransaction[];
    drops: PlayerTransaction[];
    adds: PlayerTransaction[];
};

export enum TransactionType {
    WAIVER = 'waiver',
    FREE_AGENT = 'free_agent',
    TRADE = 'trade',
    COMMISSIONER = 'commissioner',
}

export type PlayerTransaction = {
    playerId: string;
    rosterId: number;
    bid: number;
};

export type FAABTransaction = {
    senderId: number;
    receiverId: number;
    amount: number;
};

export type PickTransaction = {
    season: string;
    round: number;
    // who had this pick (initially)
    originalOwnerId: number;
    // who had this pick before the trade
    previousOwnerId: number;
    // who has this pick after the trade
    newOwnerId: number;
};
