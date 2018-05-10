import { Directive, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { UniteRoute } from '../classes';

@Directive({
  selector: '[appAddViewToRoute]'
})

export class AddViewToRouteDirective {

  @Input('appAddViewToRoute') set config(availableLayouts) { }
  constructor(
    private _uniteRoute: UniteRoute,
    private _vcRef: ViewContainerRef,
    private _cfResolver: ComponentFactoryResolver) {

    let componentFactory = this._cfResolver.resolveComponentFactory(this._uniteRoute.view);
    this._vcRef.createComponent(componentFactory);
  }
}
