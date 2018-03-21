import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sbTemplatesMapper } from './templates/templates.collections';
import { Config } from './../../core/classes';

@Component({
    template : `<ng-template [selectTemplate]="sbTemplates"></ng-template>`,
    styleUrls : ['./sb.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SbComp{

    sbTemplates = sbTemplatesMapper;

    constructor(private _acRoutes : ActivatedRoute, 
        private _config: Config)
    {
        this._config.baserFamilyPath = this._acRoutes.snapshot.data;
    }
}