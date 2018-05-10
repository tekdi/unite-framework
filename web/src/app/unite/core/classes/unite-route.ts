import { IRoute } from './../interfaces';

export class UniteRoute implements IRoute {

    public path = '';

    public widgets;

    /**
     * getRoute get the current route instance
     */
    public getRoute() {
        return this;
    }
}
