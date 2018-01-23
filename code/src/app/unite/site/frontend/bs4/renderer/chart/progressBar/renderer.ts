import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class BS4ProgressbarRenderer{
    @Input() data : Array<any>;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data, mapObj) {
        this.localMap = mapObj;
        this.localData = data;
    }
}