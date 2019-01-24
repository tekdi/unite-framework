import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PlatformLocation, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';


import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';
import { dataSources } from './datasources/sources.collection';

import {
        UniteMapperPipe,
        UniteLinkerPipe,
        Config, MenusService,
        Menu, WidgetsService
    } from '@unite/core';


const uniteRoutes: Routes = [
    {path : 'admin', component : AdminBranch},
    {path : '', component : SiteBranch,
        children: [
            { path: '', loadChildren: './templates/bs3/bs3.template#bs3Template', data : {basePath : ''}}]
    }
];

@NgModule({
    declarations: [
        SiteBranch,
        AdminBranch
    ],
    imports : [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(uniteRoutes)
    ],

    providers: [
        SystemJsNgModuleLoader,
        UniteMapperPipe,
        UniteLinkerPipe,
        MenusService,
        WidgetsService
    ]
})
export class UniteModule {
    constructor(private _menu: Menu, private _config: Config) {  }
}
