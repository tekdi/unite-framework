import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from './site.service';

import { AdDirective } from './ad.directive';
import { AdComponent } from './ad.component';

import { FactoryLayouts } from './layout.collection';
import { factoryMapper } from './mapper.collection';

@Component({
    template : `
                <div class="container">
					<ul class="nav navbar-nav pull-right">
						<li *ngFor="let menu of pagesMenu"  class="list-inline">
							<a [routerLink]="['/' + menu.alias] ">{{ menu.title }}</a>
						</li>
                    </ul>
                </div>
                <div *ngIf="invalidPage" class="container">Invalid Page</div>
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
        if(element["dataSource"]["name"] !== undefined)
        {
            var mapperInfo = factoryMapper[element["dataSource"]["name"]][element['renderer_name']];
            var layoutInfo = FactoryLayouts[element['renderer_name']];

            console.log("mapper Info ", mapperInfo);
            console.log("layout infor ", layoutInfo);

            var ds = this._widgetService.getDataSource(element.dataSource);

            if(ds && ds.__proto__.hasOwnProperty('getData'))
            {
                ds.getData().subscribe(sourceData => {

                    if(mapperInfo && layoutInfo)
                    {
                        var checkArr = {};
                        
                        checkArr['data'] = sourceData;
                        checkArr['mapper'] = mapperInfo;
                        checkArr['component'] = layoutInfo;

                        this.renderDynamicComponent(checkArr);
                    }
                });
            }
            else
            {
                console.error("getData not found for dataSource ", ds);
            }
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
