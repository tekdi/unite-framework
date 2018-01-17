import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EkLessonsDataSource
{
    dataUrl;
    dataNode

    constructor(config, private _httpClient? : HttpClient )
    {
        console.log("this is config ", config );
        this.dataNode = config['dataNode'];
        this.dataUrl = '';
    }

    getData()
    {
        return this._httpClient.get("http://unitecmsdemo.cloudaccess.host/assets/ekstepLessons.json")
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