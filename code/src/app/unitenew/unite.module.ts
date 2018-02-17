import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


import { PlatformLocation, CommonModule } from '@angular/common';

import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';

import { GlobalConfig } from './configs/global.configs';
import { Menues } from './configs/menus.configs';
import { Widgets } from './configs/widgets.config';
import { UniteRouting } from './uniteServices/routingService';

import { dataSources } from './datasources/sources.collection';
import { UniteMapperPipe } from './pipes/mapper.pipe';

import { HttpClientModule } from '@angular/common/http';

import 'rxjs/Rx';

const uniteRoutes : Routes = [
    {path : "admin", component : AdminBranch},
    {path : "", component : SiteBranch,
        children: [            
            {path: 'mat', loadChildren : "./family/mat/mat.family#MatFamily", data : {basePath : 'mat'}},
            {path: 'bs4', loadChildren : "./family/bs4/bs4.family#Bs4Family", data : {basePath : 'bs4'}},
            {path: '', loadChildren : "./family/sb/sb.family#SbFamily", data : {basePath : ''}},
            /*{path: 'mdb', loadChildren : "./family/mdb/mdb.family#MdbFamily"}*/
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
    providers : [Menues,Widgets,GlobalConfig, SystemJsNgModuleLoader, UniteRouting]
})
export class UniteModule{

    constructor( private _uniteRouting : UniteRouting )
    {
        this._uniteRouting.getMenus(dataSources);
    }
}