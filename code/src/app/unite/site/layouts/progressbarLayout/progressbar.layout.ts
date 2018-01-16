import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./progressbar.layout.html",
    styleUrls: ['./progressbar.layout.css']
})
export class ProgressbarLayout{
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