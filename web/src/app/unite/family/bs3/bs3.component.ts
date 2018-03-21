import { Config } from './../../classes';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { bs3TemplatesMapper } from './templates/templates.collections';

@Component({
    template : `<ng-template [selectTemplate]="bs3Templates"></ng-template>`,
    styleUrls : ['./bs3.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class bs3Comp{

    bs3Templates = bs3TemplatesMapper;

    constructor(
        private _acRoutes : ActivatedRoute,
        private _config: Config )
    {
        this._config.baserFamilyPath = this._acRoutes.snapshot.data;
    }
}