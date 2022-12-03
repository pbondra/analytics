import { Logger } from '../src/framework/console/index'
import { HttpService } from './framework/http/http.services';
import { NhlService } from './interfaces/nhl.service';
import { ILastGoalScored, ITracker } from './models/tracker';
import { displayScoringHeaders, displayScoringInfo, setScoredGoal, setScoredUponGoal } from './services/goalServices';

async function getStuff(): Promise<void> {
    const myLogger = new Logger();
    myLogger.register();
    const scheduleDate = '2022-11-23'
    const httpService = new HttpService();
    const nhlService = new NhlService(httpService);
    const schedule = await nhlService.getSchedule(scheduleDate);
    let lastGoal: ILastGoalScored = {
        scoredBy : 'NHL',
        scoredAt : '00:00'
    };

    if (schedule === undefined) {
        console.log('schedule is undefined');
        throw new Error;
    }
    if (schedule.totalItems > 0) {
        console.log('--- start ---');
        let heading: ITracker = {
            season: schedule.dates[0].games[0].season,
            gameDate: scheduleDate,
            event: 'Goal',
            team: '',
            period: 0,
            scoredGoal: false,
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
        displayScoringHeaders(heading);
        for (var game of schedule.dates[0].games) {
            const results = await nhlService.getGameData(game.link);
            if (results === undefined) {
                console.log('results is undefined');
                throw new Error;
            }

            for (var gameEvent of results.liveData.plays.allPlays) {
                if (gameEvent.result.event == 'Period Start') {
                    lastGoal.scoredBy = 'NHL';
                    lastGoal.scoredAt = '00:00';
                }
                if (gameEvent.result.event == 'Goal') {
                    let scoringTeam: ITracker;
                    let scoredUponTeam: ITracker;
                    if (results.gameData.teams.away.triCode == gameEvent.team.triCode) {
                        scoringTeam = setScoredGoal(game.season, scheduleDate, results.gameData.teams.away.triCode, lastGoal, gameEvent);
                        scoredUponTeam = setScoredUponGoal(game.season, scheduleDate, results.gameData.teams.home.triCode, lastGoal, gameEvent);
                    } else {
                        scoringTeam = setScoredGoal(game.season, scheduleDate, results.gameData.teams.home.triCode, lastGoal, gameEvent);
                        scoredUponTeam = setScoredUponGoal(game.season, scheduleDate, results.gameData.teams.away.triCode, lastGoal, gameEvent);
                    }

                    lastGoal.scoredAt = gameEvent.about.periodTime;
                    lastGoal.scoredBy = gameEvent.team.triCode;
                    displayScoringInfo(scoringTeam);
                    displayScoringInfo(scoredUponTeam);
                }
            }
        }
    }
}

getStuff() 