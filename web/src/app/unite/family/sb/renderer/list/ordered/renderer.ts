import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./renderer.html"
})
export class SunbirdListRenderer{
    @Input() data : Array<any>;
    @Input() widgetName;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data, mapObj) {
        this.localMap = mapObj;
        this.localData = data;

        console.log("hckeinca fdsajfdsjflkjdsaf ", data);
    }
}