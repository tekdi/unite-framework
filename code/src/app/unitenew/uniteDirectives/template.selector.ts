import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { OneTemplate } from '../family/mat/templates/1/one.template'

@Directive({
  selector: '[selectTemplate]'
})
export class TemplateSelector {

    @Input('selectTemplate') set config(value){
    }
    constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(OneTemplate);
        this.viewContainerRef.createComponent(componentFactory);
     }
}