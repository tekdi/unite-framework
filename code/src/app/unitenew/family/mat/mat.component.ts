import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { matTemplatesMapper } from './templates/templates.collections';
import { GlobalConfig } from "../../configs/global.configs";

@Component({
    template : `
                    <div> I am mat main component </div>
                    <ng-template [selectTemplate]="matTemplatesMapper"></ng-template>
                `
})
export class MatComp{
    matTemplatesMapper;
    constructor(private _acRoutes : ActivatedRoute, private _glbConfig : GlobalConfig){
        this._glbConfig.baserFamilyPath = this._acRoutes.snapshot.data;
        this.matTemplatesMapper = matTemplatesMapper;
    }
}