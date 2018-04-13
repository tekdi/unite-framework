import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetsService extends BaseService {

  constructor(_httpClient: HttpClient, url?: string) {
    url = url ? url : 'api/WidgetAssignments?filter[include][widget]=source&filter[where][menuUrl]';
    super(_httpClient, url);
  }

  getWidgets(menuUrl) {
    menuUrl = menuUrl == '' ? this.url: this.url + "=" + menuUrl; 
    return this.get(menuUrl);
  }
}
