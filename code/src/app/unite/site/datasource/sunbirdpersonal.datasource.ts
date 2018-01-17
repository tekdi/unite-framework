import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class SunbirdPersonalDataSource
{
    dataUrl;

    constructor(config, private _httpClient? : HttpClient )
    {
        this.dataUrl = '';
    }

    getData()
    {
        console.log("inside personal details " );
        return this._httpClient.get("/assets/profileSunbird.json")
                                .map(data => {
                                    return data['result']['response']
                                });
    }
}