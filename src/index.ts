import { Logger } from '../src/framework/console/index'
import { HttpService } from './framework/http/http.services';
import { NhlService } from './interfaces/nhl.service';

async function getStuff(): Promise<void> {
    const myLogger = new Logger();
    myLogger.register();
    const httpService = new HttpService();
    const nhlService = new NhlService(httpService);
    const games = await nhlService.getGames('2022-11-23');
    myLogger.info('End')
}

getStuff()