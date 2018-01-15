import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./grid.layout.html"
})
export class GridLayout{
    @Input() data : Array<any>;
}