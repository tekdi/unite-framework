import { IMenu } from './../interfaces';

export class Menu {
    public menuUrl = 'undefined';
    private menuObject: Object = {};
    private menuArray: Array<IMenu> = [];

    /* 
    Init menu 
    */
    public initMenu(menu: IMenu): void {
        this.setMenu(menu);
    }

    /*
    Get menus serialize array 
    */
    public setMenu(menu: IMenu): void {
        this.menuObject[menu.menuUrl] = menu;
        this.menuArray.push(menu);
    }

    /*
    Get menus serialize array 
    */
    public getMenus(): Array<IMenu> | boolean {
        console.dir("GET MENUs", this.menuUrl);

        if (this.menuArray) {
            return this.menuArray;
        }
        return false;
    }

    /* 
    Get menu instance on current menuUrl 
    */
    public getInstance(): IMenu | boolean {
        if (typeof (this.menuUrl) == 'undefined') {
            return false;
        }
        return this.menuObject[this.menuUrl];
    }
}
