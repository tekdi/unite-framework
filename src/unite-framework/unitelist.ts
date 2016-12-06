
import {Injectable, Inject} from '@angular/core';
import {LoadingController, NavParams, Toast, NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {UniteToast} from '../unite-framework/unitetoast';
import { Storage } from '@ionic/storage';

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
	storage:any;
	
	constructor(http: Http, private unitetoast: UniteToast, storage: Storage, public loadingCtrl: LoadingController) {			
		this.limit = 20;
		this.limitstart = 0;
		this.limitName = 'limit';
		this.limitstartName = 'limitstart';
		this.searchName = 'search';
		this.idname = "category_id";
		this.lastUpdatedName = 'last_updated';
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
		this.baseurl = '';
		this.storage = storage;
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
		
		return new Promise(resolve => {
			this.http.get(callingurl)
				.map(res => res.json())
				.subscribe(
					data => {							
						this.limitstart += this.limit;
						resolve(data);							
						//this.local.set(callingurl,JSON.stringify(data));
						this.hideLoader();
					}, err => {
						resolve('Error');
						this.hideLoader();
					});
		});			
	}
	
	showLoader() {
		this.loader = this.loadingCtrl.create(this.loaderconfig);
		this.loader.present();
	}
	
	hideLoader() {
		setTimeout(() => {
			this.loader.dismiss();
		})
	}
}
