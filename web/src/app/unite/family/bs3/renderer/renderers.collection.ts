import { StatesmapRenderer } from './statesmap/renderer';
import { CustomRenderer } from './custom/renderer';
import { CarouselRenderer } from './carousel/renderer';

export const renderMapper = {
        custom: CustomRenderer,
        carousel : CarouselRenderer,
        statesmap : StatesmapRenderer
}

export const bs3Renderers = [
                CustomRenderer,
                CarouselRenderer,
                StatesmapRenderer                                
        ]