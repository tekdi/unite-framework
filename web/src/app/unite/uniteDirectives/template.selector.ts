import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { BootModule } from './../boot/boot.module';
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
        private _bootModule: BootModule
    ) { }

    renderTemplate(value) {
        let config = this._bootModule;

        console.log('Values',value);
        if (value[this._bootModule.config.site.template]) {
            let componentFactory = this._cfResolver.resolveComponentFactory(value[this._bootModule.config.site.template]);
            this._vcRef.createComponent(componentFactory);
        }
        else {
            console.log('ERROR : Template not found...');
        }
    }
}