import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UniteRouting } from './../../uniteServices/routingService';
import { dataSources } from './../../datasources/sources.collection';
import { HttpClient } from '@angular/common/http';
import { Config } from './../classes';

// interface DynamicComponent {
//     data: any;
//     mapper: any;
//     widgetName: any;
//     metadata: any;
//   }

@Directive({
  selector: '[ad-renderer]'
})

  export class RendererSelector {

    dataCollection = dataSources;
    @Input() position: string;

    @Input('ad-renderer') set config(value){
        console.log("I am inside renderer selector config Body position ", value);
        this.renderWidgetsForPage(value,this.position);
    }

    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _pfLocation : PlatformLocation,
        private _acRoute : ActivatedRoute,
        private _uniteRoute : UniteRouting,
        private _httpClient : HttpClient,
        private _config: Config
        ) 
    { 
        console.log("In Renderer Selectors constructor");
    }

    renderWidgetsForPage(availableRenderes,position){
        let servicePath = this._pfLocation.pathname;
        console.log("SERVICE PATH", servicePath);
        let menuInfo = this._uniteRoute.parseUniteUrl(servicePath);

        if(menuInfo && menuInfo.length !== 0) {

            menuInfo.forEach(widgetInfo => {
                let widgetPosition  = widgetInfo.position ? widgetInfo.position : 'body';
                let widRenderer = widgetInfo.renderer ? widgetInfo.renderer : widgetInfo.defaultRenderer;
                console.log('%c Widget Infor','color: yellow; font-weight: bold;',widgetInfo);
                if(availableRenderes.hasOwnProperty(widRenderer))
                {
                    console.log('%c Directive sent Position','color: black; font-weight: bold;',position);
                    console.log('%c Widget Position','color: red; font-weight: bold;',widgetPosition);
                    if(position == widgetPosition)
                    {
                        let componentFactory = this._cfResolver.resolveComponentFactory(availableRenderes[widRenderer]);
                        let thisCompRef = this._vcRef.createComponent(componentFactory);
                        this.loadData(widgetInfo, thisCompRef);
                    }
                    else
                    {
                        console.log('Widget is not for '+position+'position');
                    }
                }
                else
                {
                    console.log("ERROR :: renderer not found ", widRenderer);
                }
            });
        }
        else
        {
            console.log("invalid menusssss ----------");
        }
    }

    loadData(widgetInfo, thisCompRef){
        if(this.dataCollection.hasOwnProperty(widgetInfo.source))
        {
            let config = {
                urlData: widgetInfo.param ? widgetInfo.param : {},
                config: widgetInfo['config'] ? widgetInfo['config'] : {}
            };

            let metadata = {
                source : widgetInfo.source,
                service: widgetInfo.config.service ? widgetInfo.config.service : '',
                config : config
            }

            let dataSourceClass = this.dataCollection[widgetInfo.source];
            let dataSourceObj = new dataSourceClass(config, this._httpClient);
            
            if (widgetInfo.config.service) {
                this.getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata);
            }
            else if (widgetInfo.config.data) {
                this.getJsonData(widgetInfo, dataSourceObj, thisCompRef, metadata);
            }
            else if (widgetInfo.config.html) {
                this.getHtmlData(widgetInfo, dataSourceObj, thisCompRef, metadata);
            }
        }
    }

    getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata) {
        dataSourceObj.getData(widgetInfo.service).map(data => {
            if (widgetInfo['config']['dataNode']) {
                let dataNode2 = widgetInfo['config']['dataNode'].split(".");
                let myFinalValue = data;
                dataNode2.forEach(element => {
                    myFinalValue = myFinalValue[element];
                });
                return myFinalValue;
            }
            return data;
        })
        .subscribe(data => {
            this.setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, data);
        });
    }
    
    getJsonData(widgetInfo, dataSourceObj, thisCompRef, metadata) {
        this.setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, widgetInfo.config.data);
    }

    getHtmlData(widgetInfo, dataSourceObj, thisCompRef, metadata) {
        this.setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, widgetInfo.config.html);
    }

    setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, data) {
        (thisCompRef.instance).data = data;
        (thisCompRef.instance).mapper = widgetInfo.mapper ? widgetInfo.mapper : {};
        (thisCompRef.instance).widgetName = widgetInfo.widgetName;
        (thisCompRef.instance).metadata = metadata;
    }
}