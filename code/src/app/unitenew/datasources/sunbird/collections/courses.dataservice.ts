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


    constructor(config, private _httpClient? : HttpClient )
    {
    }

    getData()
    {
        return this._httpClient.get("/assets/sunbirdCourses.json");
    }
}