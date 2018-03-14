import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./renderer.html",
    styleUrls: ['./renderer.css']
})
export class SunbirdIconListRenderer{
    @Input() data : Array<any>;
    @Input() widName;
    loading = true;
    @Input() set mapper(value){
        this.mapProperties(this.data, value);
    };

    localData;
    localMap;

    mapProperties(data, mapObj)
    {
        console.log('Mapper Object ICONLIST ===>>',mapObj);
        console.log('Local Data ICONLIST ===>>',data);
        this.localMap = mapObj;
        this.localData = data;
        this.loading = false;
    }
}