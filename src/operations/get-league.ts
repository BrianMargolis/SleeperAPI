import { Season } from '../model/league';
import { SleeperOperation } from './sleeper-operation';

export interface GetSeasonRequest {
    leagueId: string;
}

export class GetSeason extends SleeperOperation<GetSeasonRequest, Season> {
    constructor(request: GetSeasonRequest) {
        super({
            path: `league/${request.leagueId}`,
        });
    }

    public async execute(): Promise<Season> {
        return super.execute().then(json => ({
            totalRosters: json['total_rosters'],
            year: json['season'],
            seasonType: json['season_type'],
            previousLeagueId: json['previous_league_id'],
            name: json['name'],
            leagueId: json['league_id'],
            draftId: json['draft_id'],
        }));
    }
}
