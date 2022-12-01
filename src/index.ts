import { Logger } from '../src/framework/console/index'
import { HttpService } from './framework/http/http.services';
import { NhlService } from './interfaces/nhl.service';
import { ISchedule } from './models/scheduleData';
import { IResult } from './models/results';
import { ILastGoalScored, ITracker } from './models/tracker';

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

    if (data.totalItems > 0) {
        for (var game of data.dates[0].games) {
            const results = await nhlService.getGameData(game.link);
            console.log (gameData.gameData.teams.away.name +  ' (' + gameData.gameData.teams.away.triCode + ') vs. ' + gameData.gameData.teams.home.name + ' (' + gameData.gameData.teams.home.triCode + ')');

            for (var gameEvent of gameData.liveData.plays.allPlays) {
                if (gameEvent.result.event == 'Period Start') {
                    lastGoal.scoredBy = 'NHL';
                    lastGoal.scoredAt = '00:00';
                }
                if (gameEvent.result.event == 'Goal') {
                    console.log(gameEvent.result.event);
                    console.log(gameEvent.about.period);
                    console.log(gameEvent.about.periodTime);
                    console.log(gameEvent.about.periodTimeRemaining);
                    console.log(gameEvent.team.triCode);
                    if (gameData.gameData.teams.away.triCode == gameEvent.team.triCode) {
                        console.log(gameData.gameData.teams.home.triCode)
                    } else {
                        console.log(gameData.gameData.teams.away.triCode)
                    }
                    console.log('-----')
                }
            }
        }
    }
}

import * as json1 from './scheduleData.json';
let data: ISchedule = <ISchedule>json1;
import * as json2 from './gameData.json';
let gameData: IResult = <IResult>json2;
getStuff() 