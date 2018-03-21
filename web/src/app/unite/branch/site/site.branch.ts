import { BootModule } from './../../boot/boot.module';
import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, NgModuleFactoryLoader, SystemJsNgModuleLoader, Injector } from '@angular/core';
import { GlobalConfig } from  "../../configs/global.configs";
import { AdDirective } from "../branch.ad";
import { ActivatedRoute } from '@angular/router';

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
        private _bootModule: BootModule,
    private _glbConfig : GlobalConfig)
    {
        this._glbConfig.baserUnitePath = this._acRoutes.snapshot.data;
        this._bootModule.config.baserUnitePath = this._acRoutes.snapshot.data;

        console.log("acitvated routers in sdie dsite ", this._glbConfig.baserUnitePath);
    }

    ngAfterViewInit()
    {
    }

    setFamilyAndTemplate()
    { }

}