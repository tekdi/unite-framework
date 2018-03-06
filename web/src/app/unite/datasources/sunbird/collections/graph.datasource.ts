import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';

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

                                    let chekData : Array<any>= data['result']['series'];
                                    let lebels = [
                                                    '2018-01-04',
                                                    '2018-01-05',
                                                    '2018-01-06',
                                                    '2018-01-07',
                                                    '2018-01-8',
                                                    '2018-01-09',
                                                    '2018-01-10',
                                                    '2018-01-11',
                                                    '2018-01-12',
                                                    '2018-01-13',
                                                    '2018-01-14',
                                                    '2018-01-15',
                                                    '2018-01-16',
                                                    '2018-01-17' 
                                                ];
                                    let finalGraphD = [];
                                    for (var key in chekData)
                                    {
                                        if (chekData.hasOwnProperty(key))
                                        {
                            
                                            let  bucket = chekData[key]['buckets'];
                            
                                            let graphObj = {};
                                            graphObj['label'] = chekData[key]['name'];
                                            graphObj['data'] = [];
                            
                                            bucket.forEach(element => {
                                                graphObj['data'].push(element.value);
                                            });
                                            console.log(key + " -> ", graphObj);
                            
                                            finalGraphD.push(graphObj);
                                        }
                                    }

                                    let rtrData = {};
                                    rtrData['graphData'] = finalGraphD;
                                    rtrData['label']    = lebels;

                                    return rtrData;
                                });
    }
}