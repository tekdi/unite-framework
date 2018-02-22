import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from  "../../configs/global.configs";
import { sbTemplatesMapper } from './templates/templates.collections';

@Component({
    template : `<ng-template [selectTemplate]="sbTemplates"></ng-template>`,
    styleUrls : ['./sb.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SbComp{

    sbTemplates = sbTemplatesMapper;

    constructor(private _acRoutes : ActivatedRoute, private _glbConfig : GlobalConfig){
        this._glbConfig.baserFamilyPath = this._acRoutes.snapshot.data;
    }
    
}