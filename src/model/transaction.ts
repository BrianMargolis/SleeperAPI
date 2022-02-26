export type Transaction = {
  type: string;
  id: string;
  statusUpdated: number;
  status: string;
  rostersInvolved: number[];
  week: number;
  creatorId: string;
  // details about what resources were actually swapped
  picks: PickTransaction[];
  faab: FAABTransaction[];
  drops: WaiverTransaction[];
  adds: WaiverTransaction[];
};

export type WaiverTransaction = {
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
