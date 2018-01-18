import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { WidgetService } from './site.service';
import { SiteComponent } from './site.component';
import { Layouts } from './layout.collection';
import { AdDirective } from './ad.directive';
import { UniteMapperPipe } from './mapper.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    ChartsModule,
    ProgressbarModule
  ],
  declarations: [
                  SiteComponent,
                  AdDirective,
                  UniteMapperPipe,
                  Layouts
                ],
  exports:[SiteComponent],
  entryComponents: [Layouts],
  providers : [WidgetService]
})
export class SiteModule {

  constructor(private _wdService : WidgetService, private _routes : Router){
    this._wdService.getPages()
                    .subscribe((pageData : Array<any>) => {
                        let dynamicRouteArr = [];
                        let defaultPageRedirect = {};

                        pageData.forEach(element => {
                          let pageRoutes = {}
                          pageRoutes['path'] = element.alias;
                          pageRoutes['component'] = SiteComponent;
                          pageRoutes['data'] = {'page-id' : element.page_id, 'page-title' : element.title};

                          if(element['default'])
                          {
                            defaultPageRedirect = { path: '',
                                                redirectTo: '/' + element.alias,
                                                pathMatch: 'full'
                                              }
                          }

                          dynamicRouteArr.push(pageRoutes);
                        });

                        dynamicRouteArr.push(defaultPageRedirect);

                        let finalRoutes = dynamicRouteArr.concat(this._routes.config);
                        this._routes.resetConfig(finalRoutes);

                        this._routes.navigate([]);
                    });
  }
}
