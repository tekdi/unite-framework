
import {Injectable, Inject} from '@angular/core';
import {Loading} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UniteItem {
	http: Http;
	loader: Loading;
	loaderconfig: any;
	local: any;
	
	constructor(http: Http) {		
		this.loaderconfig = { content: "Please wait...", dismissOnPageChange: false };
		this.http = http;
	}

	getData(url) {
		return this.local.get(url).then((value) => {
			if (value) {
				return new Promise(resolve => {
					return resolve(JSON.parse(value));
				});
			} else {
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
			});
		});
	}
}
