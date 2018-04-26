import { Component } from '@angular/core';
import { renderMapper } from '../../renderers/renderers.collection';
import { UniteRouting } from "../../../../uniteServices/routingService";

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper;
    uniteMenus;
    constructor(private _routingService : UniteRouting){
        this.renderMapper = renderMapper;
        this.uniteMenus = this._routingService.menus;
    }
}