import { UniteRouting } from './../../uniteServices/routingService';
import { Menu } from './../../core/classes/menu';
import { Config } from './../../core/classes';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BS3LayoutsMapper } from './layouts/';

@Component({
    template : `<ng-template [selectLayout]="bs3Layouts"></ng-template>`,
    styleUrls : ['./custom.css'],
    encapsulation: ViewEncapsulation.None
})
export class bs3Comp {

    bs3Layouts = BS3LayoutsMapper;

    constructor(
        private _acRoutes: ActivatedRoute,
        private _config: Config,
        private _menu: Menu,
        private _uniteRouting: UniteRouting) {
        this._config.baserFamilyPath = this._acRoutes.snapshot.data;
    }
}
