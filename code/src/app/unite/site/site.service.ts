import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { DataSource } from './dataSource.collection';
import { FactoryLayouts } from './layout.collection';

import {environment} from '../../../environments/environment'

const componentObj = FactoryLayouts;

@Injectable()
export class WidgetService {

    dataSouceCollection = DataSource;
    apiBase;

    constructor(private _httpClient : HttpClient){
        this.apiBase = environment.apiBase;
    }

    getPages()
    {
        return this._httpClient.get(this.apiBase + '/assets/pages.json');
    }

    getPageWidgets(pageId)
    {
        return this._httpClient
                    .get(this.apiBase + "/assets/widgets.json")
                    .map((data : Array<any>) => {
                        let finalArray = [];
                        data.forEach(element => {
                            if(element['page_id'] == pageId)
                            {
                                finalArray.push(element);
                            }
                        });

                        return finalArray;
                    });
    }

    getDataSource(source)
    {
        if(this.dataSouceCollection[source.name])
        {
            let ds = this.dataSouceCollection[source.name];
            return new ds(source.config, this._httpClient);
        }
    }

    getWidgetData(dataUrl, widgetObj, dataNode?)
    {
        return this._httpClient
                    .get(dataUrl)
                    .map((data) => {

                        if(dataNode)
                        {
                            let dataNodeArr = dataNode.split(".");
                            let myFinalArray = data;

                            dataNodeArr.forEach(element => {
                                myFinalArray = myFinalArray[element];
                            });
                            
                            data = myFinalArray;
                        }

                        var checkArr = {};

                        checkArr['data'] = data;
                        checkArr['mapper'] = widgetObj['params'];
                        checkArr['component'] = componentObj[widgetObj.renderer_name];

                        return checkArr;
                    })
    }
}