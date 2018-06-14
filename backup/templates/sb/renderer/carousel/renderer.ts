import { Component, OnInit } from '@angular/core';
import { Renderer } from '@unite/core';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class SunbirdCarouselRenderer implements OnInit, Renderer {
    data;
    mapper;
    widgetName;
    metadata;
    slideConfig;

    constructor() { }

    // Data Manipulation
    ngOnInit() { 
        this.slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };
    }
}