import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesDataService } from './collection/courses.datasource';
const ServiceCollection =  {
    'courses': CoursesDataService,
};

@Injectable()
export class DikshaDataSource {
    private dsConfigObj;
    constructor(private config, private _httpClient?: HttpClient) {
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

    setRoutes(baseSegment) {
        let myRouteObj = [
            { title: "Home", path: "", id: "5aa7c0f34716eb7d786ef1b1" },
            { title: "Partners", path: "partners", id: "5aa7c0f34716eb7d786ef1b2" },
            { title: "Contents", path: "contents", id: "5ab1fd7331faf2397199ac18" }
        ]
        return myRouteObj;
    }
}