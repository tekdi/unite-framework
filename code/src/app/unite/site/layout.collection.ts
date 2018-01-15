import { GridLayout } from "./layouts/gridLayout/grid.layout";
import { CarouselLayout  } from "./layouts/carouselLayout/carousel.layout";
import { ListLayout } from "./layouts/listLayout/list.layout";

export const FactoryLayouts = {
    'grid' : GridLayout,
    'list' : ListLayout,
    'carousel': CarouselLayout
}
export const Layouts = [GridLayout,ListLayout,CarouselLayout];