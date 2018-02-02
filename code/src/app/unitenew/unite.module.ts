import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


import { PlatformLocation, CommonModule } from '@angular/common';

import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';

import { GlobalConfig } from './configs/global.configs';
import { UniteRouting } from './uniteServices/routingService';

import { dataSources } from './datasources/sources.collection';
import { UniteMapperPipe } from './pipes/mapper.pipe';

import { HttpClientModule } from '@angular/common/http';

import 'rxjs/Rx';

const uniteRoutes : Routes = [
    {path : "admin", component : AdminBranch},
    {path : "", component : SiteBranch,
        children: [
            {path: 'sb', loadChildren : "./family/sb/sb.family#SbFamily", data : {basePath : 'sb'}},
            /*{path: 'mdb', loadChildren : "./family/mdb/mdb.family#MdbFamily"},
            {path: 'mat', loadChildren : "./family/mat/mat.family#MatFamily"},
            {path: 'bs4', loadChildren : "./family/bs4/bs4.family#Bs4Family"}*/
        ],
        
    }
]

@NgModule({
    declarations : [SiteBranch, AdminBranch],
    imports : [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(uniteRoutes)
    ],
    providers : [GlobalConfig, SystemJsNgModuleLoader, UniteRouting]
})
export class UniteModule{

    constructor( private _uniteRouting : UniteRouting )
    {
        this._uniteRouting.createDynamicMenus(dataSources);
    }

}
