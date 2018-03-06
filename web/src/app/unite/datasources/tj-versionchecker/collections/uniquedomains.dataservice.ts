import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UniquedomainsDataService {
    dataUrl;
    dataNode;
    apiBase;
    sbHeaders: HttpHeaders;

    constructor(private config, private _httpClient?: HttpClient) {
    }

    getData() {
        return this._httpClient.get("https://versioncheck.techjoomla.com/metrics/usage/daily");
    }
}