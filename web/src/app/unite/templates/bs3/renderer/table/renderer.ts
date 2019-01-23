import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer } from '@unite/core';

@Component({
    templateUrl : './renderer.html',
    styleUrls: ['./renderer.css']
})
export class TableRenderer implements OnInit, Renderer {
    data;
    mapper;
    widgetName;
    metadata;

    constructor(private sanitizer: DomSanitizer) { }

    // Data Manipulation
    ngOnInit() {  }
}
