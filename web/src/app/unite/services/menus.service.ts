import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class MenusService extends BaseService{

  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getMenus() {
    return this.get('http://172.132.45.94:3000/api/Menus');
  }
}
