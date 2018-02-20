import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Widgets{
    
    constructor(private _httpClient : HttpClient)
    {
    }

    getWidgets() {
        return this._httpClient.get("/assets/widgets.json");
    }
}