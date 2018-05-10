import { UniteRouting } from './../../uniteServices/routingService';
import { Config } from './../../core/classes';
import { Component, ViewEncapsulation, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BS3LayoutsMapper } from './layouts/';
import { WidgetsService } from '../../core/services';
import { Menu, UniteRoute } from './../../core/classes';

@Component({
    template : `
    <div *ngIf="displayLayout">
        <ng-template [selectLayout]="bs3Layouts"></ng-template>
    </div>
    `,
    styleUrls : ['./custom.css'],
    encapsulation: ViewEncapsulation.None
})

export class bs3Comp {
    displayLayout = false;
    bs3Layouts = BS3LayoutsMapper;

    constructor(
        private _acRoutes: ActivatedRoute,
        private _config: Config,
        private _menu: Menu,
        // private _uniteRouting: UniteRouting,
        private _widgetsService: WidgetsService,
        private _uniteRoute: UniteRoute ) {
            this._acRoutes.url.subscribe(data => {
            let path = '';

            if (data[0] !== undefined) {
                path = data[0].path;
            }

            this.setRouteParams(path);
            console.log(data);
        });

        console.log('BS3COMP');
    }

    private setRouteParams(path) {
        this._uniteRoute.path = path;
        const url = this._uniteRoute.path ? '=/' + this._uniteRoute.path : '';
        this._widgetsService.get(url).subscribe(widgets => {
            this._uniteRoute.widgets = widgets;
            this.displayLayout = true;
        });
    }
}
