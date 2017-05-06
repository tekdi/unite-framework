
import {Injectable, Inject} from '@angular/core';
import {Toast} from 'ionic-native';

@Injectable()
export class UniteToast {
	toastOptions: any;
	constructor() {
		this.toastOptions = {
			message: 'Something went wrong!', 
			duration: '4000',  
			position: 'bottom' 
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
