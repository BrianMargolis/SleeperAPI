import { Operation } from '../src';
import { SleeperClient } from '../src/client';
import { NetworkManager } from '../src/network-manager';
import { log } from '../src/util/util';

(async function test() {
    const client = new SleeperClient({
        leagueId: '650055255781916672',
    });

    const leagues = await client.getSeasons();
    // log(`${JSON.stringify(leagues, null, 2)}`);

    const transactions = await client.getTransactions(leagues);
    // log(`${JSON.stringify(transactions.slice(0, 3), null, 2)}`);
    const transactions2 = await client.getTransactions(leagues);
    // log(`${JSON.stringify(transactions.slice(0, 3), null, 2)}`);
})();
