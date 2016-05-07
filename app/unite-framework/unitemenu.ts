import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
// import {GettingStartedPage} from '../pages/getting-started/getting-started';
// import {ListPage} from '../pages/list/list';


@Injectable()
export class UniteMenu {
  pages: any;
  menuMap: any;
  
  constructor() {

  }
  
  getMenu() {
	return this.pages;
  }

  addMemu() {}
  
  removeMenu() {}
  
}

