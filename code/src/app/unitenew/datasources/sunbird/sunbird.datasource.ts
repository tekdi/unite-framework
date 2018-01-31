import { SunbirdProfileDataService } from './collections/profile.dataservice';
import { SunbirdCoursesDataService } from './collections/courses.dataservice';
import { SunbirdMockDataService } from './collections/mock.dataservice';

import { SBGraphDataSource } from './collections/graph.datasource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ServiceCollection =  {
                            'default' : SunbirdMockDataService,
                            'mockService' : SunbirdMockDataService,
                            'sbprofile'   : SunbirdProfileDataService,
                            'sbcourses' : SunbirdCoursesDataService
                        }; 


const widgets = {
    'co1' : [
        {
            widName : 'Latest Courses',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                latest : true
            },
            renderer : 'carousel'
        },
        {
            widName : 'Popular Courses',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                popular : true
            },
            renderer : 'carousel'
        }
    ],
    'co2' : [
        {
            widName : 'Personal Information',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                "dataNode": "result.response",
                "dsName" : "personal",
                "baseUrl":"https://dev.open-sunbird.org/",
                "endPoint": "/api/user/v1/read/b14e7747-e66d-49f3-8152-7a6706f0b530",
                "xToken" : "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1WXhXdE4tZzRfMld5MG5PS1ZoaE5hU0gtM2lSSjdXU25ibFlwVVU0TFRrIn0.eyJqdGkiOiJiNDA1OTIwNi1iNzcwLTQwMWItYTBkNC1hNjYyY2M0MWFiMjUiLCJleHAiOjE1MjI0MTg5NjgsIm5iZiI6MCwiaWF0IjoxNTE3MjM0OTY4LCJpc3MiOiJodHRwczovL2Rldi5vcGVuLXN1bmJpcmQub3JnL2F1dGgvcmVhbG1zL3N1bmJpcmQiLCJhdWQiOiJhZG1pbi1jbGkiLCJzdWIiOiIyY2YwNTRiNS02MjI1LTQ5NTktODg5Zi1jMzYyOGE2MjAwMzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJkZTAxMTczOC0wMTNlLTQzZjQtYjY0MS05Yjk4MTIzOTZkYjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVzb3VyY2VfYWNjZXNzIjp7fSwibmFtZSI6Ik1hbmp1IERhdmFuYW0iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYW5qdWRAaWxpbWkuaW4iLCJnaXZlbl9uYW1lIjoiTWFuanUiLCJmYW1pbHlfbmFtZSI6IkRhdmFuYW0iLCJlbWFpbCI6Im1hbmp1bmF0aGRAaWxpbWkuaW4ifQ.SqSMbxWDCYZO5GMPVkNue6qR1k8oQznvFAoZ3ZcVgUPQep9P6N5urfcg1DhjnbmtQFFaST3p4hVpcnFm1aNE7awRBmGJvosX-ZhhN5TvHRoQxm2Ffez2U52xfEO9vswzoDEktXT8rYP7yCId-wbyKFjJ1e_zWjz9MTfk-IqvZj6rXz6ovXVVSWRNAGAfrfhw29lbdeIWEIA3Ef2vwzoFTlc6OFjVI3My6B6bdzKb2FbYXDFQv47mJPUVStiCaL7O_qLFbkGA4aLWP7Ltks1vpLD5JYgLWPD5IyLhs-BOudSHdIuvdTPcSQvW3S7KBdE6ItxXJGmQLC_hJGJhPoLhGw"
            },
            renderer : 'personal'
        },
        {
            widName : 'Address',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                popular : true
            },
            renderer : 'iconlist'
        },
        {
            widName : 'Education',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                popular : true
            },
            renderer : 'iconlist'
        }
    ]
}


@Injectable()
export class SunbirdDataSource
{
    private dsConfigObj;

    constructor(private config, private _httpClient? : HttpClient )
    {
        // let dsConfig = (config['dsName'] && rsCollection[config['dsName']])
        //                 ? rsCollection[config['dsName']]
        //                 : rsCollection['default'];

        // this.dsConfigObj = new dsConfig(config, _httpClient);
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['default'];

        let dsObj = new dsName(this.config, this._httpClient);
        return dsObj.getData().map(asdf => {
            return asdf;
        });
    }

    setRoutes(baseSegment)
    {
        let myRouteObj = [
            {path : "", service : "mockService", renderer : "sbHome"},
            {path : "courses", service : "sbcourses", renderer : "carousel", showDefault: false, widgets : widgets['co1']},
            {path : "profile", service : "sbprofile", renderer : "list", showDefault: true, widgets : widgets['co2']}

        ]

        return myRouteObj;
    }
}