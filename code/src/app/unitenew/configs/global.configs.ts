import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfig{
    baserUnitePath;
    gbConfig = {
        site : {
            family : "bs4",
            template : '1'
        },
        admin : {
            family : "mat",
            template : '2'
        }
    }

    getGlobalConfig (branch) {
        return this.gbConfig[branch];
    }

}