/*import { BS4GridRenderer } from "./frontend/bs4/renderer/cardGrid/renderer";
import { BS4ListRenderer } from "./frontend/bs4/renderer/list/ordered/renderer";
import { BS4CarouselRenderer } from "./frontend/bs4/renderer/carousel/renderer";
import { BS4IconListRenderer } from "./frontend/bs4/renderer/list/icon/renderer";
import { BS4ProgressbarRenderer } from "./frontend/bs4/renderer/chart/progressBar/renderer";
import { BS4PersonalRenderer } from "./frontend/bs4/renderer/profile/renderer";
import { BS4LinechartRenderer } from "./frontend/bs4/renderer/chart/line/renderer";

export const FactoryLayouts = {
    'grid' : BS4GridRenderer,
    'list' : BS4ListRenderer,
    'carousel': BS4CarouselRenderer,
    'progressbar': BS4ProgressbarRenderer,
    'personal':BS4PersonalRenderer,
    'iconlist':BS4IconListRenderer,
    'linechart' : BS4LinechartRenderer
}
export const Layouts = [
                            BS4GridRenderer,
                            BS4ListRenderer,
                            BS4CarouselRenderer,
                            BS4ProgressbarRenderer,
                            BS4PersonalRenderer,
                            BS4IconListRenderer,
                            BS4LinechartRenderer
                        ];
*/

import { SunbirdGridRenderer } from "./frontend/sunbird/renderer/cardGrid/renderer";
import { SunbirdListRenderer } from "./frontend/sunbird/renderer/list/ordered/renderer";
import { SunbirdCarouselRenderer } from "./frontend/sunbird/renderer/carousel/renderer";
import { SunbirdIconListRenderer } from "./frontend/sunbird/renderer/list/icon/renderer";
import { SunbirdProgressbarRenderer } from "./frontend/sunbird/renderer/chart/progressBar/renderer";
import { SunbirdPersonalRenderer } from "./frontend/sunbird/renderer/profile/renderer";
import { SunbirdLinechartRenderer } from "./frontend/sunbird/renderer/chart/line/renderer";

export const FactoryLayouts = {
    'grid' : SunbirdGridRenderer,
    'list' : SunbirdListRenderer,
    'carousel': SunbirdCarouselRenderer,
    'progressbar': SunbirdProgressbarRenderer,
    'personal':SunbirdPersonalRenderer,
    'iconlist':SunbirdIconListRenderer,
    'linechart' : SunbirdLinechartRenderer
}
export const Layouts = [
                            SunbirdGridRenderer,
                            SunbirdListRenderer,
                            SunbirdCarouselRenderer,
                            SunbirdProgressbarRenderer,
                            SunbirdPersonalRenderer,
                            SunbirdIconListRenderer,
                            SunbirdLinechartRenderer
                        ];