import { AppError, NotFoundError, BadInput } from './../error-handler/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as config from 'assets/config.json';

@Injectable()
export class BaseService {

  constructor(public _httpClient: HttpClient, public url: string, public host?: string) {
    this.host = this.host ? this.host : config['server']['host'];
  }

  /**
   * This function get the record on provided slug
   *
   * @param slug - slug is url part
   */
  public get(slug: string) {
    return this._httpClient.get(this.host + this.url + slug)
      .catch(this.handleError);
  }

  /**
   * This function get list
   */
  public getAll() {
    return this._httpClient.get(this.host + this.url)
      .catch(this.handleError);
  }

  public post() {
  }

  public update() {

  }

  public delete() {

  }

  /**
   * This function is used to handle custom error
   *
   * @param error - angular error handler object
   */
  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }
}
