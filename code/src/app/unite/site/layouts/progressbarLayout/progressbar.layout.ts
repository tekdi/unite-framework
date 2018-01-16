import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./progressbar.layout.html",
    styleUrls: ['./progressbar.layout.css']
})
export class ProgressbarLayout{
    @Input() data : Array<any>;
}