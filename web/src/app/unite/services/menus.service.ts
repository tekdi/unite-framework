import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class MenusService extends BaseService{

<<<<<<< HEAD
  url: string = 'http://172.132.45.94:3000/api/menus?filter[include][source][extension]=routes';

=======
>>>>>>> c3bb65a18acff13d5bc13808c04b7765636c7fe9
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getMenus() {
<<<<<<< HEAD
    // return this.get('http://172.132.45.94:3000/api/Menus');
    return this.get(this.url);
=======
    return this.get('http://172.132.45.94:3000/api/Menus');
>>>>>>> c3bb65a18acff13d5bc13808c04b7765636c7fe9
  }
}
