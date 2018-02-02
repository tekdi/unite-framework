import { Component } from '@angular/core';
import { renderMapper } from '../../renderer/renderers.collection';
import { UniteRouting } from '../../../../uniteServices/routingService';

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper = renderMapper;
    uniteMenus;
    constructor(private _routingService : UniteRouting){
         this.uniteMenus = this._routingService.getAllMenus()
    }
}