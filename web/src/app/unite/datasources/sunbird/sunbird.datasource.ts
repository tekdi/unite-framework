import { SunbirdProfileDataService } from './collections/profile.dataservice';
import { SunbirdCoursesDataService } from './collections/courses.dataservice';
import { SunbirdCourseDataService } from './collections/course.dataservice';
import { SunbirdMockDataService } from './collections/mock.dataservice';
import { SBGraphDataSource } from './collections/graph.datasource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ServiceCollection =  {
                            'default' : SunbirdMockDataService,
                            'mockService' : SunbirdMockDataService,
                            'sbprofile'   : SunbirdProfileDataService,
                            'sbcourses' : SunbirdCoursesDataService,
                            'course': SunbirdCourseDataService,
                        };
                        
@Injectable()
export class SunbirdDataSource
{
    private dsConfigObj;
    constructor(private config, private _httpClient? : HttpClient)
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
            { title: "Home", path: "", id:"5a9fc127335ce35b44f752b4"},
            { title: "Courses", path: "courses", id:"5a9fc127335ce35b44f752b5"},
            { title: "Library", path: "library", id:"5a9fc127335ce35b44f752b6"},
            { title: "Profile", path: "profile", id:"5a9fc127335ce35b44f752b7"},
            { title: "Single Course", path: "course/:courseId", id:"5a9fc127335ce35b44f752b8"}
        ]
        return myRouteObj;
    }
}