import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CountriesDataSource
{
    baseUrl = "//restcountries.eu/rest/v2/name/united";

    constructor(config, private _httpClient? : HttpClient )
    {
        console.log("inside Countries Data service ", config);
    }

    getData()
    {
        return this._httpClient.get(this.baseUrl);
    }
}