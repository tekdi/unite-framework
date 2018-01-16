import { CountriesDataSource } from "./datasource/countries.datasource";
import { SunbirdAddressDataSource } from "./datasource/sunbirdaddress.datasource";
import { SunbirdProfileDataSource }  from "./datasource/sunbirdprofilecompleteness.datasource";
import { SunbirdPersonalDataSource }  from "./datasource/sunbirdpersonal.datasource";
import { TJLmsCoursesDataSource }  from "./datasource/tjlmscourses.datasource";

export const DataSource = {
    'countries' : CountriesDataSource,
    'address' :  SunbirdAddressDataSource,
    'profile' :  SunbirdProfileDataSource,
    'personal' :  SunbirdPersonalDataSource,
    'tjlms-courses' :  TJLmsCoursesDataSource
}