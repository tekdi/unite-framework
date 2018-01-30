import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from '../configs/global.configs';
import { UniteRouting } from '../uniteServices/routingService';

@Directive({
  selector: '[ad-renderer]'
})
export class RendererSelector {

    @Input('ad-renderer') set config(value){
        console.log("I am inside renderer selector config ", value);
        this.renderWidgetsForPage();
    }

    constructor(private _vcRef: ViewContainerRef,
                private _cfResolver: ComponentFactoryResolver,
                private _pfLocation : PlatformLocation,
                private _acRoute : ActivatedRoute,
                private _glbConfig : GlobalConfig,
                private _uniteRoute : UniteRouting
                ) { }

    renderWidgetsForPage(){
        let basePath = this._glbConfig.baserUnitePath.basePath;

// import { GridRenderer } from '../family/mat/renderers/grid/grid.renderer';
        // let componentFactory = this._cfResolver.resolveComponentFactory(GridRenderer);
        // this._vcRef.createComponent(componentFactory);
        // console.log("I am inside renderer selector constructor ", this._glbConfig.baserUnitePath);
        // console.log("I am inside rendereer current location ", this._pfLocation.pathname);

        let servicePath = basePath
                            ? this._pfLocation.pathname.replace(basePath, "").replace(/^\/+|\/+$/g, '')
                            : this._pfLocation.pathname;

        let menuInfo = this._uniteRoute.parseUniteUrl(servicePath);

        if(menuInfo && Object.keys(menuInfo).length !== 0)
        {
            console.log("valid menussss !!!!!!!!!!!!", menuInfo);
        }
        else
        {
            console.log("invalid menusssss ----------");
        }
    }
}