import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./personal.layout.html",
    styleUrls: ['./personal.layout.css']
})
export class PersonalLayout{
    @Input() data : Array<any>;
    @Input() widName;
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