import { Injectable } from '@angular/core';
import { LoadingController, ToastController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
//import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@Injectable()

export class UniteList {
	items:					any;
	unitelist:				any;
	url:					string;
	enableSearchbar:		boolean;
	enablePullToRefresh:	boolean;
	enableifinitescroll:	boolean	=	false;
	noitem:					boolean;
	infinitescroll:			any;
	loader:					any;
	loaderOptions:			any;
	toast:					any;
	toastOptions:			any;
	dataList:				any;
	limitstart:				number	=	0;
	limit:					number	=	10;
	message:				string;
	isInfinite:				boolean	=	false;
	currentLang:			string	=	'en'; 
	siteConfig:				any		=	[];

	constructor(private network: Network,public http: Http, public storage: Storage, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public translate: TranslateService, public events: Events) {

		this.enableSearchbar		=	true;
		this.enablePullToRefresh	=	true;
		this.enableifinitescroll	=	false;
		this.infinitescroll			=	false;
		this.noitem					=	true;
		this.limitstart				=	0;
		this.limit					=	10;
		this.items					=	[];
		this.message				=	'';
		

		this.translate.get('label.PLEASE_WAIT').subscribe(value => { 
				this.loaderOptions	=	{ content: value, duration: 8000, spinner: "dots", dismissOnPageChange: true };
				this.loader			=	this.loadingCtrl.create(this.loaderOptions);
		});

		this.translate.get('message.SOMETHING_WENT_WRONG').subscribe(value => { 
				this.toastOptions	=	{ message: value, duration: 3000 };
				this.toast			=	this.toastCtrl.create(this.toastOptions);
			});
		this.getApiParams();
		this.events.subscribe('user:created', (res) => { 
			this.getApiParams();
		});
	}

	getData(url) {
		url += '&key=' + this.siteConfig['authkey'] + '&lang=' + this.currentLang;
		this.items	=	(this.isInfinite)?this.items:[];
		if(this.network.type !== 'none') {
			return new Promise(resolve => {
				this.http.get(url)
					.map(res => res.json())
					.subscribe(
					data => {
						this.items		=	this.items.concat(data.data.results);
						this.message	=	data.data.empty_message;
						resolve(data);
						this.isInfinite	=	false;
					},
					err => {
					//this.hideLoader();
					this.toast.present();
					this.isInfinite	=	false;
					});
			});
		} else {
			this.noNetwork();
		}
	}

	scroll(event,url){
		this.isInfinite	=	true;
		this.getData(url).then((value: any) => {
			if (event) {
				event.complete();
				if (value === undefined || value.data.results == 0) {
					this.enableifinitescroll	=	false;
				} else {
					this.enableifinitescroll	=	true;
				}
			}
		});
	}
	showLoader() {
		this.translate.get('label.PLEASE_WAIT').subscribe(value => { 
			let loading = this.loadingCtrl.create({
				content: value, spinner: "dots"
			});
			loading.present();
			if(this.items != []){
				setTimeout(() => {
					loading.dismiss();
				}, 2000);
			}
		});
		
	}

	noNetwork(){
		this.translate.get('message.NO_INTERNET_CONNECTION').subscribe(value => { 
			this.toastOptions = { message: value, duration: 3000 };
			this.toast = this.toastCtrl.create(this.toastOptions);
			this.toast.present();
		});
	}

	getApiParams(){
		this.storage.get("siteConfig").then((value) => {
			this.siteConfig	=	value;
		});
		this.storage.get("appLanguage").then((value) => {
			this.currentLang = value;
		});
	}
}
