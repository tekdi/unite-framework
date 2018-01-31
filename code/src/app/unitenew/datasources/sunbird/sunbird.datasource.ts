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
                latest : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Course"],"objectType":["Content"],"status":["Live"]},"sort_by":{"lastPublishedOn":"desc"},"limit":10}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        },
        {
            widName : 'Popular Courses',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                popular : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Course"],"objectType":["Content"],"status":["Live"]},"sort_by":{"me_averageRating":"desc"},"limit":10, "exists":["me_averageRating"]}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        }
    ],
    'co2' : [
        {
            widName : 'Address',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                popular : true,
                dataNode: "result.response.address"
            },
            mapper :{
                'image_url': 'avatar', 
                'caption': 'addType',
                'description1': 'addressLine1',
                'description2': 'addressLine2',
            },
            renderer : 'iconlist'
        },
    ]
}


@Injectable()
export class SunbirdDataSource
{
    private dsConfigObj;

    constructor(private config, private _httpClient? : HttpClient )
    {
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
            {path : "profile", service : "sbprofile", renderer : "personal", showDefault: false, widgets : widgets['co2']}
        ]

        return myRouteObj;
    }
}