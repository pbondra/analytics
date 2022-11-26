export interface IDateData {
    dates: IGameDate[];
    totalItems: bigint;
}

export interface IGameDate {
    date: string;
    games: IGameData[];
}

export interface IGameData {
    link: string;
    teams: ITeams;
}

export interface ITeams {
    away: ITeam;
    home: ITeam;
}

export interface ITeam {
    team: ITeamInfo;
}

export interface ITeamInfo {
    name: string;
}
