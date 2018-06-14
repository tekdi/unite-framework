import { Component } from '@angular/core';
import { renderMapper } from '../../renderer/renderers.collection';
import { Menu } from '@unite/core';

@Component({
    templateUrl : "./one.template.html"
})
export class OneTemplate{
    renderMapper = renderMapper;
    uniteMenus;
    constructor(private _menu : Menu){
        this.uniteMenus = this._menu.getMenus();
    }
}