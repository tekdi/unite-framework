import { WidgetsService } from './../services/widgets.service';
import { Menu } from './../classes/menu';
import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dataSources } from '../../datasources/sources.collection';

@Directive({
  selector: '[ad-renderer]'
})

  export class RendererSelector {
    private widgets;
    private dynamicComponents = [];
    private dataCollection = dataSources;

    @Input() position: string;
    @Input('ad-renderer') set config(value){
        this._acRoute.url.subscribe(data => {
            this._menu.menuUrl = '';

            if (data[0] !== undefined) {
                this._menu.menuUrl = '/' + data[0].path;
            }
            this.getRoutesWidgets(value);
        });
    }

    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _pfLocation : PlatformLocation,
        private _acRoute : ActivatedRoute,
        private _httpClient : HttpClient,
        private _menu: Menu,
        private _widgetsService: WidgetsService
        )
    {
        console.log('In Renderer Selectors constructor');
    }

    /**
     * getRoutesWidgets
     */
    public getRoutesWidgets(rendereres) {
        let menu = this._menu.getInstance();

        this._widgetsService.get('=' + this._menu.menuUrl).subscribe(widgets => {
            this.widgets = widgets;
            this.DestroyDynamicComponents();
            this.renderWidgetsForPage(rendereres);
        });
    }

    renderWidgetsForPage(availableRenderes) {

        let widgetsForPosition = this.widgets[this.position];
        widgetsForPosition.widgets.forEach(widget => {
            let widRenderer = widget.widget.renderer ? widget.widget.renderer : widget.widget.defaultRenderer;
            if (availableRenderes.hasOwnProperty(widRenderer)) {
                let componentFactory = this._cfResolver.resolveComponentFactory(availableRenderes[widRenderer]);
                let thisCompRef = this._vcRef.createComponent(componentFactory);
                this.loadData(widget.widget, thisCompRef);
            } else {
                console.log('ERROR :: renderer not found ', widRenderer);
            }
        });
    }

    loadData(widgetInfo, thisCompRef){

        let config = {
            urlData: widgetInfo.param ? widgetInfo.param : {},
            config: widgetInfo.config ? widgetInfo.config : {}
        };

        let metadata = {
            source: widgetInfo.config.source,
            service: widgetInfo.config.service ? widgetInfo.config.service : '',
            config : config
        };

        let dataSourceClass;
        let dataSourceObj;

        if (this.dataCollection.hasOwnProperty(widgetInfo.config.source)) {
            dataSourceClass = this.dataCollection[widgetInfo.config.source];
            dataSourceObj   = new dataSourceClass(config, this._httpClient);
        }

        if (widgetInfo.config.service && widgetInfo.config.source) {
            this.getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata);
        } else if (widgetInfo.config.data) {
            this.getJsonData(widgetInfo, thisCompRef, metadata);
        } else if (widgetInfo.config.html) {
            this.getHtmlData(widgetInfo, thisCompRef, metadata);
        }
    }

    getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata) {
        dataSourceObj.getData(widgetInfo.config.service).map(data => {
            if (widgetInfo['config']['dataNode']) {
                let dataNode2 = widgetInfo['config']['dataNode'].split('.');
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

    getJsonData(widgetInfo, thisCompRef, metadata) {
        this.setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, widgetInfo.config.data);
    }

    getHtmlData(widgetInfo, thisCompRef, metadata) {
        this.setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, widgetInfo.config.html);
    }

    setDynamicComponentInputs(widgetInfo, thisCompRef, metadata, data) {
        (thisCompRef.instance).data = data;
        (thisCompRef.instance).mapper = widgetInfo.mapper ? widgetInfo.mapper : {};
        (thisCompRef.instance).widgetName = widgetInfo.widgetName;
        (thisCompRef.instance).metadata = metadata;
        this.dynamicComponents.push(thisCompRef);
    }

    /**
     * DestroyDynamicComponents
     */
    public DestroyDynamicComponents() {
        this.dynamicComponents.forEach(component => {
            component.destroy();
        });
    }
}
