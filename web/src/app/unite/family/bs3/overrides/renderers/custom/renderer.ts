import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomRenderer } from '../../../../bs3/renderer/custom/renderer';

@Component({
    templateUrl: './renderer.html',
    styleUrls: ['./renderer.css']
})
export class CustomOverride extends CustomRenderer {

    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }
}
