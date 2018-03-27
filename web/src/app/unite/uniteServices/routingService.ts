import { Injectable } from "@angular/core";
import { MenusService, WidgetsService } from "../core/services";
import { Config } from './../core/classes';

@Injectable()
export class UniteRouting{

    menus;
    finalMenus;
    constructor(
        private _menusService: MenusService,
        private _widgetsService: WidgetsService,
        private _config: Config ){
    }

    getMenus(dataSources) {
        this._menusService.getMenus().subscribe(data => {
            this.menus = data;
            let finalMenu = [];

            this.menus.forEach(menu => {
                finalMenu.push(menu);
            });

            this.finalMenus = finalMenu;
            console.log("Final Menus",this.finalMenus);
            this.getAllWidgets();
        });
    }

    parseUniteUrl(uniteUrl) {
        this.getMenuWidgets(uniteUrl);
        console.log("parse unite url 1 ", uniteUrl, this.finalMenus);
        if(uniteUrl) {
            let segArr = uniteUrl.split('/');
            let segCount = segArr.length;
            let respObj = {};
            let mainDynamicSegObj = {};

            for(let roElement of this.finalMenus)
            {
                let roArray = roElement.routeUrl.split("/");
                let roLength = roArray.length;
                
                let roDynamicSegmentCount = (roElement.routeUrl.match(/\/:/g)||[]).length;
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
                                    //service : roElement['service'],
                                    defaultRenderer : roElement['defaultRenderer'],
                                    widgets : roElement['widgets'],
                                    param : dynamicSegObj,
                                    showDefault : roElement['showDefault'],
                                    mapper : roElement['mapper'],
                                    widgetName : roElement['name']
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

    getAllMenus() {
        let finalUniteBasePath = "";
        let menusToReturn = [];

        finalUniteBasePath += this._config.baserUnitePath['basePath'] ? this._config.baserUnitePath['basePath'] + "/" : "";
        finalUniteBasePath += this._config.baserFamilyPath['basePath'] ? this._config.baserFamilyPath['basePath'] + "/" : '';
        console.log("FINAL UNITE BASE PATH", finalUniteBasePath);
        console.log('%c CLASS CONFIG', 'color: green; font-weight: bold;',this._config);
        this.finalMenus.forEach(element => {
            let thisElement = element;
            if (thisElement.routeUrl.indexOf(':') == -1)
            {
                thisElement.routeUrl = finalUniteBasePath + thisElement.routeUrl;
                menusToReturn.push(thisElement);
            }
        });

        return menusToReturn;
    }

    getAllWidgets() {
        this._widgetsService.getWidgets().subscribe(response =>{
            console.log("getAllWidgets RESPONSE",response);
            this.mapNewWidgets(response);    
        });
    }

    mapNewWidgets(widgets) {
        let oldWidget = [];
        this.menus.forEach((menu, index) => {
            let widgetsArray = [];
            widgets.forEach(widget => {
                let oldWidget = [];

                let routes = menu.source.extension.routes;
                for (let index = 0; index < routes.length; index++) {
                    let route = routes[index];
                    if (route.id == widget.routeId && menu.id == widget.menuId) {
                        widget.widget.config.baseUrl = menu.source.config.baseUrl;
                        oldWidget['source'] = widget.widget.source.name;
                        oldWidget['widgetName'] = widget.widget.name;
                        oldWidget['renderer'] = widget.widget.renderer;
                        oldWidget['mapper'] = widget.widget.mapper;
                        oldWidget['config'] = widget.widget.config;
                        oldWidget['id'] = widget.routeId;
                        widgetsArray.push(oldWidget);
                        return;
                    }
                }
            });

            this.finalMenus[index]['widgets'] = widgetsArray;
        }); 

        console.log('FINAL NEW MENUS After Mapping', this.finalMenus);  
    }

    getMenuWidgets(url : string) {
        console.log("getMenuWidgets", this.finalMenus);
    }
}