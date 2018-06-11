export * from './about/about.component';
export * from './content/content.component';
export * from './current-status/current-status.component';
export * from './for-teachers/for-teachers.component';
export * from './home/home.component';
export * from './partners/partners.component';
export * from './default/default.component';

import { AboutComponent } from './about/about.component';
import { ContentComponent } from './content/content.component';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { ForTeachersComponent } from './for-teachers/for-teachers.component';
import { HomeComponent } from './home/home.component';
import { PartnersComponent } from './partners/partners.component';
import { DefaultComponent } from './default/default.component';

export const viewsObject = {
    DefaultComponent: DefaultComponent,
    AboutComponent: AboutComponent,
    ContentComponent: ContentComponent,
    CurrentStatusComponent: CurrentStatusComponent,
    ForTeachersComponent: ForTeachersComponent,
    HomeComponent: HomeComponent,
    PartnersComponent: PartnersComponent
};

export const viwesArray = [
    DefaultComponent,
    AboutComponent,
    ContentComponent,
    CurrentStatusComponent,
    ForTeachersComponent,
    HomeComponent,
    PartnersComponent
];
