export interface ISchedule {
    dates: IScheduleData[];
    totalItems: number;
}

export interface IScheduleData {
    date: string;
    games: IGameData[];
}

export interface IGameData {
    link: string;
    gameType: string;
    season: string;
}
