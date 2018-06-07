import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UniteMenusDataService } from './collection/menus.dataservice';
import { UniteMenuDataService } from './collection/menu.dataservice';

const ServiceCollection =  {
                            'menus' : UniteMenusDataService,
                            'menu': UniteMenuDataService,
                        };
                        
@Injectable()
export class MenusDataSource
{
    private dsConfigObj;
    constructor(private config, private _httpClient? : HttpClient)
    {
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['menus'];

        let dsObj = new dsName(this._httpClient);
        return dsObj.getAll().map(result => {
            return result;
        });
    }

    // setRoutes(baseSegment)
    // {
    //     let myRouteObj = [
    //         { title: "Menus", path: "menus", id:""},
    //         { title: "Menu", path: "menu/:menuId", id:""}
    //     ]
    //     return myRouteObj;
    // }
}