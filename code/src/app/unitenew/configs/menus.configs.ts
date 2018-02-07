import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Menues{
    
    constructor(private _httpClient : HttpClient)
    {
    }

    getMenus() {
        return this._httpClient.get("/assets/menus.json").map(data => {
            return data;
        });
    }
}