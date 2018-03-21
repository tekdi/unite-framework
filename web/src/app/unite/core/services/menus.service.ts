import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class MenusService extends BaseService{

  url: string = 'api/menus?filter[include][source][extension]=routes';

  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getMenus() {
    return this.get(this.url);
  }
}
