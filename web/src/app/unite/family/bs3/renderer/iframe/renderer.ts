import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl : "./renderer.html",
})
export class IframeRenderer{
    @Input() data;
    @Input() widgetName;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    constructor (private sanitizer:DomSanitizer){

    }
    localData;
    localMap;

    mapProperties(data, mapObj) {
        this.localMap = mapObj;
        this.localData = data;
        this.localData.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }

    
}
