
import { SunbirdGridRenderer } from "./cardGrid/renderer";
import { SunbirdListRenderer } from "./list/ordered/renderer";
import { SunbirdCarouselRenderer } from "./carousel/renderer";
import { SunbirdIconListRenderer } from "./list/icon/renderer";
import { SunbirdProgressbarRenderer } from "./chart/progressBar/renderer";
import { SunbirdPersonalRenderer } from "./personal/renderer";
import { SunbirdLinechartRenderer } from "./chart/line/renderer";

export const renderMapper = {
        grid : SunbirdGridRenderer,
        list : SunbirdListRenderer,
        // iconlist : SunbirdIconListRenderer,
        // carousel : SunbirdCarouselRenderer,
        // progressBar : SunbirdProgressbarRenderer,
        // personal : SunbirdPersonalRenderer,
        // chart : SunbirdLinechartRenderer
}

export const sbRenderers = [
                                SunbirdGridRenderer,
                                // SunbirdIconListRenderer,
                                SunbirdListRenderer,
                                // SunbirdCarouselRenderer,
                                // SunbirdProgressbarRenderer,
                                // SunbirdPersonalRenderer,
                                // SunbirdLinechartRenderer
                        ]