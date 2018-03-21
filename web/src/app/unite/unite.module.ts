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
        BootModule, 
        UniteMapperPipe, 
        UniteLinkerPipe, 
        Config, MenusService, 
        WidgetsService 
    } from '@unite/core';

const uniteRoutes : Routes = [
    {path : "admin", component : AdminBranch},
    {path : "", component : SiteBranch,
        children: [
            {path: 'mat', loadChildren : "./family/mat/mat.family#MatFamily", data : {basePath : 'mat'}},
            {path: '', loadChildren : "./family/bs3/bs3.family#bs3Family", data : {basePath : ''}},
            {path: 'sb', loadChildren : "./family/sb/sb.family#SbFamily", data : {basePath : 'sb'}},
            /*{path: 'mdb', loadChildren : "./family/mdb/mdb.family#MdbFamily"}*/
        ], 
    }
]

@NgModule({
    declarations : [SiteBranch, AdminBranch],
    imports : [
        CommonModule,
        HttpClientModule,
        BootModule,
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
export class UniteModule{
    constructor(private _uniteRouting: UniteRouting, private _config: Config ) {
        this._uniteRouting.getMenus(dataSources);
    }
}