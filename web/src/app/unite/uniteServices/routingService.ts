import { Injectable } from "@angular/core";
import { MenusService, WidgetsService } from "../core/services";
import { Menu } from './../core/classes';

@Injectable()
export class UniteRouting {
    public menu;
    public menus;

    constructor(
        private _menusService: MenusService,
        private _widgetsService: WidgetsService,
        private _menu: Menu) { }

    public getMenus() {
        this.menus = this._menu.getMenus();
        this.menu = this._menu.getInstance();
        this.getMenuWidgets();
    }

    public getMenuWidgets() {
        console.log("GET ALL WIDGETS MENU", this.menu);
        this._widgetsService.getWidgets(this.menu.menuUrl).subscribe(widgets => {
            this.menu.widgets = widgets;
        });
    }
}