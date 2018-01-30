import {ListDataService} from './collections/list.dataservice';
import {DetailsDataService} from './collections/detail.dataservice';
import { HttpClient } from "@angular/common/http";

const ServiceCollection = {
    'default' : ListDataService,
    'countryList' : ListDataService,
    'countryDetails' : DetailsDataService
}

export class CountriesDataSource {

    constructor(private config, private _httpClient? : HttpClient){

    }

    getData(serviceName?)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['default'];

        let dsObj = new dsName(this.config, this._httpClient);
        return dsName.getData().map(finalData => {
                return finalData;
            })
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