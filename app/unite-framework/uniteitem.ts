import {Injectable, Inject} from 'angular2/core';
import {Page, Loading, NavController, NavParams, Toast} from 'ionic-angular';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {UniteToast} from '../unite-framework/unitetoast';
@Injectable()
export class UniteItem {
  selectedItem: any;
  http:any;
  loader: any;
  loaderconfig: any;
  constructor(http: Http, private nav: NavController, navParams: NavParams, private unitetoast: UniteToast) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
  }
	postData(posturl, data){
		this.showLoader();
		let url = posturl;
		let datatobepost = data;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return new Promise(resolve => {
		this.http.post(url,datatobepost, {
				headers: headers
				})
				.map(res => res.json())
				.subscribe(
					data => {
						resolve(data);
						this.hideLoader();
					},
					err => {
						resolve('Error');
						this.hideLoader();
					}
				);
		});
	}
  showLoader() {
    this.loader = Loading.create(this.loaderconfig);
    this.nav.present(this.loader);
  }

  hideLoader() {
    this.loader.dismiss();
  }
}

