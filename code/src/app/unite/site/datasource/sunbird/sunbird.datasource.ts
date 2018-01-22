import { SunbirdPersonalDataSource } from './collections/personal.datasource';
import { SunbirdAddressDataSource } from './collections/address.datasource';
import { SBGraphDataSource } from './collections/graph.datasource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const rsCollection =    {
                            'default' : SunbirdPersonalDataSource,
                            'personal' : SunbirdPersonalDataSource,
                            'address'   : SunbirdAddressDataSource,
                            'graph'  : SBGraphDataSource
                        }

@Injectable()
export class SunbirdDataSource
{
    private dsConfigObj;

    constructor(config, private _httpClient? : HttpClient )
    {
        let dsConfig = (config['dsName'] && rsCollection[config['dsName']])
                        ? rsCollection[config['dsName']]
                        : rsCollection['default'];

        this.dsConfigObj = new dsConfig(config, _httpClient);
    }

    getData()
    {
        return this.dsConfigObj.getData();
    }
}