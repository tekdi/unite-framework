import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { Config } from './../classes';
//import { OneTemplate } from '../family/sb/templates/1/one.template'

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
        console.log("TEMPLATE");
        console.log(this._config.site.template);
        console.log('Values',value);
        if (value[this._config.site.template]) {
            let componentFactory = this._cfResolver.resolveComponentFactory(value[this._config.site.template]);
            this._vcRef.createComponent(componentFactory);
        }
        else {
            console.log('ERROR : Template not found...');
        }
    }
}