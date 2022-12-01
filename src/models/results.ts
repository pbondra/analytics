export interface IResult {
    copyright: string;
    gamePk: number;
    link: string;
    gameData: IGameInfo;
    liveData: ILiveData;
}

export interface IGameInfo {
    teams: ITeams;
}

export interface ITeams {
    away: ITeamData;
    home: ITeamData;
}

export interface ITeamData {
    name: string;
    triCode: string;
}

export interface ILiveData {
    plays: IPlays;
}

export interface IPlays {
    allPlays: IGameEvents[];
}

export interface IGameEvents {
    result: IPlayResult;
    about: IPlayInfo;
    team: ITeamInfo;
}

export interface IPlayResult {
    event: string;
}

export interface IPlayInfo {
    period: number;
    periodTime: string;
    periodTimeRemaining: string;
}

export interface ITeamInfo {
    triCode: string;
}