import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class RoutesService extends BaseService {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, 'api/routes');
  }
}
