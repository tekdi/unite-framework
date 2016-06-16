import {Injectable, Inject} from 'angular2/core';
import {Page, Loading, LocalStorage, Storage, SqlStorage} from 'ionic-angular';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UniteItem {
	selectedItem: any;
	http: Http;
	loader: Loading;
	loaderconfig: any;
	local: any;
	constructor(http: Http) {
		// If we navigated to this page, we will have an item available as a nav param
        // this.selectedItem = navParams.get('item');
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
		this.local = new Storage(SqlStorage);
	}

	getData(url) {
		return this.local.get(url).then((value) => {
			if (value) {
				return new Promise(resolve => {
					return resolve(JSON.parse(value));
				});
			}
			else {
				return new Promise(resolve => {
					this.http.get(url)
						.map(res => res.json())
						.subscribe(
						data => {
							this.local.set(url,JSON.stringify(data));
							resolve(data);
						}, err => {
							resolve('Error');
						});
				});
			}
		});

	}
	postData(posturl, data) {
		let url = posturl;
		let datatobepost = data;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return new Promise(resolve => {
			this.http.post(url, datatobepost, {
				headers: headers
			})
				.map(res => res.json())
				.subscribe(
				data => {
					resolve(data);
				},
				err => {
					resolve('Error');
				}
				);
		});
	}
}

