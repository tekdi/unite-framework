import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from '@angular/router'

import { TemplateSelector } from '../../uniteDirectives/template.selector';
import { RendererSelector } from '../../uniteDirectives/renderer.selector';
import { MatComp } from './mat.component';

import { UniteRouting } from '../../uniteServices/routingService'
import { matTemplates } from './templates/templates.collections';
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
export class MatFamily{
    constructor(){
        console.log("this is MAT family....");
    }
}