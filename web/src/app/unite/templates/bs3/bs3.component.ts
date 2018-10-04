import { Config } from './../../core/classes';
import { Component, ViewEncapsulation, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BS3LayoutsMapper } from './layouts/';
import { WidgetsService } from '../../core/services';
import { Menu, UniteRoute } from './../../core/classes';
import { viewsObject } from './views';
import { Router } from '@angular/router'

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
        private _acRoute: ActivatedRoute,
        private _config: Config,
        private _menu: Menu,
        private _widgetsService: WidgetsService,
        private _uniteRoute: UniteRoute,
        private _router: Router    
    ) {
            console.log(this._router.config[0] , "ROUTER");
            console.log(this._router.config[0] , "ROUTER");
            this._acRoute.url.subscribe(data => {
            let path = '';

            if (data[0] !== undefined) {
                path = data[0].path;
            }

            this.setRouteParams(path);
            console.log(data, "Set Routes Path");
        });

        console.log('BS3COMP');
    }

    /**
     * This function set parameters for the provided path
     * 
     * @param path - path is current router path
     */
    private setRouteParams(path) {

        // If view is empty for route then set the default view
        if (!this._acRoute.snapshot.data.viewMapper) {
            this._acRoute.snapshot.data.viewMapper = 'DefaultComponent';
        }   

        this._uniteRoute.view = viewsObject[this._acRoute.snapshot.data.viewMapper];
        this._uniteRoute.path = path;
        const url = this._uniteRoute.path ? '=/' + this._uniteRoute.path : '';
        console.log(url, "URL");
        this._widgetsService.get(url).subscribe(widgets => {
            this._uniteRoute.widgets = widgets;
            this.displayLayout = true;
        });
    }
}
