import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./list.component.html"
})
export class ListComponent{
    @Input() data : Array<any>;
}