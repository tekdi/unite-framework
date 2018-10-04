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
    
    /**
     * This function get list
     */
    getAll()
    {
        return this.dsObj.getAll();
    }
    
    /**
     * This function get the single record on provided slug
     * 
     * @param slug - slug is a part of URL
     */
    get(slug) {
        return this.dsObj.get(slug);
    }
}