import { Injectable } from "@angular/core";
import { MenusService, WidgetsService } from "../core/services";
import { Config, Menu } from './../core/classes';

@Injectable()
export class UniteRouting {
    menu;
    menus;
    finalMenus;
    constructor(
        private _menusService: MenusService,
        private _widgetsService: WidgetsService,
        private _config: Config,
        private _menu: Menu) 
    {
        console.log("NEW MENU INSTANCE AT ROUTING 1", this._menu);
        console.log("NEW MENU INSTANCE AT ROUTING 2", this._menu.getInstance());
    }

    getMenus() {
        this.menus = this._menu.getMenus();
        this.menu = this._menu.getInstance();
        this.finalMenus = this.menus;
        console.log("Final Menus", this.finalMenus);
        this.getMenuWidgets();
    }

    parseUniteUrl(uniteUrl) {
        return this.getMenuWidgets();
    }

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

        return menusToReturn;
    }

    getMenuWidgets() {
        console.log("GET ALL WIDGETS MENU", this.menu);
        this._widgetsService.getWidgets(this.menu.menuUrl).subscribe(widgets => {
            console.log("getMenuWidgets RESPONSE", widgets);
   //         this.menu.widgets = widgets;
            console.log("SINGLE MENU", this.menu);
            console.log("MENU ARRAY", this.menus);
            // this.finalMenus = this.menus;
           this.mapWidgetsWithMenu(widgets);
        });
    }

    mapWidgetsWithMenu(widgets) {
        let oldWidget = [];
        this.menus.forEach((menu, index) => {

            if (menu.menuUrl == '') {
                menu.widgets = widgets;
            }
        });

        this.finalMenus = this.menus;
        // console.log('FINAL NEW MENUS After Mapping', this.finalMenus);
        // console.log('FINAL MENUS After Mapping', this.menus);
    }
}