import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

import { WidgetService } from './site.service';
import { SiteComponent } from './site.component';
import { GridComponent } from './layouts/gridComponent/grid.component';
import { ListComponent } from './layouts/listComponent/list.component';

import { AdDirective } from './ad.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
                  SiteComponent,
                  GridComponent,
                  ListComponent,
                  AdDirective
                ],
  exports:[SiteComponent],
  entryComponents: [GridComponent, ListComponent],
  providers : [WidgetService]
})
export class SiteModule {

  constructor(private _wdService : WidgetService, private _routes : Router){
    this._wdService.getPages()
                    .subscribe((pageData : Array<any>) => {
                        let dynamicRouteArr = [];
                        pageData.forEach(element => {
                          let pageRoutes = {}
                          pageRoutes['path'] = element.alias;
                          pageRoutes['component'] = SiteComponent;
                          pageRoutes['data'] = {'page-id' : element.page_id};
                          dynamicRouteArr.push(pageRoutes);
                        });

                        let finalRoutes = dynamicRouteArr.concat(this._routes.config);
                        this._routes.resetConfig(finalRoutes);

                        this._routes.navigate([]);
                    });
  }
}