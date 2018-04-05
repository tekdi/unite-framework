import { Injectable } from "@angular/core";
import { MenusService, WidgetsService } from "../core/services";
import { Config, Menu } from './../core/classes';

@Injectable()
export class UniteRouting {
    menu;
    menus;
    constructor(
        private _menusService: MenusService,
        private _widgetsService: WidgetsService,
        private _config: Config,
        private _menu: Menu) 
    {
        debugger;
        console.log("NEW MENU INSTANCE AT ROUTING 1", this._menu);
        console.log("NEW MENU INSTANCE AT ROUTING 2", this._menu.getInstance());
    }

    getMenus() {
        this.menus = this._menu.getMenus();
        this.menu = this._menu.getInstance();
        this.getMenuWidgets();
    }
/*
    getAllMenus() {
        let finalUniteBasePath = "";
        let menusToReturn = [];

        finalUniteBasePath += this._config.baserUnitePath['basePath'] ? this._config.baserUnitePath['basePath'] + "/" : "";
        finalUniteBasePath += this._config.baserFamilyPath['basePath'] ? this._config.baserFamilyPath['basePath'] + "/" : '';
        console.log("FINAL UNITE BASE PATH", finalUniteBasePath);
        console.log('%c CLASS CONFIG', 'color: green; font-weight: bold;', this._config);
        this.finalMenus.forEach(element => {
            let thisElement = element;
            if (thisElement.menuUrl.indexOf(':') == -1) {
                thisElement.menuUrl = finalUniteBasePath + thisElement.menuUrl;
                menusToReturn.push(thisElement);
            }
        });
        console.log(menusToReturn);
        return menusToReturn;
    }
*/
    getMenuWidgets() {
        console.log("GET ALL WIDGETS MENU", this.menu);
        this._widgetsService.getWidgets(this.menu.menuUrl).subscribe(widgets => {
            this.menu.widgets = widgets;
        });
    }
}