import { CarouselRenderer } from './../../../../bs3/renderer/carousel/renderer';
import { Component, OnInit } from '@angular/core';
import { Renderer } from '@unite/core';

@Component({
    templateUrl: "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class CarouselOverride extends CarouselRenderer {

    constructor() {
        super();
    }
}
