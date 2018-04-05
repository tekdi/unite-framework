import { Component } from '@angular/core';
import { UniteRouting } from '../../../../uniteServices/routingService';
import { renderMapper } from '../../renderer/renderers.collection';

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper = renderMapper;
    uniteMenus;
    constructor(private _routingService : UniteRouting){
        this.uniteMenus = this._routingService.menus;
    }
}