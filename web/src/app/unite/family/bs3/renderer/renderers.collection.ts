import { CustomRenderer } from './custom/renderer';
import { CarouselRenderer } from './carousel/renderer';

export const renderMapper = {
        custom: CustomRenderer,
        carousel : CarouselRenderer
}

export const bs3Renderers = [
                                CustomRenderer,
                                CarouselRenderer
                            ]