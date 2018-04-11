import { BaseService } from './../../../core/services/base.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UniteMenusDataService extends BaseService
{
    dataUrl;
    dataNode;
    url: string = 'api/menus?filter[include][source][extension]=routes';


    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    getData()
    {
        return this.get(this.url);
    }
}