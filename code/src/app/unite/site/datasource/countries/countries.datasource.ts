import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriesListDataSource } from './collections/countrieslist.datasource';

const rsCollection =    {
                            'default' : CountriesListDataSource,
                            'list' : CountriesListDataSource
                        }

const dyRoutes = [
    {path : "/:chekcing", dsName : "", layout: ""},
    {path : "", dsName : "", layout: ""}
]

@Injectable()
export class CountriesDataSource
{
    private dsConfigObj;

    constructor(config, private _httpClient? : HttpClient, mainSeg?)
    {
        let dsConfig = (config['dsName'] && rsCollection[config['dsName']])
                        ? rsCollection[config['dsName']]
                        : rsCollection['default'];

        this.dsConfigObj = new dsConfig(config, _httpClient);
    }

    getData()
    {
        return this.dsConfigObj.getData().map(beforeData => {
            console.log("inside main datata of countries ", beforeData);
            return {data : beforeData, routes : dyRoutes};
        });
    }
}