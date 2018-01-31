import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { PlatformLocation } from '@angular/common';

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
        children: [{path: '**', loadChildren : "./family/sb/sb.family#SbFamily"}]
    }
]

@NgModule({
    declarations : [SiteBranch, AdminBranch],
    imports : [
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