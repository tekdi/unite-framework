import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ServiceCollection = { };

@Injectable()
export class DikshaDataSource {
    private dsConfigObj;
    constructor(private config, private _httpClient?: HttpClient) {
    }

    setRoutes(baseSegment) {
        let myRouteObj = [
            { title: "Home", path: "", id: "5aa7c0f34716eb7d786ef1b1" },
            { title: "Partners", path: "partners", id: "5aa7c0f34716eb7d786ef1b2" }
        ]
        return myRouteObj;
    }
}