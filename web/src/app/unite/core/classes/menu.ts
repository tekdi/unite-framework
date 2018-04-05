import { IMenu } from './../interfaces';

export class Menu {
    public menuUrl : string;
    private menuObject = {};
    private menuArray = [];
    /* 
    Init menu 
    */
    public initMenu(menu: IMenu) {
        this.setMenu(menu);
    }
    public setMenu(menu: IMenu) {
        this.menuObject[menu.menuUrl] = menu;
        this.menuArray.push(menu);
    }
    /* 
    Get menu serialize array 
    */
    public getMenus() {
        console.dir("GET MENUs", this.menuUrl);

        if (this.menuArray) {
            return this.menuArray;
        }
        return false;
    }
    /* 
    Get menu instance on current menuUrl 
    */
    public getInstance() {
        console.log("GET MENU INSTANCE", this.menuUrl);
        if (typeof (this.menuUrl) == 'undefined') {
            return false;
        }
        console.log("menuObject",this.menuObject);
        return this.menuObject[this.menuUrl];
    }
}
