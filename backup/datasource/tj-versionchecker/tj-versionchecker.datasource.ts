import { UsageDataService } from './collections/usage.dataservice';
import { UniquedomainsDataService } from './collections/uniquedomains.dataservice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ServiceCollection =  {
                            'default' : UsageDataService,
                            'uniquedomains': UniquedomainsDataService,
                        };
                        
@Injectable()
export class TJVersioncheckerDataSource
{
    private dsConfigObj;
    constructor(private config, private _httpClient? : HttpClient)
    {
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['default'];

        let dsObj = new dsName(this.config, this._httpClient);
        return dsObj.getData().map(asdf => {
            return asdf;
        });
    }

    setRoutes(baseSegment)
    {
        let myRouteObj = [
            {title : "Component Usage", path : "usage", id :"101"},
            {title : "Unique Domains", path : "unique-domains/:component", id :"102"},
            {title : "Usage by Domain", path : "usage-by-domain/:domain", id :"103"},
        ]
        return myRouteObj;
    }
}