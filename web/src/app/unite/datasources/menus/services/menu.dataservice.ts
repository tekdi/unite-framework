import { BaseService } from '@unite/core/services';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UniteMenuDataService extends BaseService
{
    dataUrl;
    dataNode;

    constructor(_httpClient: HttpClient, url?: string, host?: string) {
        super(_httpClient, 'api/contentful/events', 'http://localhost:3004/');
    }
}