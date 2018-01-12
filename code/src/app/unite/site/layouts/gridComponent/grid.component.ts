import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./grid.component.html"
})
export class GridComponent{
    @Input() data : Array<any>;
}