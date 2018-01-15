import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./carousel.component.html",
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent{
    @Input() data : Array<any>;
}