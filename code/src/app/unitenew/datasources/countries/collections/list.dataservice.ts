import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ListDataService{

    constructor(config, private _httpClient : HttpClient)
    {
    }

    getData(){
        return this._httpClient.get("//restcountries.eu/rest/v2/all");
    }
}