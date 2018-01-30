import { CountriesDataSource } from "./datasource/countries/countries.datasource";
import { TJLmsCoursesDataSource }  from "./datasource/tjlms/tjlmscourses.datasource";
import { EkLessonsDataSource } from './datasource/ekLessons/ekLessons.datasource';
// import { SBGraphDataSource } from './datasource/sunbird/sunbirdgraph.datasource';
// import { SunbirdAddressDataSource } from "./datasource/sunbird/sunbirdaddress.datasource";
// import { SunbirdProfileDataSource }  from "./datasource/sunbird/sunbirdprofilecompleteness.datasource";
// import { SunbirdPersonalDataSource }  from "./datasource/sunbird/sunbirdpersonal.datasource";
import { SunbirdDataSource } from './datasource/sunbird/sunbird.datasource';

export const DataSource = {
    'countries' : CountriesDataSource,
    'personal' :  SunbirdDataSource,
    'address' :  SunbirdDataSource,
    'education' :  SunbirdDataSource,
    'experience' :  SunbirdDataSource,
    'profile' :  SunbirdDataSource,
    'tjlms-courses' :  TJLmsCoursesDataSource,
    'ek-lessons' : EkLessonsDataSource,
    'sb-graph' : SunbirdDataSource
}