import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UniteMenusDataService } from './services/menus.dataservice';
import { UniteMenuDataService } from './services/menu.dataservice';

const ServiceCollection = {
    'menus' : UniteMenusDataService,
    'menu': UniteMenuDataService,
};

@Injectable()
export class MenusDataSource
{
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
