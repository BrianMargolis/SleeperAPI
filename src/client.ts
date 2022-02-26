import { InMemoryCache } from './cache/in-memory';
import { LEAGUE_WEEKS, MAX_TPS } from './constants';
import { Season } from './model/league';
import { Transaction } from './model/transaction';
import { NetworkManager } from './network-manager';
import { GetSeason } from './operations/get-league';
import { GetTransactions } from './operations/get-transactions';
import { Operation } from './operations/operation';
import { range } from './util/util';

export interface SleeperClientProps {
    leagueId: string;
}

export class SleeperClient {
    private readonly networkManager: NetworkManager;

    constructor(private readonly props: SleeperClientProps) {
        this.networkManager = new NetworkManager({
          maxTPS: MAX_TPS,
          cache: new InMemoryCache()
        });
    }

    /**
     * Get the most recent season for the league.
     *
     * @returns
     */
    public async getSeason(): Promise<Season> {
        return this.execute(
            new GetSeason({
                leagueId: this.props.leagueId,
            })
        );
    }

    /**
     * Get all the seasons that the league has participated in.
     *
     * @returns
     */
    public async getSeasons(): Promise<Season[]> {
        var league = await this.execute(
            new GetSeason({
                leagueId: this.props.leagueId,
            })
        );

        const leagues = [league];
        while (league.previousLeagueId) {
            league = await this.execute(
                new GetSeason({
                    leagueId: league.previousLeagueId,
                })
            );
            leagues.push(league);
        }

        return leagues;
    }

    public async getTransactions(seasons?: Season[]): Promise<Transaction[]> {
        // perform GetTransaction calls for every week in every league season
        return Promise.all(
            (seasons ?? (await this.getSeasons())).map(season =>
                Promise.all(
                    range(1, LEAGUE_WEEKS[season.year]).map(week =>
                        this.execute(
                            new GetTransactions({
                                leagueId: season.leagueId,
                                week: week,
                            })
                        )
                    )
                )
            )
        ).then(transactions => transactions.flat(2));
    }

    private async execute<O>(operation: Operation<any, O>): Promise<O> {
        return this.networkManager.request(operation);
    }
}
