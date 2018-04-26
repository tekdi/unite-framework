import { CustomOverride } from './custom/renderer';
import { CarouselOverride } from './carousel/renderer';

// key is renderer name and value is class name of renderer
export const overrides = {
    custom: CustomOverride,
    carousel: CarouselOverride
};

export const overridesArray = [CustomOverride, CarouselOverride];
