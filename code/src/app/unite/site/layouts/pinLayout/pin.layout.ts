import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./pin.layout.html",
    styleUrls: ['./pin.layout.css']
})
export class PinLayout{
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