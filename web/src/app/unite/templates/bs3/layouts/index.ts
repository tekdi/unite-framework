import { LayoutOneComponent } from './layout-one/layout-one.component';
import { LayoutTwoComponent } from './layout-two/layout-two.component';

/**
 * Layout object with custom index which required to dynamicaly select the layout on config.
 */
export const BS3LayoutsMapper = {
    'one': LayoutOneComponent,
    'two': LayoutTwoComponent
};

/**
 * Layout classes list
 */
export const BS3Layouts = [LayoutOneComponent, LayoutTwoComponent];
