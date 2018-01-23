import { BS4GridLayout } from "./frontend/bs4/renderer/cardGrid/renderer";
import { BS4ListLayout } from "./frontend/bs4/renderer/list/ordered/renderer";
import { BS4CarouselLayout } from "./frontend/bs4/renderer/carousel/renderer";
import { BS4IconListLayout } from "./frontend/bs4/renderer/list/icon/renderer";
import { BS4ProgressbarLayout } from "./frontend/bs4/renderer/chart/progressBar/renderer";
import { BS4PersonalLayout } from "./frontend/bs4/renderer/profile/renderer";
import { BS4LinechartLayout } from "./frontend/bs4/renderer/chart/line/renderer";

export const FactoryLayouts = {
    'grid' : BS4GridLayout,
    'list' : BS4ListLayout,
    'carousel': BS4CarouselLayout,
    'progressbar': BS4ProgressbarLayout,
    'personal':BS4PersonalLayout,
    'iconlist':BS4IconListLayout,
    'linechart' : BS4LinechartLayout
}
export const Layouts = [
                            BS4GridLayout,
                            BS4ListLayout,
                            BS4CarouselLayout,
                            BS4ProgressbarLayout,
                            BS4PersonalLayout,
                            BS4IconListLayout,
                            BS4LinechartLayout
                        ];