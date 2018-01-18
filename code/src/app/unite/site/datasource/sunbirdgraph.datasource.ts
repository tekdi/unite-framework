import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';

@Injectable()
export class SBGraphDataSource
{
    dataUrl;
    dataNode;
    apiBase;

    constructor(config, private _httpClient? : HttpClient )
    {
        console.log("this is config ", config );
        this.dataNode = config['dataNode'];
        this.dataUrl = '';
        this.apiBase = environment.apiBase;
    }

    getData()
    {
        return this._httpClient.get( this.apiBase +  "/assets/sunbirdgraph.json")
                                .map(data => {
                                    return data['result'];
                                });
    }
}