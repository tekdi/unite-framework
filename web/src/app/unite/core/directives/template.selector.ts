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
    ) {
        console.log("SELECT LAYOUT");
     }

    renderTemplate(availableLayouts) {
        console.log('TEMPLATE SELECTOR', this._config.site);
        let layout = this._config.site['template'];
        console.log('Layout', layout);
        if (availableLayouts.hasOwnProperty(layout)) {
            let componentFactory = this._cfResolver.resolveComponentFactory(availableLayouts[layout]);
            this._vcRef.createComponent(componentFactory);
        }
        else {
            console.log('ERROR : Template not found...');
        }
    }
}