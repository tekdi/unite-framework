import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class BaseService {

  constructor(private _httpClient: HttpClient) { 

  }

  get(url) {
    return this._httpClient.get(url);
  }

  post() {
  
  }

  update() {

  }

  delete() {

  }
}
