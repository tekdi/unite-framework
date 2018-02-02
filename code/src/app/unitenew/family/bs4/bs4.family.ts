import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from '@angular/router';

const r : Routes = [
    ];

@NgModule({
    imports : [CommonModule,RouterModule.forChild(r)],
})
export class Bs4Family{
    constructor(){
        console.log("this is bs4 family....");
    }
}