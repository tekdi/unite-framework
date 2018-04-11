import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Config, Menu, MenusService } from './../core';

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
          this._menu.setMenu(menu);
          console.log("SET MENU SERVICE");
        });
        resolve();
      });
    });
  }
}