import { Component, OnInit } from '@angular/core';
import { Renderer } from '@unite/core';

@Component({
    templateUrl: "./renderer.html"
})
export class NavRenderer implements OnInit, Renderer {
    data;
    mapper;
    widgetName;
    metadata;

    constructor() {
        // var current = this
        console.log("AAAAAAAAAAA", this);
        console.log("AAAAAAAAAAA", this.data);
    }

    // Data Manipulation 
    ngOnInit() { }
}