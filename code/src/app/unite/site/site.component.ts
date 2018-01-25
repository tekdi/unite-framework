import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from './site.service';

import { AdDirective } from './ad.directive';
import { AdComponent } from './ad.component';

import { FactoryLayouts } from './layout.collection';
import { factoryMapper } from './mapper.collection';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl : './frontend/sunbird/layouts/index.html',
    providers : [WidgetService],
    styleUrls: []
})
export class SiteComponent implements OnInit {

    @ViewChild(AdDirective) adHost: AdDirective;
    pagesMenu   = [];
    invalidPage = true;
    totalWidgets = [];

    constructor(
                private _acRoute : ActivatedRoute,
                private _widgetService : WidgetService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private titleService: Title
            ) { }

    ngOnInit() {

        this.getAllPages();

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
                this.totalWidgets.push(1);
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
                        checkArr['widName'] = element['title'];

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
        (<AdComponent>componentRef.instance).widName = fwData.widName;
        (<AdComponent>componentRef.instance).data = fwData.data;
        (<AdComponent>componentRef.instance).mapper = fwData.mapper;
        this.totalWidgets.pop();
    }
}
