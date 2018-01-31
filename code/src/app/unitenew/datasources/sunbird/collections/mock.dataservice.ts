import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SunbirdMockDataService
{
    dataUrl;
    dataNode;
    apiBase;
    sbHeaders : HttpHeaders;
    sbGetProfileUrl = ''
    sbApiHeader = {};


    constructor(private config, private _httpClient? : HttpClient )
    {}

    
    getData(){
        return this._httpClient.get("//restcountries.eu/rest/v2/all");
    }
}