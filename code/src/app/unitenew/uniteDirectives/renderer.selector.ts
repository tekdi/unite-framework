import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from '../configs/global.configs';
import { UniteRouting } from '../uniteServices/routingService';
import { dataSources } from '../datasources/sources.collection';
import { HttpClient } from '@angular/common/http';

interface DynamicComponent {
    data: any;
    mapper: any;
    widName: any;
  }

@Directive({
  selector: '[ad-renderer]'
})
export class RendererSelector {

    dataCollection = dataSources;

    @Input('ad-renderer') set config(value){
        console.log("I am inside renderer selector config ", value);
        this.renderWidgetsForPage(value);
    }

    constructor(private _vcRef: ViewContainerRef,
                private _cfResolver: ComponentFactoryResolver,
                private _pfLocation : PlatformLocation,
                private _acRoute : ActivatedRoute,
                private _glbConfig : GlobalConfig,
                private _uniteRoute : UniteRouting,
                private _httpClient : HttpClient
                ) { }

    renderWidgetsForPage(availableRenderes){
        let basePath = this._glbConfig.baserUnitePath.basePath;

        let servicePath = basePath
                            ? this._pfLocation.pathname.replace(basePath, "").replace(/^\/+|\/+$/g, '')
                            : this._pfLocation.pathname.replace(/^\/+|\/+$/g, '');

        let menuInfo = this._uniteRoute.parseUniteUrl(servicePath);

        console.log("menu informations ", menuInfo);

        if(menuInfo && menuInfo.length !== 0)
        {
            menuInfo.forEach(widInfo => {
                let widRenderer = widInfo['renderer'] ? widInfo['renderer'] : widInfo['defaultRenderer'];

                if(availableRenderes.hasOwnProperty(widRenderer))
                {
                    let componentFactory = this._cfResolver.resolveComponentFactory(availableRenderes[widRenderer]);
                    let thisCompRef = this._vcRef.createComponent(componentFactory);

                    this.loadServiceData(widInfo, thisCompRef);
                } 
            });
        }
        else
        {
            console.log("invalid menusssss ----------");
        }
    }

    loadServiceData(widInfo, thisCompRef){
        if(this.dataCollection.hasOwnProperty(widInfo.source))
        {
            let config = {urlData : widInfo.param};
            let dataSourceClass = this.dataCollection[widInfo.source];

            let dataSourceObj   = new dataSourceClass(config, this._httpClient);
            dataSourceObj.getData(widInfo.service).subscribe(data => {

                (<DynamicComponent>thisCompRef.instance).data = data;
                (<DynamicComponent>thisCompRef.instance).mapper = {};
            });
        }
    }
}