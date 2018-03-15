import { StatesmapRenderer } from './statesmap/renderer';
import { CustomRenderer } from './custom/renderer';
import { CarouselRenderer } from './carousel/renderer';
import { UnorderedRenderer } from './list/unordered/renderer';

export const renderMapper = {
        custom: CustomRenderer,
        carousel : CarouselRenderer,
        unorderedlist : UnorderedRenderer
}

export const bs3Renderers = [
                                CustomRenderer,
                                CarouselRenderer,
                                UnorderedRenderer
                            ]
