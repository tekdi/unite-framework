import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'

import { TemplateSelector } from '../../uniteDirectives/template.selector';
import { RendererSelector } from '../../uniteDirectives/renderer.selector';
import { MatComp } from './mat.component';

import { UniteRouting } from '../../uniteServices/routingService'
import { matRenderers } from './templates/templates.collections';
import { GridRenderer } from './renderers/grid/grid.renderer';


const r : Routes = [ 
    {path : "", component : MatComp} 
    ];

@NgModule({
    imports : [RouterModule.forChild(r)],
    declarations : [MatComp, TemplateSelector, RendererSelector, matRenderers, GridRenderer],
    entryComponents : [matRenderers, GridRenderer],
    providers : []
})
export class MatFamily{
    constructor(){

        console.log("this is MAT family....");
    }
}