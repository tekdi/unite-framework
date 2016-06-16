import {Injectable, Inject} from 'angular2/core';
import {Page, Loading, NavController, NavParams, Toast, LocalStorage, Storage, SqlStorage} from 'ionic-angular';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {UniteToast} from '../unite-framework/unitetoast';
@Injectable()
export class UniteList {
	selectedItem: any;
	icons: string[];
	baseurl: string;
	http: any;
	search: string;
	idname: string;
	id: number;
	limitstart: number;
	limit: number;
	lastUpdated: string;
	limitName: string;
	limitstartName: string;
	searchName: string;
	lastUpdatedName: string;
	loader: any;
	loaderconfig: any;
	local: any;
	constructor(http: Http, private nav: NavController, navParams: NavParams, private unitetoast: UniteToast) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		this.limit = 20;
		this.limitstart = 0;
		this.limitName = 'limit';
		this.limitstartName = 'limitstart';
		this.searchName = 'search';
		this.idname = "category_id";
		this.lastUpdatedName = 'last_updated';
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
		this.local = new Storage(SqlStorage);
	}
	getData() {

		let callingurl = this.baseurl;
		this.showLoader();
		if (this.limit) {
			callingurl += '&' + this.limitName + '=' + this.limit;
		}

		if (this.limitstart >= 0) {
			callingurl += '&' + this.limitstartName + '=' + this.limitstart;
		}

		if (this.search) {
			callingurl += '&' + this.searchName + '=' + this.search;
		}
		if (this.id) {
			callingurl += '&' + this.idname + '=' + this.id;
		}
		if (this.lastUpdated) {
			callingurl += '&' + this.lastUpdatedName + '=' + this.lastUpdated;
		}
		return this.local.get(callingurl).then((value) => {
			if (value) {
				console.log('in value');
				this.hideLoader();
				return new Promise(resolve => {
				this.limitstart += this.limit;
				 return resolve(JSON.parse(value)); 
				});
			}
			else {
				return new Promise(resolve => {
					this.http.get(callingurl)
						.map(res => res.json())
						.subscribe(
						data => {
							//this.items = this.items.concat(data);
							this.limitstart += this.limit;
							resolve(data);
							this.local.set(callingurl,JSON.stringify(data));
							this.hideLoader();
						}, err => {
							resolve('Error');
							this.hideLoader();
						});
				});
			}
		});

	}
	showLoader() {
		this.loader = Loading.create(this.loaderconfig);
		this.nav.present(this.loader);
	}
	hideLoader() {
		setTimeout(() => {
			this.loader.dismiss();
		})
	}
}

