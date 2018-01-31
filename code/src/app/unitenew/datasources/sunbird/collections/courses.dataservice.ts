import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SunbirdCoursesDataService
{
    dataUrl;
    dataNode;
    apiBase;
    sbHeaders : HttpHeaders;
    sbGetProfileUrl = ''
    sbApiHeader = {};


    constructor(private config, private _httpClient? : HttpClient )
    {
    }

    getData()
    {
        let headers = {"Content-Type": "application/json"}
        
        return this._httpClient.post(
            this.config.defaultConfig.baseUrl + "/private/service/v1/content/composite/v1/search", 
            this.config.defaultConfig.search_filter, 
            {"headers": headers})
        .map(data => { 
            return data['result']['content']
        });
    }
}