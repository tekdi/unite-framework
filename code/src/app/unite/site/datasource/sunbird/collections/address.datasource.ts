import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class SunbirdAddressDataSource
{
    dataUrl;
    dataNode;
    apiBase;
    sbHeaders : HttpHeaders;
    sbApiHeader = {};


    constructor(config, private _httpClient? : HttpClient )
    {
        this.dataNode = config['dataNode'];
        this.apiBase = environment.apiBase;

        var AuthorizationTo = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMTc1MDIwNDdlODc0ODZjOTM0ZDQ1ODdlYTQ4MmM3MyJ9.7LWocwCn5rrCScFQYOne8_Op2EOo-xTCK5JCFarHKSs';
        var xToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1WXhXdE4tZzRfMld5MG5PS1ZoaE5hU0gtM2lSSjdXU25ibFlwVVU0TFRrIn0.eyJqdGkiOiJiNDA1OTIwNi1iNzcwLTQwMWItYTBkNC1hNjYyY2M0MWFiMjUiLCJleHAiOjE1MjI0MTg5NjgsIm5iZiI6MCwiaWF0IjoxNTE3MjM0OTY4LCJpc3MiOiJodHRwczovL2Rldi5vcGVuLXN1bmJpcmQub3JnL2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJhZG1pbi1jbGkiLCJzdWIiOiIyY2YwNTRiNS02MjI1LTQ5NTktODg5Zi1jMzYyOGE2MjAwMzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJkZTAxMTczOC0wMTNlLTQzZjQtYjY0MS05Yjk4MTIzOTZkYjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVzb3VyY2VfYWNjZXNzIjp7fSwibmFtZSI6Ik1hbmp1IERhdmFuYW0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYW5qdWRAaWxpbWkuaW4iLCJnaXZlbl9uYW1lIjoiTWFuanUiLCJmYW1pbHlfbmFtZSI6IkRhdmFuYW0iLCJlbWFpbCI6Im1hbmp1bmF0aGRAaWxpbWkuaW4ifQ.SqSMbxWDCYZO5GMPVkNue6qR1k8oQznvFAoZ3ZcVgUPQep9P6N5urfcg1DhjnbmtQFFaST3p4hVpcnFm1aNE7awRBmGJvosX-ZhhN5TvHRoQxm2Ffez2U52xfEO9vswzoDEktXT8rYP7yCId-wbyKFjJ1e_zWjz9MTfk-IqvZj6rXz6ovXVVSWRNAGAfrfhw29lbdeIWEIA3Ef2vwzoFTlc6OFjVI3My6B6bdzKb2FbYXDFQv47mJPUVStiCaL7O_qLFbkGA4aLWP7Ltks1vpLD5JYgLWPD5IyLhs-BOudSHdIuvdTPcSQvW3S7KBdE6ItxXJGmQLC_hJGJhPoLhGw';

        this.dataUrl = config.baseUrl + config.endPoint;
        console.log("url from sunbird address data source",this.dataUrl);
        // TODO - remove this hardcoded URL
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

    getData()
    {
        return this._httpClient.get(this.dataUrl, {headers: this.sbApiHeader})
                                .map(data => {
console.log('datNode',this.dataNode);
                                    if(this.dataNode)
                                    {
                                        let dataNode2 = this.dataNode.split(".");
                                        
                                        let myFinalValue = data;
                                        console.log('address get',data);
                                        dataNode2.forEach(element => {
                                            myFinalValue = myFinalValue[element];
                                        });

                                        return myFinalValue;
                                    }

                                    return data['result']['response']
                                });
    }
}