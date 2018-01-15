import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./list.layout.html"
})
export class ListLayout{
    @Input() data : Array<any>;
}