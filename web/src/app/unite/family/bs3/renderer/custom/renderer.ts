import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class CustomRenderer{
    @Input() data;
    @Input() widgetName;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;
constructor(private sanitizer: DomSanitizer){

}
    mapProperties(data, mapObj) {
        this.localMap = mapObj;
        this.localData = this.sanitizer.bypassSecurityTrustHtml(data);
    }
}
