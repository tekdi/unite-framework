import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ListDataService} from './collections/list.dataservice';
import { DetailsDataService } from './collections/detail.dataservice';

const ServiceCollection = {
    'default' : ListDataService,
    'countryList' : ListDataService,
    'countryDetails' : DetailsDataService
}

@Injectable()
export class CountriesDataSource {

    constructor(private config, private _httpClient : HttpClient){
        console.log("I am here in ds constreuctsadfadsf");
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['default'];

        let dsObj = new dsName(this.config, this._httpClient);
        return dsObj.getData().map(asdf => {
            console.log("Inside mapaaa");
            return asdf;
        });
    }

    setRoutes(baseSegment)
    {
        let myRouteObj = [
            {path : "", service : "countryList", renderer : "list"},
            {path : ":country", service : "countryDetails", renderer : "details"}
        ]

        return myRouteObj;
    }
}