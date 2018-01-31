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
                 dataNode: "result.response"
             },
             mapper :{
                 'fname' : 'firstName',
                 'location' : 'location',
                 'lname' : 'lastName',
                 'img' : 'avatar',
                 'username' : 'loginId',
                 'lastLogin' : 'lastLogin'
             },
             renderer : 'personal'
         },
         {
             widName : 'Address',
             source : "sunbird",
             service : 'sbprofile',
             defaultConfig : {
                 dataNode: "result.response.address"
             },
             mapper :{
                 'image_url': 'icon', 
                 'caption': 'addType',
                 'description1': 'addressLine1',
                 'description2': 'addressLine2',
             },
             renderer : 'iconlist'
         },
        {
            widName : 'Education',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response.education"
            },
            mapper :{
                'image_url' : 'icon',
                'caption' : 'degree',
                'description1' :'grade',
                'description2' :'boardOrUniversity'
            },
            renderer : 'iconlist'
        },
        {
            widName : 'Experience',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response.jobProfile"
            },
            mapper :{
                'image_url' : 'icon',
                'caption' : 'jobName',
                'description1' :'orgName',
                'description2' :'role'
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