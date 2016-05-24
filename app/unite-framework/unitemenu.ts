import {LocalStorage,Storage, SqlStorage} from 'ionic-angular';
import {Injectable, Inject} from 'angular2/core';
@Injectable()
export class UniteMenu {
  pages: any;
  menuMap: any;
  local: any;
  
  constructor() {
    this.local = new Storage(SqlStorage);
  }

  getMenu() {
   return this.local.get("pages").then((value) => {
                if (value) {
                  this.pages = JSON.parse(value);
                }
                else {
                  this.local.set('pages', JSON.stringify(this.pages));
                }
                return this.pages;
            })
  }

  addMenu(pageobj) {
    this.pages.unshift({
      title: pageobj.menuname,
      component: pageobj.component,
      addedMenu: true,
    });
     this.local.set('pages', JSON.stringify(this.pages));
  }

  removeMenu(index) {
    this.pages.splice(index,1);
    this.local.set('pages', JSON.stringify(this.pages)); 
  }
  updateMenu(pageobj){
    this.pages[pageobj.index] = {
      title: pageobj.menuname,
      component: pageobj.component,
      addedMenu: true,
    };
    this.local.set('pages', JSON.stringify(this.pages));
  }

}

