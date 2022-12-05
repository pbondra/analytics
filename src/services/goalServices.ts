import { appendFile, writeFileSync } from "fs";
import { IGameEvents } from "../models/results";
import { ILastGoalScored, ITracker } from "../models/tracker";

export function setScoredGoal(
    season: string, 
    gameType: string, 
    scheduleDate: string, 
    team: string,
    opponent: string,
    lastGoal: ILastGoalScored,
    gameEvent: IGameEvents): ITracker {
    let teamTracker: ITracker = { 
        season: season,
        gameType: convertGameType(gameType),
        gameDate: scheduleDate,
        event: gameEvent.result.event,
        team: team,
        opponent: opponent,
        period: gameEvent.about.period,
        scoredGoal: true,
        scoredWithinFirst2MinsOfPeriod: checkForGoalWithinTimePeriod(gameEvent.about.periodTime, '00:00', 2),
        scoredWithinLast2MinsOfPeriod: checkForGoalWithinTimePeriod(gameEvent.about.periodTimeRemaining, '00:00', 2),
        scoredWithin2MinsOwnGoal: checkForGoalWithinTimePeriodByTeam(lastGoal, team, true, gameEvent.about.periodTime, 2),
        scoredWithin2MinsOpponentsGoal: checkForGoalWithinTimePeriodByTeam(lastGoal, team, false, gameEvent.about.periodTime, 2),
        scoredUpon: false,
        scoredUponWithinFirst2MinsOfPeriod: false,
        scoredUponWithinLast2MinsOfPeriod: false,
        scoredUponWithin2MinsOwnGoal: false,
        scoredUponWithin2MinsOpponentsGoal: false,
        };

    return teamTracker;
}
export function setScoredUponGoal(
    season: string, 
    gameType: string, 
    scheduleDate: string, 
    team: string,
    opponent: string,
    lastGoal: ILastGoalScored,
    gameEvent: IGameEvents): ITracker {
    let teamTracker: ITracker = { 
        season: season,
        gameType: convertGameType(gameType),
        gameDate: scheduleDate,
        event: gameEvent.result.event,
        team: team,
        opponent: opponent,
        period: gameEvent.about.period,
        scoredGoal: false,
        scoredWithinFirst2MinsOfPeriod: false,
        scoredWithinLast2MinsOfPeriod: false,
        scoredWithin2MinsOwnGoal: false,
        scoredWithin2MinsOpponentsGoal: false,
        scoredUpon: true,
        scoredUponWithinFirst2MinsOfPeriod: checkForGoalWithinTimePeriod(gameEvent.about.periodTime, '00:00', 2),
        scoredUponWithinLast2MinsOfPeriod: checkForGoalWithinTimePeriod(gameEvent.about.periodTimeRemaining, '00:00', 2),
        scoredUponWithin2MinsOwnGoal: checkForGoalWithinTimePeriodByTeam(lastGoal, team, false, gameEvent.about.periodTime, 2),
        scoredUponWithin2MinsOpponentsGoal: checkForGoalWithinTimePeriodByTeam(lastGoal, team, true, gameEvent.about.periodTime, 2),
        };

    return teamTracker;
}

export function displayScoringHeaders(teamTracker: ITracker): void {
    /**
    console.log(
        teamTracker.season
        + ';' + teamTracker.gameDate
        + ';' + teamTracker.event
        + ';' + teamTracker.team
        + ';' + teamTracker.period
        + ';' + teamTracker.scoredGoal
        + ';' + teamTracker.scoredWithinFirst2MinsOfPeriod
        + ';' + teamTracker.scoredWithinLast2MinsOfPeriod
        + ';' + teamTracker.scoredWithin2MinsOwnGoal
        + ';' + teamTracker.scoredWithin2MinsOpponentsGoal
        + ';' + teamTracker.scoredUpon
        + ';' + teamTracker.scoredUponWithinFirst2MinsOfPeriod
        + ';' + teamTracker.scoredUponWithinLast2MinsOfPeriod
        + ';' + teamTracker.scoredUponWithin2MinsOwnGoal
        + ';' + teamTracker.scoredUponWithin2MinsOpponentsGoal);
        */
    
    /**
        * flags:
        *  - w = Open file for reading and writing. File is created if not exists
        *  - a+ = Open file for reading and appending. The file is created if not exists
        */

    var data = 'season,gameDate,gameType,event,team,opponent,period,scoredGoal,scoredWithinFirst2MinsOfPeriod,scoredWithinLast2MinsOfPeriod,scoredWithin2MinsOwnGoal,scoredWithin2MinsOpponentsGoal,scoredUpon,scoredUponWithinFirst2MinsOfPeriod,scoredUponWithinLast2MinsOfPeriod,scoredUponWithin2MinsOwnGoal,scoredUponWithin2MinsOpponentsGoal\n';

    var fileName = `${teamTracker.season}_${teamTracker.event}_${teamTracker.gameDate}.csv`;
    writeFileSync(fileName, data, {
        flag: 'w',
    });
}

export function displayScoringInfo(teamTracker: ITracker): void {
    /**
    console.log(
        teamTracker.season
        + ';' + teamTracker.gameDate
        + ';' + teamTracker.event
        + ';' + teamTracker.team
        + ';' + teamTracker.period
        + ';' + teamTracker.scoredGoal
        + ';' + teamTracker.scoredWithinFirst2MinsOfPeriod
        + ';' + teamTracker.scoredWithinLast2MinsOfPeriod
        + ';' + teamTracker.scoredWithin2MinsOwnGoal
        + ';' + teamTracker.scoredWithin2MinsOpponentsGoal
        + ';' + teamTracker.scoredUpon
        + ';' + teamTracker.scoredUponWithinFirst2MinsOfPeriod
        + ';' + teamTracker.scoredUponWithinLast2MinsOfPeriod
        + ';' + teamTracker.scoredUponWithin2MinsOwnGoal
        + ';' + teamTracker.scoredUponWithin2MinsOpponentsGoal);
        */
    
    /**
        * flags:
        *  - w = Open file for reading and writing. File is created if not exists
        *  - a+ = Open file for reading and appending. The file is created if not exists
        */

    var data =         teamTracker.season
    + ',' + teamTracker.gameDate
    + ',' + teamTracker.gameType
    + ',' + teamTracker.event
    + ',' + teamTracker.team
    + ',' + teamTracker.opponent
    + ',' + teamTracker.period
    + ',' + teamTracker.scoredGoal
    + ',' + teamTracker.scoredWithinFirst2MinsOfPeriod
    + ',' + teamTracker.scoredWithinLast2MinsOfPeriod
    + ',' + teamTracker.scoredWithin2MinsOwnGoal
    + ',' + teamTracker.scoredWithin2MinsOpponentsGoal
    + ',' + teamTracker.scoredUpon
    + ',' + teamTracker.scoredUponWithinFirst2MinsOfPeriod
    + ',' + teamTracker.scoredUponWithinLast2MinsOfPeriod
    + ',' + teamTracker.scoredUponWithin2MinsOwnGoal
    + ',' + teamTracker.scoredUponWithin2MinsOpponentsGoal + '\n';

    var fileName = `${teamTracker.season}_${teamTracker.event}_${teamTracker.gameDate}.csv`;
    appendFile(fileName, data, function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      })
}

function checkForGoalWithinTimePeriodByTeam(lastGoal: ILastGoalScored, team: string, sameTeam: boolean, eventTime: string, minutesLimit: number): boolean {
    if (lastGoal.scoredBy == 'NHL') {
        return false;
    }

    var sameTeamCheck = (lastGoal.scoredBy == team);
    if (sameTeamCheck == sameTeam) {
        return checkForGoalWithinTimePeriod(eventTime, lastGoal.scoredAt, minutesLimit);
    }

    return false;
}

function checkForGoalWithinTimePeriod(eventTime: string, compareTime: string, minutesLimit: number): boolean {
    var eventTimeSplit = eventTime.split(':');
    var compareTimeSplit = compareTime.split(':');
    var eventTimeMinutes = Number(eventTimeSplit[0]);
    var eventTimeSeconds = Number(eventTimeSplit[1]);
    var compareTimeMinutes = Number(compareTimeSplit[0]);
    var compareTimeSeconds = Number(compareTimeSplit[1]);
    var secondsDifference = eventTimeSeconds - compareTimeSeconds;
    if (secondsDifference < 0) { 
        secondsDifference += 60;
        eventTimeMinutes--;
    }
    var minutesDifference = eventTimeMinutes - compareTimeMinutes;

    if (minutesDifference < minutesLimit) {
        return true;
    } else if (minutesDifference == minutesLimit && secondsDifference == 0) {
        return true;
    } else {
        return false;
    }
}

function convertGameType(gameType: string) {
    if (gameType == 'R') {
        return 'regular';
    } else if (gameType == 'PR') {
        return 'pre-season';
    } else {
        return gameType;
    }
}