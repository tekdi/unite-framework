import { UniteRoute, Menu } from './../classes/';
import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dataSources } from '../../datasources/sources.collection';
import { overrides } from './../../templates/bs3/overrides/renderers';

@Directive({
  selector: '[ad-renderer]'
})

  export class RendererSelector {
    private dynamicComponents = [];
    private dataCollection = dataSources;
    private overrides = overrides;

    @Input() position: string;
    @Input('ad-renderer') set config(value) {
        this._acRoute.url.subscribe(data => {
            this.renderWidgetsForRoute(value);
        });
    }

    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _pfLocation: PlatformLocation,
        private _acRoute: ActivatedRoute,
        private _httpClient: HttpClient,
        private _menu: Menu,
        private _uniteRoute: UniteRoute
    ) {
        console.log('In Renderer Selectors constructor');
    }

    renderWidgetsForRoute(availableRenderes) {

        // Check position is present or not
        if ((this.position in this._uniteRoute.widgets) === false) {
            return false;
        }

        this.DestroyDynamicComponents();
        let widgetsForPosition = this._uniteRoute.widgets[this.position];

        widgetsForPosition.widgets.forEach(widget => {
            let widRenderer = '';
            if (('widget' in widget) == true && 'renderer' in widget.widget) {
                widRenderer = widget.widget.renderer ? widget.widget.renderer : widget.widget.defaultRenderer;
            }

            if (availableRenderes.hasOwnProperty(widRenderer)) {
                let selectedRenderer = this.hasOverride(widRenderer) ? this.hasOverride(widRenderer) : availableRenderes[widRenderer];
                let componentFactory = this._cfResolver.resolveComponentFactory(selectedRenderer);
                let thisCompRef = this._vcRef.createComponent(componentFactory);
                this.loadData(widget.widget, thisCompRef);
            } else {
                console.log('ERROR :: renderer not found ', widRenderer);
            }
        });
    }

    /**
     * rendererHasOverride
     */
    public hasOverride(renderer): string | boolean {

        if (renderer) {
            return this.overrides[renderer];
        }

        return false;
    }

    loadData(widgetInfo, thisCompRef) {
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

        if (widgetInfo.config.service && widgetInfo.config.source) {
            let dataSourceObj;

            if (this.dataCollection.hasOwnProperty(widgetInfo.config.source)) {
                dataSourceClass = this.dataCollection[widgetInfo.config.source];
                dataSourceObj = new dataSourceClass(widgetInfo.config.service , this._httpClient);
            }

            this.getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata);
        } else if (widgetInfo.config.data) {
            this.getJsonData(widgetInfo, thisCompRef, metadata);
        } else if (widgetInfo.config.html) {
            this.getHtmlData(widgetInfo, thisCompRef, metadata);
        }
    }

    getServiceData(widgetInfo, dataSourceObj, thisCompRef, metadata) {
        dataSourceObj.getAll().map(data => {
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
        (thisCompRef.instance).widgetName = widgetInfo.name;
        (thisCompRef.instance).metadata = metadata;
        this.dynamicComponents.push(thisCompRef);
    }

    /**
     * DestroyDynamicComponents
     */
    public DestroyDynamicComponents() {
        this.dynamicComponents.forEach(component => {
            console.log("DESTROY COMPONENT");
            component.destroy();
        });
    }
}
