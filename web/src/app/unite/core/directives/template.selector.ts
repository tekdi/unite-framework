import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { Config } from './../classes';

@Directive({
  selector: '[selectLayout]'
})
export class TemplateSelector {

    @Input('selectLayout') set config(availableLayouts){
        this.renderTemplate(availableLayouts);
    }
    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _config: Config
    ) {}

    renderTemplate(availableLayouts) {
        let layout = this._config.site['template'];
        if (availableLayouts.hasOwnProperty(layout)) {
            let componentFactory = this._cfResolver.resolveComponentFactory(availableLayouts[layout]);
            this._vcRef.createComponent(componentFactory);
        }
        else {
            console.log('ERROR : Template not found...');
        }
    }
}