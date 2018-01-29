import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class SunbirdIconListRenderer{
    @Input() data : Array<any>;
    @Input() widName;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data, mapObj) {
console.log('data here',data);
        this.localMap = mapObj;
        this.localData = data;
    }
}