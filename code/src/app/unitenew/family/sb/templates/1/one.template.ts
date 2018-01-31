import { Component } from '@angular/core';
import { renderMapper } from '../../renderer/renderers.collection';

@Component({
    template : `
                I am template 1
                <ng-template [ad-renderer]="renderMapper"></ng-template>
            `
})
export class OneTemplate{
    renderMapper = renderMapper;
}