import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from '@angular/router'

import { TemplateSelector } from '../../core/directives/template.selector';
import { RendererSelector } from '../../core/directives/renderer.selector';
import { MatComp } from './mat.component';

import { matTemplates } from './layouts';
import { matRenderers } from './renderers/renderers.collection';

const r : Routes = [
    {path : "**", component : MatComp} 
    ];

@NgModule({
    imports : [CommonModule,RouterModule.forChild(r)],
    declarations : [
                        MatComp,
                        TemplateSelector,
                        RendererSelector,
                        matRenderers,
                        matTemplates
                    ],
    entryComponents : [matRenderers, matTemplates],
    providers : []
})
export class MatTemplate{
    constructor(){
        console.log("this is MAT family....");
    }
}