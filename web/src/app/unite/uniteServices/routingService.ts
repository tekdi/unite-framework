import { Injectable } from "@angular/core";
import { Menu } from './../core/classes';

@Injectable()
export class UniteRouting {
    public menu;
    public menus;

    constructor(
        private _menu: Menu)
    {
        console.log("ROUTING SERVICE");
    }

    public getMenus(): void{
        this.menus = this._menu.getMenus();
        this.menu = this._menu.getInstance();
    }
}