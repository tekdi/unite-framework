import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from './site.service';

import { AdDirective } from './ad.directive';
import { AdComponent } from './ad.component';

@Component({
    template : `
                <div>I am at site component</div>
                <ng-template ad-host></ng-template>
                <ng-template ad-host></ng-template>
                `,
    providers : [WidgetService]
})
export class SiteComponent implements OnInit {

    @ViewChild(AdDirective) adHost: AdDirective;

    constructor(
                private _acRoute : ActivatedRoute,
                private _widgetService : WidgetService,
                private componentFactoryResolver: ComponentFactoryResolver
            ) { }

    ngOnInit() {

        console.log('-----------------------------', this.adHost);


        this._acRoute.params.subscribe(data => {
            console.log('url data ', data);
            this._widgetService.getPageWidgets(1)
                .subscribe(pageWidgets => {
                    console.log("page widgets ", pageWidgets);
                    this.getWidgetsData(pageWidgets);
                });
        })
    }

    getWidgetsData(widgets : Array<any>){

        widgets.forEach(element => {
            this._widgetService.getWidgetData(element.data_source, element.renderer_name, element.data_node_name)
                                .subscribe(fwData => {
                                    console.log("widget final data ", fwData);
                                    this.renderDynamicComponent(fwData);
                                })
        });

    }

    renderDynamicComponent(fwData){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(fwData.component);

        let viewContainerRef = this.adHost.viewContainerRef;
        //viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = fwData.data;
    }
}