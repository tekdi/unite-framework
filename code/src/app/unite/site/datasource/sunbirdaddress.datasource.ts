import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class SunbirdAddressDataSource
{
    dataUrl = "";

    constructor(config, private _httpClient? : HttpClient )
    {
        this.dataUrl = config.baseUrl + config.endPoint;
        console.log("inside Countries Data service ", config);
    }

    getData()
    {
        return this._httpClient.get(this.dataUrl);
    }
}