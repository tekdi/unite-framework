import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./carousel.layout.html",
    styleUrls: ['./carousel.layout.css']
})
export class CarouselLayout{
    @Input() data : Array<any>;
}