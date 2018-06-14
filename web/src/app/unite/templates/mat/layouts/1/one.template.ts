import { Component } from '@angular/core';
import { renderMapper } from '../../renderers/renderers.collection';
import { Menu } from '@unite/core';

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper;
    uniteMenus;
    constructor(private _menu : Menu){
        this.renderMapper = renderMapper;
        this.uniteMenus = this._menu.getMenus();
    }
}