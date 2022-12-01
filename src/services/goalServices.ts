import { IGameEvents } from "../models/results";
import { ITracker } from "../models/tracker";

export function setScoredGoal(scheduleDate: string, gameEvent: IGameEvents): ITracker {
    let teamTracker: ITracker = { 
        gameDate: scheduleDate,
        event: gameEvent.result.event,
        team: gameEvent.team.triCode,
        period: gameEvent.about.period,
        scoredGoal: true,
        scoredWithinFirst2MinsOfPeriod: false,
        scoredWithinLast2MinsOfPeriod: false,
        scoredWithin2MinsOwnGoal: false,
        scoredWithin2MinsOpponentsGoal: false,
        scoredUpon: false,
        scoredUponWithinFirst2MinsOfPeriod: false,
        scoredUponWithinLast2MinsOfPeriod: false,
        scoredUponWithin2MinsOwnGoal: false,
        scoredUponWithin2MinsOpponentsGoal: false,
        };

    return teamTracker;
}
export function setScoredUponGoal(scheduleDate: string, gameEvent: IGameEvents): ITracker {
    let teamTracker: ITracker = { 
        gameDate: scheduleDate,
        event: gameEvent.result.event,
        team: gameEvent.team.triCode,
        period: gameEvent.about.period,
        scoredGoal: false,
        scoredWithinFirst2MinsOfPeriod: false,
        scoredWithinLast2MinsOfPeriod: false,
        scoredWithin2MinsOwnGoal: false,
        scoredWithin2MinsOpponentsGoal: false,
        scoredUpon: true,
        scoredUponWithinFirst2MinsOfPeriod: false,
        scoredUponWithinLast2MinsOfPeriod: false,
        scoredUponWithin2MinsOwnGoal: false,
        scoredUponWithin2MinsOpponentsGoal: false,
        };

    return teamTracker;
}