import { StatesmapRenderer } from './statesmap/renderer';
import { CustomRenderer } from './custom/renderer';
import { CarouselRenderer } from './carousel/renderer';
import { UnorderedRenderer } from './list/unordered/renderer';
import { IframeRenderer } from './iframe/renderer';

export const renderMapper = {
        custom: CustomRenderer,
        carousel : CarouselRenderer,
        unorderedlist : UnorderedRenderer,
        statesmap : StatesmapRenderer,
        iframe : IframeRenderer
}

export const bs3Renderers = [
                                CustomRenderer,
                                CarouselRenderer,
                                UnorderedRenderer,
                                StatesmapRenderer,
                                IframeRenderer
                            ]
