import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfig{
    baserUnitePath;
    gbConfig = {
        site : {
            family : "sb",
            template : 'one'
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