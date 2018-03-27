import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'
import { OwlModule } from 'ngx-owl-carousel';

import { TemplateSelector } from '../../core/directives/template.selector';
import { RendererSelector } from '../../core/directives/renderer.selector';
import { UniteLinkDirective } from '../../core/directives/makelink.directive';
import { bs3Comp } from './bs3.component';

import { UniteRouting } from '../../uniteServices/routingService';

import { BS3Layouts } from './layouts';
import { bs3Renderers } from './renderer/renderers.collection';

import { UniteMapperPipe } from '../../core/pipes/mapper.pipe';
import { UniteLinkerPipe } from '../../core/pipes/linker.pipe';

const r : Routes = [ 
    {path : "**", component : bs3Comp} 
    ];

@NgModule({
    imports : [CommonModule,OwlModule, RouterModule.forChild(r)],
    declarations : [
                    bs3Comp,
                    BS3Layouts,
                    bs3Renderers,
                    TemplateSelector,
                    RendererSelector,
                    UniteMapperPipe,
                    UniteLinkerPipe,
                    UniteLinkDirective
                    ],
    entryComponents: [BS3Layouts, bs3Renderers],
    providers : []
})
export class bs3Family{
    constructor(){
        console.log("this is bs3 family....");
    }
}