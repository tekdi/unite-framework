export * from './about/about.component';
export * from './content/content.component';
export * from './current-status/current-status.component';
export * from './for-teachers/for-teachers.component';
export * from './home/home.component';
export * from './partners/partners.component';

import { AboutComponent } from './about/about.component';
import { ContentComponent } from './content/content.component';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { ForTeachersComponent } from './for-teachers/for-teachers.component';
import { HomeComponent } from './home/home.component';
import { PartnersComponent } from './partners/partners.component';

export const viewsObject = {
    AboutComponent: AboutComponent,
    ContentComponent: ContentComponent,
    CurrentStatusComponent: CurrentStatusComponent,
    ForTeachersComponent: ForTeachersComponent,
    HomeComponent: HomeComponent,
    PartnersComponent: PartnersComponent
};

export const viwesArray = [
    AboutComponent,
    ContentComponent,
    CurrentStatusComponent,
    ForTeachersComponent,
    HomeComponent,
    PartnersComponent
];
