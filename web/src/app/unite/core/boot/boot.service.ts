import { Injectable } from '@angular/core';
import { Config, Menu } from './../../core/classes';
import { MenusService } from './../services/';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BootService {

  constructor(
    private _config: Config,
    private _menusService: MenusService,
    private _menu: Menu) {
  }

  /**
   * getConfig
   */
  public setConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
    console.log("SET NEW CONFIG");
      this._config.setConfig();
      resolve();
    });
  }

  /**
   * initMenus
   */
  public initMenus(): Promise<any> {
    return new Promise((resolve, reject)=>{
    
      this._menusService.getMenus().subscribe(menus => {
        menus.forEach(menu => {
          this._menu.initMenu(menu);
          console.log("INIT MENU SERVICE");
        });

        this._menu.menuUrl="";
        //console.log("INIT MENU SERVICE INSTANCE", this._menu.getMenus());
        resolve();
      });
    });
  }
}