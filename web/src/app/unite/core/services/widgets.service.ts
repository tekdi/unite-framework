import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetsService extends BaseService {
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getWidgets(menuUrl) {
    let url = 'api/WidgetAssignments?filter[include][widget]=source&filter[where][menuUrl]';
    url = menuUrl == '' ? url: url + "=" + menuUrl; 
    return this.get(url);
  }
}
