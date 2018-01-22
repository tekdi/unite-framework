import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class EkLessonsDataSource
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
        return this._httpClient.get( this.apiBase + "/assets/ekstepLessons.json")
                                .map(data => {

                                    if(this.dataNode)
                                    {
                                        let dataNode2 = this.dataNode.split(".");
                                        
                                        let myFinalValue = data;

                                        dataNode2.forEach(element => {
                                            myFinalValue = myFinalValue[element];
                                        });

                                        return myFinalValue;
                                    }

                                    return data['result']['content'];
                                });
    }
}