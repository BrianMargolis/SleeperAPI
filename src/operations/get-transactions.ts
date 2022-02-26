import { Transaction } from "../model/transaction";
import { SleeperOperation } from "./sleeper-operation";

export interface TransactionsRequest {
  leagueId: string;
  week: number;
}

export class GetTransactions extends SleeperOperation<TransactionsRequest, Transaction[]> {
  constructor(request: TransactionsRequest) {
    super({
      path: `league/${request.leagueId}/transactions/${request.week}`,
    });
  }

  public async execute(): Promise<Transaction[]> {
    return super.execute().then(records =>
      records.map(record => {
        const transaction: Transaction = {
          type: record["type"],
          id: record["transaction_id"],
          statusUpdated: parseInt(record["status_updated"]),
          status: record["status"],
          rostersInvolved: record["roster_ids"],
          week: record["leg"],
          creatorId: record["creator"],
          // details about what resources were actually swapped
          picks: record["draft_picks"]?.map((pick) => ({
            season: pick["season"],
            round: pick["round"],
            originalOwnerId: pick["roster_id"],
            previousOwnerId: pick["previous_owner_id"],
            newOwnerId: pick["owner_id"],
          })),
          faab: record["waiver_budget"]?.map((waiver) => ({
            senderId: waiver["sender"],
            receiverId: waiver["receiver"],
            amount: waiver["amount"],
          })),
          drops: Object.keys(record["drops"] ?? {}).map((player) => ({
            playerId: player,
            rosterId: record["drops"][player],
            bid: 0,
          })),
          adds: Object.keys(record["adds"] ?? {}).map((player) => ({
            playerId: player,
            rosterId: record["adds"][player],
            bid: record["settings"]?.waiver_bid ?? 0,
          })),
        };
        return transaction;
      })
    );
  }
}
