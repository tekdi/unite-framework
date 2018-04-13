import { AppError, NotFoundError, BadInput } from './../error-handler/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as config from 'assets/config.json';

@Injectable()
export class BaseService {

  constructor(public _httpClient: HttpClient) { 

  }

  public get(url) {
    return this._httpClient.get(config['server']['host'] + url)
      .catch(this.handleError);
  }

  public post() {
  
  }

  public update() {

  }

  public delete() {

  }

  private handleError(error: Response) {
    if (error.status === 400)
        return Observable.throw(new BadInput(error));
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    return Observable.throw(new AppError(error));
  }
}
