import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router'
import { OwlModule } from 'ngx-owl-carousel';

import { TemplateSelector } from '../../core/directives/template.selector';
import { RendererSelector } from '../../core/directives/renderer.selector';
import { UniteLinkDirective } from '../../core/directives/makelink.directive';
import { bs3Comp } from './bs3.component';

import { BS3Layouts } from './layouts';
import { bs3Renderers } from './renderer/renderers.collection';
import { overridesArray } from './overrides/renderers';

import { UniteMapperPipe } from '../../core/pipes/mapper.pipe';
import { UniteLinkerPipe } from '../../core/pipes/linker.pipe';

import {
    ForTeachersComponent,
    PartnersComponent,
    CurrentStatusComponent,
    ContentComponent,
    AboutComponent,
    HomeComponent,
    viwesArray,
    DefaultComponent,
    EventsComponent,
    EventDetailComponent
} from './views';

import { WidgetsService, UniteRoute } from '../../core';
import { AddViewToRouteDirective } from '../../core/directives/';

const compName = bs3Comp;
// const viewsRoute: Routes = [
//     { path: '**', component: compName, data: { viewMapper: ''}},
// ];

const viewsRoute: Routes = [
    { path: 'for-teachers', component: compName, data: { viewMapper: 'ForTeachersComponent'}},
    { path: 'partners', component: compName, data: { viewMapper: 'PartnersComponent' }},
    { path: 'events/:id', component: compName, data: { viewMapper: 'EventDetailComponent' }},
    { path: 'events', component: compName, data: { viewMapper: 'EventsComponent' }},
    { path: 'current-status', component: compName, data: { viewMapper: 'CurrentStatusComponent' }},
    { path: 'content', component: compName, data: { viewMapper: 'ContentComponent' }},
    { path: 'about', component: compName, data: { viewMapper: 'AboutComponent' }},
    { path: '', component: compName, data: { viewMapper: 'HomeComponent' }}
];

@NgModule({
    imports : [
        CommonModule,
        OwlModule,
        RouterModule.forChild(viewsRoute)
    ],
    declarations : [
        bs3Comp,
        BS3Layouts,
        bs3Renderers,
        overridesArray,
        TemplateSelector,
        RendererSelector,
        UniteMapperPipe,
        UniteLinkerPipe,
        UniteLinkDirective,
        AddViewToRouteDirective,

        // views component
        ForTeachersComponent,
        PartnersComponent,
        CurrentStatusComponent,
        ContentComponent,
        AboutComponent,
        HomeComponent,
        DefaultComponent,
        EventsComponent,
        EventDetailComponent  
    ],
    entryComponents: [BS3Layouts, bs3Renderers, overridesArray, viwesArray],
    providers: [WidgetsService, UniteRoute]
})

/**
 * Load all template required components in this module.
 * 
 * Here, bs3 is one template for Unite. 
 * You can also create any template like 'LighTemplate' which based on Angular material.
 * so, you need to load the required angular material components here. 
 */
export class bs3Template {
    constructor() {
        console.log('this is bs3 template....');
    }
}
