import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetsService extends BaseService {
  url = 'http://172.132.45.94:3000/api/WidgetAssignments?filter[include][widget]=source';

  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getWidgets() {
    return this.get(this.url);
  }

}
