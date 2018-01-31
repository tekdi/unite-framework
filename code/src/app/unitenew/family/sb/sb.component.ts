import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sbTemplatesMapper } from './templates/templates.collections';

@Component({
    template : `<ng-template [selectTemplate]="sbTemplates"></ng-template>`
})
export class SbComp{

    sbTemplates = sbTemplatesMapper;

    constructor(private _acRoutes : ActivatedRoute){
    }
    
}