/* global http */
import {Injectable, Inject} from 'angular2/core';
import {IonicApp,Platform} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';


/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkInformation {
	private online: boolean;
	constructor(app: IonicApp, public platform: Platform) {
		this.online = true;
		this.initializeApp();
	}
	initializeApp() {
	this.platform.ready().then(() => {
		let disconnectSubscription = Network.onDisconnect().subscribe(() => {
			this.setNetworkInfo(false);
		});
		let connectSubscription = Network.onConnect().subscribe(() => {
			setTimeout(() => {
				if (Network.connection !== Connection.NONE) {
					this.setNetworkInfo(true);
				}
			});
		});
	});
}
	setNetworkInfo(status) {
		this.online = status;
	}
	getNetworkInfo() {
		return this.online;
	}
}

