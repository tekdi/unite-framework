import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from './site.service';

import { AdDirective } from './ad.directive';
import { AdComponent } from './ad.component';

import { FactoryLayouts } from './layout.collection';
import { factoryMapper } from './mapper.collection';
import { Title } from '@angular/platform-browser';
import {PlatformLocation } from '@angular/common';

@Component({
    template : `
                <div class="nvbar navbar-inverse">
					<div class="container">
						<div class="navbar-header">
							<a class="navbar-brand" href="/#">Unite</a>
						</div>
						<div class=" navbar-right">
							<ul class="nav navbar-nav">
								<li *ngFor="let menu of pagesMenu"  role="presentation">
									<a [routerLink]="['/' + menu.alias] " routerLinkActive="active" >{{ menu.title }}</a>
								</li>
							</ul>
						</div>
					</div>
                </div>
                <div *ngIf="invalidPage" class="container">Invalid Page</div>
                <ng-template ad-host></ng-template>

                <div *ngFor="let widgets of totalWidgets">
                    <div class="loader"></div>
                </div>
                `,
    providers : [WidgetService],
    styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

    @ViewChild(AdDirective) adHost: AdDirective;
    pagesMenu   = [];
    invalidPage = true;
    totalWidgets = [];
    thisRoute;

    constructor(
                private _acRoute : ActivatedRoute,
                private _widgetService : WidgetService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private titleService: Title,
                private platformLocation: PlatformLocation
            ) { }

    ngOnInit() {


        //console.log("this is my current page url ", this.platformLocation);

        // This call is for rendering pages as header menus
        this.getAllPages();

        console.log("ajsldjfasf ", this._acRoute.snapshot.url);

        this._acRoute.params.subscribe(paramData => {
            this.thisRoute = paramData.page;

           // console.log("---------------------", this.thisRoute);

            this._acRoute.data.subscribe(data => {

                if(!data['page-id'])
                {
                    this.invalidPage = true;
                    return;
                }

                this.invalidPage = false;
                this.titleService.setTitle( data['page-title'] );
                this._widgetService.getPageWidgets(data['page-id'])
                    .subscribe(pageWidgets => {
                        this.getWidgetsData(pageWidgets, paramData.page);
                    });
            });
        });
    }

    getAllPages()
    {
        this._widgetService.getPages()
                            .subscribe((pageData : Array<any>) => {
                                this.pagesMenu = pageData;
                            });
    }

    getWidgetsData(widgets : Array<any>, baseRoute)
    {
        //console.log("widgets chekcing = ", widgets);

        widgets.forEach(element => {
                this.totalWidgets.push(1);
                if(element['dataSource'])
                {
                    this.getDataSource(element, baseRoute);
                }
            });
    }

    getDataSource(element, baseRoute)
    {
       // console.log("chekicng routes insdie getDataSourvce ===== ", baseRoute);
        if(element["dataSource"]["name"] !== undefined)
        {
            var mapperInfo = factoryMapper[element["dataSource"]["name"]][element['renderer_name']];
            var layoutInfo = FactoryLayouts[element['renderer_name']];

            var ds = this._widgetService.getDataSource(element.dataSource, this.thisRoute);

            if(ds && ds.__proto__.hasOwnProperty('getData'))
            {
                ds.getData().subscribe(sourceData => {

                    if(mapperInfo && layoutInfo)
                    {
                        var checkArr = {};

                        checkArr['data'] = sourceData['data'] ? sourceData['data'] :sourceData;
                        checkArr['mapper'] = mapperInfo;
                        checkArr['component'] = layoutInfo;
                        checkArr['widName'] = element['title'];

                        if(sourceData['routes'])
                        {
                            this.addDynamicRoutes(sourceData['routes']);
                        }

                        this.renderDynamicComponent(checkArr);
                    }
                });
            }
            else
            {
                //console.error("getData not found for dataSource ", ds);
            }
        }
    }

    addDynamicRoutes(dyRoutes){
        console.log("this are dynamic routes ", dyRoutes);
    }

    renderDynamicComponent(fwData){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(fwData.component);

        let viewContainerRef = this.adHost.viewContainerRef;
        //viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).widName = fwData.widName;
        (<AdComponent>componentRef.instance).data = fwData.data;
        (<AdComponent>componentRef.instance).mapper = fwData.mapper;
        this.totalWidgets.pop();
    }
}
