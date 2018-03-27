import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'

import { TemplateSelector } from '../../core/directives/template.selector';
import { RendererSelector } from '../../core/directives/renderer.selector';
import { UniteLinkDirective } from '../../core/directives/makelink.directive';
import { SbComp } from './sb.component';

import { UniteRouting } from '../../uniteServices/routingService';

import { SuiModule, SuiProgressModule } from 'ng2-semantic-ui';
import { sbTemplates } from './layouts';
import { sbRenderers } from './renderer/renderers.collection';

import { UniteMapperPipe } from '../../core/pipes/mapper.pipe';
import { UniteLinkerPipe } from '../../core/pipes/linker.pipe';
import { SlickModule } from 'ngx-slick';

const r : Routes = [ 
    {path : "**", component : SbComp} 
    ];

@NgModule({
    imports : [CommonModule, SlickModule, SuiProgressModule, RouterModule.forChild(r)],
    declarations : [
                    SbComp,
                    sbTemplates,
                    sbRenderers,
                    TemplateSelector,
                    RendererSelector,
                    UniteMapperPipe,
                    UniteLinkerPipe,
                    UniteLinkDirective
                    ],
    entryComponents : [sbTemplates, sbRenderers],
    providers : []
})
export class SbFamily{
    constructor(){
        console.log("this is Sb family....");
    }
}