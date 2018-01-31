
import { SunbirdGridRenderer } from "./cardGrid/renderer";
import { SunbirdListRenderer } from "./list/ordered/renderer";
import { SunbirdCarouselRenderer } from "./carousel/renderer";
import { SunbirdIconListRenderer } from "./list/icon/renderer";
import { SunbirdProgressbarRenderer } from "./chart/progressBar/renderer";
import { SunbirdPersonalRenderer } from "./personal/renderer";
import { SunbirdLinechartRenderer } from "./chart/line/renderer";
import { SunbirdHomeRenderer } from './home/home.renderer';

export const renderMapper = {
        grid : SunbirdGridRenderer,
        list : SunbirdListRenderer,
        carousel : SunbirdListRenderer,
        sbHome : SunbirdHomeRenderer,
        iconlist : SunbirdIconListRenderer,
        // carousel : SunbirdCarouselRenderer,
        // progressBar : SunbirdProgressbarRenderer,
        personal : SunbirdPersonalRenderer,
        // chart : SunbirdLinechartRenderer
}

export const sbRenderers = [
                                SunbirdGridRenderer,
                                SunbirdHomeRenderer,
                                SunbirdIconListRenderer,
                                SunbirdListRenderer,
                                // SunbirdCarouselRenderer,
                                // SunbirdProgressbarRenderer,
                                SunbirdPersonalRenderer
                                // SunbirdLinechartRenderer
                        ]