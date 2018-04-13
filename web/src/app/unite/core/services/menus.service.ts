import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class MenusService extends BaseService{

  constructor(_httpClient: HttpClient, url?: string) {
    url = url ? url : 'api/menus?filter[include][source][extension]=routes';
    super(_httpClient, url);
  }

  getMenus(): any {
    return this.getAll();
  }
}
