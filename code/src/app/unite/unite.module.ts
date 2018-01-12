import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from './site/site.module';
import { AdminModule } from './admin/admin.module';

import { RouterModule, Routes } from '@angular/router';

import { SiteComponent } from './site/site.component';
import { AdminComponent } from './admin/admin.component';

const routes : Routes = [
  {path : 'admin', component : AdminComponent},
  {path : ':page', component : SiteComponent},
  {path : '**', component : SiteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SiteModule,
    AdminModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UniteModule { }
