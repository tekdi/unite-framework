import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from  "../../configs/global.configs";
import { bs4TemplatesMapper } from './templates/templates.collections';

@Component({
    template : `<ng-template [selectTemplate]="bs4Templates"></ng-template>`,
    styleUrls : ['./bs4.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class bs4Comp{

    bs4Templates = bs4TemplatesMapper;

    constructor(private _acRoutes : ActivatedRoute, private _glbConfig : GlobalConfig){
        this._glbConfig.baserFamilyPath = this._acRoutes.snapshot.data;
    }
    
}