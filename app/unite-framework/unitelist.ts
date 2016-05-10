import {Injectable, Inject} from 'angular2/core';
import {Page, Loading, NavController, NavParams, Toast} from 'ionic-angular';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UniteList {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  baseurl: string;
  http: any;
  search: string;
  limitstart: number;
  limit: number;
  lastUpdated: string;
  limitName: string;
  limitstartName: string;
  searchName: string;
  lastUpdatedName: string;
  loader: any;
  loaderconfig: any;
	toast: any;
	toastOptions:any;

  constructor(http: Http, private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
		this.limit = 20;
		this.limitstart = 0;
		this.limitName = 'limit';
		this.limitstartName = 'limitstart';
		this.searchName = 'search';
		this.lastUpdatedName = 'last_updated';
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
    this.items = [];
		this.toastOptions={
			'message': 'Something went wrong!',
			'duration': 3000,
			'cssClass':'toast-message',
			'showCloseButton':false,
			'closeButtonText':"Close",
			'enableBackdropDismiss':true,
			'dismissOnPageChange': false
		}
  }

  getData() {
		let callingurl = this.baseurl;
    this.showLoader();
			if (this.limit) {
				callingurl +=  '&' + this.limitName + '=' + this.limit ;
			}

			if (this.limitstart>=0) {
				callingurl += '&' + this.limitstartName + '=' + this.limitstart ;
			}

			if (this.search) {
				callingurl += '&' + this.searchName + '=' + this.search ;
			}

			if (this.lastUpdated) {
				callingurl += '&' + this.lastUpdatedName + '=' + this.lastUpdated;
			}
		return new Promise(resolve => {
			this.http.get(callingurl)
				.map(res => res.json())
				.subscribe(
				data => {
					//this.items = this.items.concat(data);
					this.limitstart += this.limit;
					resolve(data);
					this.hideLoader();

				}, err => {
					this.hideLoader();
					this.toastOptions.message = "Something went wrong!";
					this.presentToast();
				});
		});
  }
presentToast() {
  this.toast = Toast.create(this.toastOptions);
  this.nav.present(this.toast);
}
dismissToast(){
	this.toast.dismiss();
}
  showLoader() {
    this.loader = Loading.create(this.loaderconfig);
    this.nav.present(this.loader);
  }

  hideLoader() {
    this.loader.dismiss();
  }

  loadNext() { }
}

