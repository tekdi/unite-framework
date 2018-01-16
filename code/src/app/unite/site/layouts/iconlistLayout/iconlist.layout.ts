import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./iconlist.layout.html",
    styleUrls: ['./iconlist.layout.css']
})
export class IconListLayout{
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