import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UniteRouting{

    menus;
    finalMenus;

    constructor(){
        this.menus = [
                // {
                //     "menuId":"1",
                //     "dataSource" : "countries",
                //     "title":"Countries List",
                //     "description":"",
                //     "alias":"countries"
                // },
                 {
                    "menuId":"2",
                    "dataSource" : "sunbird",
                    "title":"Sunbird Site",
                    "description":"",
                    "alias":"sb-site"
                }
            ]
    }

    getMenus () : Observable<any>
    {
        return this.menus;
    }

    createDynamicMenus(dataSources)
    {
        let finalMenu = [];

        this.menus.forEach(menuElement => {

            if(dataSources.hasOwnProperty(menuElement.dataSource))
            {
                let dsName = dataSources[menuElement.dataSource];
                let dsObj  = new dsName;
                let dsRoutes = dsObj.setRoutes("");

                dsRoutes.forEach(roElement => {
                    
                    let finalDsRoute = {};

                    let pathStr = roElement.path;

                    finalDsRoute['path'] = roElement['path'] && roElement['path'] !== ""
                                            ? menuElement.alias + "/" + roElement.path
                                            : menuElement.alias ;
                    finalDsRoute['service'] = roElement.service;
                    finalDsRoute['defaultRenderer'] = roElement.renderer;
                    finalDsRoute['source'] = menuElement.dataSource;
                    finalDsRoute['widgets'] = roElement.widgets;
                    finalDsRoute['showDefault'] = roElement.hasOwnProperty('showDefault')
                                                ? (roElement['showDefault'] ? true : false) 
                                                : true;
                    finalDsRoute['mapper'] = roElement['mapper'];
                    finalDsRoute['widName'] = roElement['title'];

                    finalMenu.push(finalDsRoute);
                });
            }
        });

        this.finalMenus = finalMenu;
        console.log("This are the final dymaic menus ==== ", this.finalMenus);
    }

    parseUniteUrl(uniteUrl)
    {
        console.log("parse unite url 1 ", this.finalMenus);
        if(uniteUrl)
        {
            let segArr = uniteUrl.split('/');
            let segCount = segArr.length;
            let respObj = {};
            let mainDynamicSegObj = {};

            for(let roElement of this.finalMenus)
            {
                let roArray = roElement.path.split("/");
                let roLength = roArray.length;
                let roDynamicSegmentCount   = (roElement.path.match(/\/:/g)||[]).length;
                let roStaticSegmentCount    = roLength - roDynamicSegmentCount;
                let dynamicSegObj = {};

                let segmentDetails = [];

                if(segCount === roLength)
                {
                    let valid = true;
                    let index = 0;
                    for(let roSegments of roArray) {
                        let segment = {};
                        segment['position'] = index;
                        segment['static']   = roSegments.indexOf(":") === 0 ? false : true;
                        segment['dynamic']  = !segment['static'];
                        segment['dynamicName'] = segment['dynamic'] ? roSegments.substr(1) : "";

                        if(segment['static'])
                        {
                            if(roSegments !== segArr[index])
                            {
                                valid = false;
                                break;
                            }
                        }
                        else
                        {
                            dynamicSegObj[segment['dynamicName']] = segArr[index];
                        }
                        index++;
                    };

                    if(valid)
                    {
                        respObj =  {
                                    source : roElement['source'],
                                    service : roElement['service'],
                                    defaultRenderer : roElement['defaultRenderer'],
                                    widgets : roElement['widgets'],
                                    param : dynamicSegObj,
                                    showDefault : roElement['showDefault'],
                                    mapper : roElement['mapper'],
                                    widName : roElement['widName']
                                };

                        mainDynamicSegObj = dynamicSegObj;
                        break;
                    }
                }
            };

            if (respObj && respObj.hasOwnProperty('widgets') && respObj['widgets'] !== undefined)
            {
                let tempRtrn = [];
                let tempRespObj = respObj;
                let tempWidgets = respObj['widgets']

                delete tempRespObj["widgets"];

                if(respObj.hasOwnProperty('showDefault') && respObj['showDefault'])
                {
                    tempRtrn.push(tempRespObj);
                }

                tempWidgets.forEach(element => {
                    element['param'] = mainDynamicSegObj
                    tempRtrn.push(element);
                });

                return tempRtrn;
            }

            return [respObj];
        }
    }


}