import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-family]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}