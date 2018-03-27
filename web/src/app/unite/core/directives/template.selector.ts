import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { Config } from './../classes';

@Directive({
  selector: '[selectTemplate]'
})
export class TemplateSelector {

    @Input('selectTemplate') set config(value){
      this.renderTemplate(value);
    }
    constructor(
        private _vcRef: ViewContainerRef,
        private _cfResolver: ComponentFactoryResolver,
        private _config: Config
    ) { }

    renderTemplate(value) {

        console.log('TEMPLATE SELECTOR', this._config.site);
        if (value['one']) {
            let componentFactory = this._cfResolver.resolveComponentFactory(value['one']);
            this._vcRef.createComponent(componentFactory);
        }
        else {
            console.log('ERROR : Template not found...');
        }
    }
}