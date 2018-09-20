import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { Config } from './../classes';

@Directive({
  selector: '[selectLayout]'
})
export class LayoutSelector {

    @Input('selectLayout') set config(availableLayouts){
        this.renderLayout(availableLayouts);
    }
    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _config: Config
    ) {}

    renderLayout(availableLayouts) {
        let layout = this._config.site['template'];
        if (availableLayouts.hasOwnProperty(layout)) {
            console.log(layout, "LAYOUTS");
            let componentFactory = this._cfResolver.resolveComponentFactory(availableLayouts[layout]);
            this._vcRef.createComponent(componentFactory);
        } else {
            console.log('ERROR : Template not found...');
        }
    }
}
