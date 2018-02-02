import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router'

import { TemplateSelector } from '../../uniteDirectives/template.selector';
import { RendererSelector } from '../../uniteDirectives/renderer.selector';
import { SbComp } from './sb.component';

import { UniteRouting } from '../../uniteServices/routingService';

import { SuiModule, SuiProgressModule } from 'ng2-semantic-ui';
import { sbTemplates } from './templates/templates.collections';
import { sbRenderers } from './renderer/renderers.collection';

import { UniteMapperPipe } from '../../pipes/mapper.pipe';
import { SlickModule } from 'ngx-slick';

const r : Routes = [ 
    {path : "**", component : SbComp} 
    ];

@NgModule({
    imports : [CommonModule, SlickModule, SuiProgressModule, RouterModule.forChild(r)],
    declarations : [SbComp, sbTemplates, sbRenderers, TemplateSelector, RendererSelector, UniteMapperPipe],
    entryComponents : [sbTemplates, sbRenderers],
    providers : []
})
export class SbFamily{
    constructor(){

        console.log("this is Sb family....");
    }
}