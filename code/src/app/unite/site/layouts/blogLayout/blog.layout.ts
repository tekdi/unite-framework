import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./blog.layout.html",
    styleUrls: ['./blog.layout.css']
})
export class BlogLayout{
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