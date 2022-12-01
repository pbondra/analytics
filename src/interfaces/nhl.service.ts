import { Logger } from '../framework/console/index'
import { ISchedule } from '../models/scheduleData';
import { IResult } from '../models/results';
import { HttpService } from '../framework/http/http.services';
import { IHttpRequest } from '../framework/http/http.types';

export interface INhlService {

}


class NhlService implements INhlService {
    constructor(private httpService: HttpService) {}

    async getSchedule(date: string): Promise<ISchedule | undefined>  {
        const url = 'http://statsapi.web.nhl.com/api/v1/schedule?date=' + date;
        console.log(url);

        const headers = {
            'Accept': '*/*',
            'Connection': 'keep-alive'
        };

        const request: IHttpRequest = {
            url: url,
            headers
        }

        const response = await this.httpService.getAsync<ISchedule>(request);
        console.log(response.status);
        const bob = JSON.stringify(response.data);
        console.log('gameSchedule');
        console.log(bob);

        return response.data;
    }

    async getGameData(link: string): Promise<IResult | undefined>  {
        const url = 'http://statsapi.web.nhl.com' + link;
        console.log(url);

        const headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        };

        const request: IHttpRequest = {
            url: url,
            headers
        }

        const response = await this.httpService.getAsync<IResult>(request);
        console.log(response.status);
        const bob = JSON.stringify(response.data);
        /*
        console.log('gameData');
        console.log(bob);
        */

        return response.data;
    }
}

export { NhlService }
