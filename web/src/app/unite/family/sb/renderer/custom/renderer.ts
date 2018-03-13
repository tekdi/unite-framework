import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class SunbirdCustomRenderer{
    @Input() data;
    @Input() widName;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data1, mapObj) {
        this.localMap = mapObj;
        this.localData = data1;
        console.log("HTMLLLLLLLLLLLLLLL", data1);
    }
}
