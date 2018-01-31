import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
//import { OneTemplate } from '../family/sb/templates/1/one.template'
import { GlobalConfig } from '../configs/global.configs';

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
                  private _glConfig : GlobalConfig
              ) { }

    renderTemplate(value)
    {
        let siteConfig = this._glConfig.getGlobalConfig('site');
        let componentFactory = this._cfResolver.resolveComponentFactory(value[siteConfig.template]);
        this._vcRef.createComponent(componentFactory);
    }
}