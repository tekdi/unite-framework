import { Directive, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { viewsObject } from '../../views';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appAddViewToRoute]'
})
export class AddViewToRouteDirective {

  @Input('appAddViewToRoute') set config(availableLayouts) { }
  constructor(
    private _acRoute: ActivatedRoute,
    private _vcRef: ViewContainerRef,
    private _cfResolver: ComponentFactoryResolver) {

    let compObj = viewsObject[this._acRoute.snapshot.data.viewMapper];
    let componentFactory = this._cfResolver.resolveComponentFactory(compObj);
    this._vcRef.createComponent(componentFactory);
    console.log("Add View To Route construct");
  }
}
