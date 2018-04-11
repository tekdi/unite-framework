import { Injectable } from "@angular/core";
import { MenusService, WidgetsService } from "../core/services";
import { Menu } from './../core/classes';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UniteRouting {
    public menu;
    public menus;

    constructor(
        private _menusService: MenusService,
        private _widgetsService: WidgetsService,
        private _menu: Menu) {
            console.log("ROUTING SERVICE");
        }

    public getMenus(): void{
        this.menus = this._menu.getMenus();
        this.menu = this._menu.getInstance();
    }
}