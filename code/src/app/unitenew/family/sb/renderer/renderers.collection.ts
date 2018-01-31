
import { SunbirdGridRenderer } from "./cardGrid/renderer";
import { SunbirdListRenderer } from "./list/ordered/renderer";
import { SunbirdCarouselRenderer } from "./carousel/renderer";
import { SunbirdIconListRenderer } from "./list/icon/renderer";
import { SunbirdProgressbarRenderer } from "./chart/progressBar/renderer";
import { SunbirdPersonalRenderer } from "./personal/renderer";
import { SunbirdDividerRenderer } from "./divider/renderer";
import { SunbirdAdditionInformationRenderer } from "./additionalinfo/renderer";
import { SunbirdLinechartRenderer } from "./chart/line/renderer";
import { SunbirdHomeRenderer } from './home/home.renderer';

export const renderMapper = {
        grid : SunbirdGridRenderer,
        list : SunbirdListRenderer,
        carousel : SunbirdCarouselRenderer,
        sbHome : SunbirdHomeRenderer,
        iconlist : SunbirdIconListRenderer,
        divider : SunbirdDividerRenderer,
        progressBar : SunbirdProgressbarRenderer,
        personal : SunbirdPersonalRenderer,
        additionalinfo : SunbirdAdditionInformationRenderer
        // chart : SunbirdLinechartRenderer
}

export const sbRenderers = [
                                SunbirdGridRenderer,
                                SunbirdHomeRenderer,
                                SunbirdIconListRenderer,
                                SunbirdListRenderer,
                                SunbirdCarouselRenderer,
                                SunbirdDividerRenderer,
                                SunbirdProgressbarRenderer,
                                SunbirdPersonalRenderer,
                                SunbirdAdditionInformationRenderer
                                // SunbirdLinechartRenderer
                        ]