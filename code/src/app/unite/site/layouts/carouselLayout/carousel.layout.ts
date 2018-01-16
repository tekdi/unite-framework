import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./carousel.layout.html",
    styleUrls: ['./carousel.layout.css']
})
export class CarouselLayout{
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