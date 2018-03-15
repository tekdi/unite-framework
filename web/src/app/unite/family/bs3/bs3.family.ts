import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'
import { OwlModule } from 'ngx-owl-carousel';

import { TemplateSelector } from '../../uniteDirectives/template.selector';
import { RendererSelector } from '../../uniteDirectives/renderer.selector';
import { UniteLinkDirective } from '../../uniteDirectives/makelink.directive';
import { bs3Comp } from './bs3.component';

import { UniteRouting } from '../../uniteServices/routingService';

import { bs3Templates } from './templates/templates.collections';
import { bs3Renderers } from './renderer/renderers.collection';

import { UniteMapperPipe } from '../../pipes/mapper.pipe';
import { UniteLinkerPipe } from '../../pipes/linker.pipe';

const r : Routes = [ 
    {path : "**", component : bs3Comp} 
    ];

@NgModule({
    imports : [CommonModule,OwlModule, RouterModule.forChild(r)],
    declarations : [
                    bs3Comp,
                    bs3Templates,
                    bs3Renderers,
                    TemplateSelector,
                    RendererSelector,
                    UniteMapperPipe,
                    UniteLinkerPipe,
                    UniteLinkDirective
                    ],
    entryComponents : [bs3Templates, bs3Renderers],
    providers : []
})
export class bs3Family{
    constructor(){
        console.log("this is bs3 family....");
    }
}