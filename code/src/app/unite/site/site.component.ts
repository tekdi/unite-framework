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
                                this.pagesMenu = pageData;
                            });
    }

    getWidgetsData(widgets : Array<any>)
    {
        console.log("widgets chekcing = ", widgets);

        widgets.forEach(element => {
                if(element['dataSource'])
                {
                    this.getDataSource(element);
                }
            });
    }

    getDataSource(element)
    {
        var ds = this._widgetService.getDataSource(element.dataSource);

        if(ds.__proto__.hasOwnProperty('getData'))
        {
            ds.getData().subscribe(sourceData => {
                console.log("source data chekcing ", sourceData);
            });
        }
        else
        {
            console.error("getData not found for dataSource ", ds);
        }
    }

    renderDynamicComponent(fwData){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(fwData.component);

        let viewContainerRef = this.adHost.viewContainerRef;
        //viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = fwData.data;
        (<AdComponent>componentRef.instance).mapper = fwData.mapper;
    }
}