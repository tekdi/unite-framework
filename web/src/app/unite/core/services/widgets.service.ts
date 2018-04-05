import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetsService extends BaseService {
  url = 'api/WidgetAssignments?filter[include][widget]=source&filter[where][menuUrl]';
  constructor(_httpClient: HttpClient) {
    super(_httpClient);
  }

  getWidgets(menuUrl) {
    this.url = menuUrl == '' ? this.url: this.url + "=" + menuUrl; 
    return this.get(this.url);
  }
}
