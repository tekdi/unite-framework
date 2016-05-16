import {Injectable, Inject} from 'angular2/core';
// import {NavController, Toast} from 'ionic-angular';
import {Toast} from 'ionic-native';

@Injectable()
export class UniteToast {
	toastOptions: any;
	constructor() {
		this.toastOptions = {
			message: 'Something went wrong!', //	The message to display.
			duration: '3000',  //Duration to show the toast, either 'short', 'long' or any number of milliseconds: '1500'.
			position: 'bottom'  //Where to position the toast, either 'top', 'center', or 'bottom'.
		}
	}
	showToast() {
		Toast.showWithOptions(this.toastOptions).subscribe(
			toast => {
				console.log(toast);
			}
		);
	}
	hideToast() {
		Toast.hide();
	}

}

