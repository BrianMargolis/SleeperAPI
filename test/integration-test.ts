import { Operation } from '../src';
import { SleeperClient } from '../src/client';
import { TransactionType } from '../src/model/transaction';
import { NetworkManager } from '../src/network-manager';
import { log } from '../src/util/util';

(async function test() {
    const client = new SleeperClient({
        leagueId: '650055255781916672',
    });

    const leagues = await client.getSeasons();

    const transactions = await client.getTransactions(leagues);
    const trades = transactions.filter(tx => tx.type === TransactionType.TRADE);
    console.log(JSON.stringify(trades));
    // const commish = transactions.filter(tx => tx.type === TransactionType.COMMISSIONER)
    // console.log(commish)
})();
