import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class TJLmsCoursesDataSource
{
    dataUrl = "";
    endPoint = "/lms/courses"
    request_headers;

    constructor(config, private _httpClient? : HttpClient )
    {
        this.request_headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + config.token)
        this.dataUrl = config.baseUrl + this.endPoint;

        console.log("inside profile Data service ", config);
    }
    getData()
    {
        return this._httpClient.get(this.dataUrl, this.request_headers).map(data => {
        	return data['data']['result'];
        });
    }
}