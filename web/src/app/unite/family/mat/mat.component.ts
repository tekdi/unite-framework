import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { matTemplatesMapper } from './templates/templates.collections';
import { Config } from './../../core/classes';

@Component({
    template : `
                    <div> I am mat main component </div>
                    <ng-template [selectTemplate]="matTemplatesMapper"></ng-template>
                `
})
export class MatComp{
    matTemplatesMapper;

    constructor(private _acRoutes : ActivatedRoute, private _config: Config) {
        this._config.baserFamilyPath = this._acRoutes.snapshot.data;
        this.matTemplatesMapper = matTemplatesMapper;
    }
}