import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, NgModuleFactoryLoader, SystemJsNgModuleLoader, Injector } from '@angular/core';
import { AdDirective } from "../branch.ad";
import { ActivatedRoute } from '@angular/router';
import { Config } from './../../core/classes/config';
@Component({
    templateUrl : './site.branch.html',
    providers : [{
      provide: NgModuleFactoryLoader,
      useClass: SystemJsNgModuleLoader
    }]
})
export class SiteBranch implements OnInit {
    siteConfig;
    ngOnInit()
    { }

    constructor(
        private _acRoutes : ActivatedRoute,
        private _config: Config)
    {
        this._config.baserUnitePath = this._acRoutes.snapshot.data;
        console.log("acitvated routers in sdie dsite ", this._config.baserUnitePath);
    }

    ngAfterViewInit()
    {
    }

    setFamilyAndTemplate()
    { }

}