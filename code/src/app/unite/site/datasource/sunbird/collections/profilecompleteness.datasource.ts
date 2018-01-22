import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SunbirdProfileDataSource
{
    dataUrl = "";
    sbHeaders : HttpHeaders;
    sbGetProfileUrl = ''
    sbApiHeader = {}

    /**
     * @function constructor
     * @desc inject config and httpClient
     * @param {object} config
     * @param {object} httpClient
     * @return object
     */
    constructor(config, private _httpClient? : HttpClient ) {
        var AuthorizationTo = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMTc1MDIwNDdlODc0ODZjOTM0ZDQ1ODdlYTQ4MmM3MyJ9.7LWocwCn5rrCScFQYOne8_Op2EOo-xTCK5JCFarHKSs';
        var xToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1WXhXdE4tZzRfMld5MG5PS1ZoaE5hU0gtM2lSSjdXU25ibFlwVVU0TFRrIn0.eyJqdGkiOiJjYjMyZjE3OS0wMDRhLTQ2MDItYjc3OS1iYjBmMDg3N2QzYzkiLCJleHAiOjE1MTYyNzA3NjQsIm5iZiI6MCwiaWF0IjoxNTE2MjY3MTY0LCJpc3MiOiJodHRwczovL2Rldi5vcGVuLXN1bmJpcmQub3JnL2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJhZG1pbi1jbGkiLCJzdWIiOiJkNWVmZDFhYi0zY2FkLTQwMzQtODE0My0zMmM0ODBmNWNjOWUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJjOTE2NTY1Yy1kZDJlLTRjOWQtYjFhZi1lOTQzZGQ1NjJjZjQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVzb3VyY2VfYWNjZXNzIjp7fSwibmFtZSI6IkFudWogR3VwdGEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbnVqdGVjaDY0IiwiZ2l2ZW5fbmFtZSI6IkFudWoiLCJmYW1pbHlfbmFtZSI6Ikd1cHRhIiwiZW1haWwiOiJhbnVqdGVjaDY0QGdtYWlsLmNvbSJ9.FTRY_T8A17dDgVf7EwQlHXCacAHikntE3sOD_m7RszeLjUbqy5rliib6Lb1kyGtenTfX_jTE7t4NtLHy2R6upHPb48lFsXWfTAsMNPuELowQXbHb6D8RnCKmbZhhOAh0WsdMKKRQfLaIguzjx3JTJIF7SGnhDrqE0HoaCxup4-kVnPsQFGAs1_mu-jMNJtAfT4yFJiqke7g5pwgCxfrNDGcNJfhoZ_dGmSgv-virgNd27GvWwvcLtO1yHEG53Ypo8HYOdtBm1EMbJSkO9hCJ8h0V1xtD7pHw8MjiT-bu_dcf7Ott2RIXw77W4fXPChr01hy3XPS7lH6yWHkHSv9KHg';

        this.dataUrl = config.baseUrl + config.endPoint;
        // TODO - remove this hardcoded URL
        this.sbGetProfileUrl = 'https://dev.open-sunbird.org/api/user/v1/read/b14e7747-e66d-49f3-8152-7a6706f0b530';
        this.sbApiHeader = {
            'Accept': 'application/json',
            'Content-Type': 'Content-Type',
            'X-Consumer-ID': '7c03ca2e78326957afbb098044a3f60783388d5cc731a37821a20d95ad497ca8',
            'ts': '2017-05-25 10:18:56:578+0530',
            'X-msgid': 'b593f61f-9729-481c-b3ae-5f807f17ac5a',
            'X-Device-ID': 'X-Device-ID',
            'X-Access-TokenId': 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLQXJpOFBIb3pqVnBWR0N0UzVGQWI5SjhTUDBpZWgzNS12WHY1UXJ0N0FrIn0.eyJqdGkiOiJlYTUzODI5ZS1jNGFlLTQ3ZTEtOTlmNi01MTJjZWJiODJiOTEiLCJleHAiOjE1MDY1MDMwMjcsIm5iZiI6MCwiaWF0IjoxNTA2NTAyOTY3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiYWRtaW4tY2xpIiwic3ViIjoiMDE1ODViZmMtOTkyNy00ODhlLWIxMTQtMjUwNjkzODk0ZDQ5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMjQxZDM0ZTMtYzRjNC00MzJlLThmYWQtMWEzYjhkMWMwOWE0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlc291cmNlX2FjY2VzcyI6e30sIm5hbWUiOiJBbWl0IEt1bWFyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYW1pdDI1Lmt1bWFyMTI3OCIsImdpdmVuX25hbWUiOiJBbWl0IiwiZmFtaWx5X25hbWUiOiJLdW1hciIsImVtYWlsIjoiYW1pdDI1Lmt1bWFyMzFAdGFyZW50by5jb20ifQ.isVk1Dsw1ZxwTLuv5BIR7N5s85HPftncsLBOof4olqYkAgRM6raI6x-oeaTzaI4UrzxV-gmSwvhKym2ARZIU6mUEr3GmtS-BocFiRIeY4T1MwjzqReatMgGaPrS3cvhiWmvJpQaGo0MtIm9Ej6QP86pgkgqNz94Z7GQONb2Rfy92JcgrYysG-2_ebf8TBbrIPC3yFkvZAf7uE0vx_Tyj_UnYUgBCqWM0yfeRhnKyn0ilM338uCZ4AWfUk-BkMSVH0TpXGRO0GCZjyKVWXEAs7Sc_WqZw-AuY-TzKp9JgDK7vE5mSoYEAsyoRMB9HZSyjGsqfFSHewEPKkJmIEeWFBA',
            'x-authenticated-user-token': xToken,
            Authorization: AuthorizationTo
        }
    }

    /**
     * @Function getData
     * @Desc - to get user profile data
     * @return object
     */
    getData() {
        return this._httpClient.get(this.sbGetProfileUrl, {headers: this.sbApiHeader});    
    }
}