import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'

import { TemplateSelector } from '../../uniteDirectives/template.selector';
import { RendererSelector } from '../../uniteDirectives/renderer.selector';
import { UniteLinkDirective } from '../../uniteDirectives/makelink.directive';
import { bs4Comp } from './bs4.component';

import { UniteRouting } from '../../uniteServices/routingService';

import { bs4Templates } from './templates/templates.collections';
import { bs4Renderers } from './renderer/renderers.collection';

import { UniteMapperPipe } from '../../pipes/mapper.pipe';
import { UniteLinkerPipe } from '../../pipes/linker.pipe';

const r : Routes = [ 
    {path : "**", component : bs4Comp} 
    ];

@NgModule({
    imports : [CommonModule, RouterModule.forChild(r)],
    declarations : [
                    bs4Comp,
                    bs4Templates,
                    bs4Renderers,
                    TemplateSelector,
                    RendererSelector,
                    UniteMapperPipe,
                    UniteLinkerPipe,
                    UniteLinkDirective
                    ],
    entryComponents : [bs4Templates, bs4Renderers],
    providers : []
})
export class bs4Family{
    constructor(){
        console.log("this is BS4 family....");
    }
}