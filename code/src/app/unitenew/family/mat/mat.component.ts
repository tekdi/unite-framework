import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    template : `
                    <div> I am mat main component </div>
                    <ng-template selectTemplate="chekcing"></ng-template>
                `
})
export class MatComp{
    constructor(private _acRoutes : ActivatedRoute){
    }
    
}