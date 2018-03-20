import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  constructor(private _httpClient: HttpClient) { }

  getConfig() {
    return this._httpClient.get("/assets/config.json");
  }
}
