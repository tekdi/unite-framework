import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from "./base.service";

@Injectable()
export class MenusService extends BaseService{
  constructor(_httpClient: HttpClient) {
    let url = 'api/menus?filter[include][source][extension]=routes';
    super(_httpClient, url);
  }
}
