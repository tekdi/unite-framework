import { Config } from './../../core/classes';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BS3LayoutsMapper } from './layouts/';

@Component({
    template : `<ng-template [selectLayout]="bs3Layouts"></ng-template>`,
    styleUrls : ['./bs3.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class bs3Comp{

    bs3Layouts = BS3LayoutsMapper;

    constructor(
        private _acRoutes : ActivatedRoute,
        private _config: Config )
    {
        console.log("BS3LayoutsMapper ", BS3LayoutsMapper);
        this._config.baserFamilyPath = this._acRoutes.snapshot.data;
    }
}