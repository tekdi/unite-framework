import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController, Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@Injectable()

export class UniteItem {
	loader: Loading;
	local: any;
	loaderOptions: any;
	toast: any;
	toastOptions: any;
	items: any = [];
	message: any = '';
	isInfinite: boolean = false;
	limitstart: number = 0;
	limit: number = 10;
	enableifinitescroll: boolean = false;
	currentLang: string = 'en';
	siteConfig: any = [];

	constructor(private network: Network, public http: Http, public storage: Storage, public translate: TranslateService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public events: Events) {

		this.translate.get('label.PLEASE_WAIT').subscribe(value => {
			this.loaderOptions = { content: value, duration: 10000, spinner: "dots" };
			this.loader = this.loadingCtrl.create(this.loaderOptions);
		});

		this.translate.get('message.SOMETHING_WENT_WRONG').subscribe(value => {
			this.toastOptions = { content: value, duration: 3000, spinner: "dots", position: "middle" };
			this.toast = this.toastCtrl.create(this.toastOptions);
		});
		this.getApiParams();
		this.events.subscribe('user:created', (res) => {
			this.getApiParams();
		});
	}
	getData(url) {
		url += '&key=' + this.siteConfig['authkey'] + '&lang=' + this.currentLang;
		this.items = (this.isInfinite) ? this.items : [];
		if (this.network.type !== 'none') {
			return new Promise(resolve => {
				this.http.get(url)
					.map(res => res.json())
					.subscribe(
					data => {
						this.items = this.items.concat(data.data.results);
						this.message = data.data.empty_message;
						resolve(data);
						this.isInfinite = false;
					},
					err => {
						this.toast.present();
						this.isInfinite = false;
					});
			});
		} else {
			this.noNetwork();
		}
	}

	postData(posturl, data) {
		posturl = (this.siteConfig != null) ? posturl + '&key=' + this.siteConfig['authkey'] + '&lang=' + this.currentLang : posturl;
		if (this.network.type !== 'none') {
			let url = posturl;
			let datatobepost = data;
			let headers = new Headers();
			headers.append('Content-Type', 'application/x-www-form-urlencoded');
			return this.http.post(url, datatobepost, {
				headers: headers
			}).map(res => res.json());
		} else {
			this.noNetwork();
		}
	}

	deleteData(posturl) {
		posturl += '&key=' + this.siteConfig['authkey'] + '&lang=' + this.currentLang;
		if (this.network.type !== 'none') {
			let headers = new Headers();
			headers.append('Content-Type', 'application/x-www-form-urlencoded');
			return this.http.delete(posturl, {
				headers: headers
			}).map(res => res.json());
		} else {
			this.noNetwork();
		}
	}

	scroll(event, url) {
		this.isInfinite = true;
		this.getData(url).then((value: any) => {
			if (event) {
				event.complete();

				if (value === undefined || value.data.results == 0) {
					this.enableifinitescroll = false;
				} else {
					this.enableifinitescroll = true;
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
			if (this.items != []) {
				setTimeout(() => {
					loading.dismiss();
				}, 1000);
			}
		});

	}

	noNetwork() {
		this.translate.get('message.NO_INTERNET_CONNECTION').subscribe(value => {
			this.toastOptions = { message: value, duration: 3000 };
			this.toast = this.toastCtrl.create(this.toastOptions);
			this.toast.present();
		});
	}

	presentLoading() {
		this.translate.get('label.PLEASE_WAIT').subscribe(value => {
			let loader = this.loadingCtrl.create({
				content: value, duration: 3000
			});
			loader.present();
		});
	}

	getApiParams() {
		this.storage.get("siteConfig").then((value) => {
			this.siteConfig = value;
		});
		this.storage.get("appLanguage").then((value) => {
			this.currentLang = value;
		});
	}

	showToastermessage(message) {
		this.toastOptions.message = message;
		this.toast = this.toastCtrl.create(this.toastOptions);
		this.toast.present();
	}
}
