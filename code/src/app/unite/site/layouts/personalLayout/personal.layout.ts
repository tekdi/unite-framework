import { Component, Input } from '@angular/core';

@Component({
    templateUrl : "./personal.layout.html",
    styleUrls: ['./personal.layout.css']
})
export class PersonalLayout{
    @Input() data : Array<any>;
}