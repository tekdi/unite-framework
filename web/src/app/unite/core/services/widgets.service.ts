import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetsService extends BaseService {
  constructor(_httpClient: HttpClient) {
    super(_httpClient, 'api/WidgetAssignments?filter[include][widget]=source&filter[order]=ordering&filter[where][menuUrl]');
  }
}
