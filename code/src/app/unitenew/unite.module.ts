import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { PlatformLocation } from '@angular/common';

import { SiteBranch } from './branch/site/site.branch';
import { AdminBranch } from './branch/admin/admin.branch';

import { GlobalConfig } from './configs/global.configs';
import { UniteRouting } from './uniteServices/routingService';

import { dataSources } from './datasources/sources.collection';

const uniteRoutes : Routes = [
    {path : "admin", component : AdminBranch},
    {path : "", component : SiteBranch,
        children: [{path: '**', loadChildren : "./family/mat/mat.family#MatFamily"}]
    }
]

@NgModule({
    declarations : [SiteBranch, AdminBranch],
    imports : [
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