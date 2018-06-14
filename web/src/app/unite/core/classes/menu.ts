import { IMenu } from './../interfaces';

export class Menu {
    public menuUrl = 'undefined';
    private menuObject: Object = {};
    private menuArray: Array<IMenu> = [];
    // public widgets: Object = {};

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
    public getMenus(): Array<IMenu> {
        console.dir('GET MENUs', this.menuUrl);
        return this.menuArray;
    }

    /*
    Get menu instance on current menuUrl
    */
    // public getInstance(): IMenu | boolean {
    public getInstance(): any {
        if (typeof (this.menuUrl) === 'undefined') {
            return false;
        }
        return this.menuObject[this.menuUrl];
    }
}
