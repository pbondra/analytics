export interface ITracker {
    gameDate: string;
    event: string;
    team: string;
    period: number;
    scoredGoal: boolean;
    scoredWithinFirst2MinsOfPeriod: boolean;
    scoredWithinLast2MinsOfPeriod: boolean;
    scoredWithin2MinsOwnGoal: boolean;
    scoredWithin2MinsOpponentsGoal: boolean;
    scoredUpon: boolean;
    scoredUponWithinFirst2MinsOfPeriod: boolean;
    scoredUponWithinLast2MinsOfPeriod: boolean;
    scoredUponWithin2MinsOwnGoal: boolean;
    scoredUponWithin2MinsOpponentsGoal: boolean;
}

export interface ILastGoalScored {
    scoredBy: string;
    scoredAt: string;
}