import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SiteComponent } from './site.component';
import { GridComponent } from './layouts/gridComponent/grid.component';
import { ListComponent } from './layouts/listComponent/list.component';

import { AdDirective } from './ad.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
                  SiteComponent,
                  GridComponent,
                  ListComponent,
                  AdDirective
                ],
  exports:[SiteComponent],
  entryComponents: [GridComponent, ListComponent],
  providers : []
})
export class SiteModule { }
