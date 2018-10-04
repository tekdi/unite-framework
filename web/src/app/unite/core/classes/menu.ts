import { IMenu } from './../interfaces';

/**
 * Menu class which set, get menu object and also get menu list
 */
export class Menu {
    public menuUrl = 'undefined';
    private menuObject: Object = {};
    private menuArray: Array<IMenu> = [];

    /**
        Get menus serialize array

        @param menu object of Menu interface type

        @returns void
    */
    public setMenu(menu: IMenu): void {
        this.menuObject[menu.menuUrl] = menu;
        this.menuArray.push(menu);
    }

    /**
        Get menus serialize array

        @returns menus array

    */
    public getMenus(): Array<IMenu> {
        console.dir('GET MENUs', this.menuUrl);
        return this.menuArray;
    }

    /**
        Get menu instance on current menuUrl

        @returns false on undefined or menu current object on success.
    */
    public getInstance(): any {
        if (typeof (this.menuUrl) === 'undefined') {
            return false;
        }
        return this.menuObject[this.menuUrl];
    }
}
