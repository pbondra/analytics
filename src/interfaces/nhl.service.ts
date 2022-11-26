import axios from 'axios';
import { Logger } from '../framework/console/index'
import { IDateData } from '../models/gameData'
import { HttpService } from '../framework/http/http.services'
import { IHttpRequest } from '../framework/http/http.types'

export interface INhlService {

}


class NhlService implements INhlService {
    constructor(private httpService: HttpService) {}

    async getGames(date: string): Promise<IDateData | undefined>  {
        const url = 'http://statsapi.web.nhl.com/api/v1/schedule?date=' + date;
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

        const response = await this.httpService.getAsync<IDateData>(request);
        console.log(response.status);
        const bob = JSON.stringify(response.data);
        console.log(bob);

        return response.data;
    }
}

export { NhlService }
