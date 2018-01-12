import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from './site.service';

import { AdDirective } from './ad.directive';
import { AdComponent } from './ad.component';

@Component({
    template : `
                <div style="margin:25px 0 25px 0">
                    <span *ngFor="let menu of pagesMenu" style="margin:0 15px 0 0;">
                        <a [routerLink]="['/' + menu.alias] ">{{ menu.title }}</a>
                    </span>
                </div>
                <div *ngIf="invalidPage">Invalid Page</div>
                <ng-template ad-host></ng-template>
                `,
    providers : [WidgetService]
})
export class SiteComponent implements OnInit {

    @ViewChild(AdDirective) adHost: AdDirective;
    pagesMenu   = [];
    invalidPage = true;

    constructor(
                private _acRoute : ActivatedRoute,
                private _widgetService : WidgetService,
                private componentFactoryResolver: ComponentFactoryResolver
            ) { }

    ngOnInit() {

        this.getAllPages();

        this._acRoute.data.subscribe(data => {
            console.log('url data inforrrrr', data);

            if(!data['page-id'])
            {
                this.invalidPage = true;
                return;
            }

            this.invalidPage = false;

            this._widgetService.getPageWidgets(data['page-id'])
                .subscribe(pageWidgets => {
                    this.getWidgetsData(pageWidgets);
                });
        })
    }

    getAllPages()
    {
        this._widgetService.getPages()
                            .subscribe((pageData : Array<any>) => {
                                console.log("hello all, this is page data", pageData);
                                this.pagesMenu = pageData;
                            });
    }

    getWidgetsData(widgets : Array<any>)
    {
        widgets.forEach(element => {
            this._widgetService.getWidgetData(element.data_source, element.renderer_name, element.data_node_name)
                                .subscribe(fwData => {
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