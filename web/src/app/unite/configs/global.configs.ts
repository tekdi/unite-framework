import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalConfig{
    baserUnitePath;
    baserFamilyPath;
    gbConfig;

    constructor(private _httpClient : HttpClient)
    {
    }

    getGlobalConfig (branch) {

        return this._httpClient.get("/assets/config.json").map(data => {
            return data[branch];
        });
    }
}