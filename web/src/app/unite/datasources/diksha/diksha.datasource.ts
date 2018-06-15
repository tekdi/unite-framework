import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsService } from './services/events.service';

const ServiceCollection =  {
    'events': EventsService,
};

@Injectable()
export class DikshaDataSource {
    private dsConfigObj;
    dsObj = null;
    constructor(private serviceName, private _httpClient?: HttpClient) {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['menus'];
        this.dsObj = new dsName(this._httpClient);   
    }

    getAll()
    {
        return this.dsObj.getAll();
    }
    
    get(slug) {
        return this.dsObj.get(slug);
    }
}