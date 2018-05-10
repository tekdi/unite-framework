import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PlatformLocation, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';

import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';
import { UniteRouting } from './uniteServices/routingService';
import { dataSources } from './datasources/sources.collection';

import {
        UniteMapperPipe,
        UniteLinkerPipe,
        Config, MenusService,
        Menu, WidgetsService
    } from '@unite/core';
import { AboutComponent } from './views';

const uniteRoutes: Routes = [
    {path : 'admin', component : AdminBranch},
    {path : '', component : SiteBranch,
        children: [
            { path: 'mat', loadChildren: './templates/mat/mat.template#MatTemplate', data : {basePath : 'mat'}},
            { path: '', loadChildren: './templates/bs3/bs3.template#bs3Template', data : {basePath : ''}},
            { path: 'sb', loadChildren: './templates/sb/sb.template#SbTemplate', data : {basePath : 'sb'}},
            /*{path: 'mdb', loadChildren : "./templates/mdb/mdb.template#MdbFamily"}*/
        ]
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
        UniteRouting,
        UniteMapperPipe,
        UniteLinkerPipe,
        MenusService,
        WidgetsService
    ]
})
export class UniteModule {
    constructor(private _uniteRouting: UniteRouting, private _menu: Menu, private _config: Config) {
        this._uniteRouting.getMenus();
    }
}
