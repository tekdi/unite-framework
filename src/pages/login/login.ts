import { Component } from '@angular/core';
import {MenuController, Events, NavController,IonicApp,NavParams,LoadingController} from 'ionic-angular';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {NgZone} from '@angular/core';
import {UniteItem} from '../../unite-framework/uniteitem';
import {UniteToast} from '../../unite-framework/unitetoast';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
	login:any;
	submitted:boolean;
	payloaddata:any; 
	unitetoast:any;
	loader: any;
	loaderconfig: any;
	storage:any;
	datatobesend:string;
	uniteItem: UniteItem;
	uniteToast: UniteToast;
    
	constructor(private app: IonicApp, events: Events, storage: Storage, private zone: NgZone, public nav: NavController, uniteItem: UniteItem, public loadingCtrl: LoadingController, uniteToast:UniteToast) {
		this.login = {};   
		this.nav = nav;
		this.submitted = false;    
		this.loaderconfig = { content: "Please Wait..." };
		this.storage = storage;
		this.uniteItem = uniteItem;
       	this.uniteToast = uniteToast;	
	}
	
	onLogin(form) {   
		this.submitted = true;    
		if (form.valid) { 
			this.showLoader(); 		
			let url = this.login.siteurl + "/index.php?option=com_api&app=users&resource=login&format=raw";
			this.datatobesend = 'username='+ this.login.username+'&password='+ this.login.password;
			this.uniteItem.postData(url, this.datatobesend).then((value: any) => {
				this.zone.run(() => {
					if (value) {					  
						if (value == 'Error') {
							this.hideLoader();
							this.uniteToast.toastOptions.message = "Opps! something went wrong";
							this.uniteToast.showToast();
						} else {
							this.hideLoader();
								let siteConfig = {
								"siteurl" : this.login.siteurl,
								"authkey" : value.auth,
								"username" : this.login.username,
								"userid" : value.id
							}   	
							this.storage.set('siteConfig', JSON.stringify(siteConfig));
							this.uniteToast.toastOptions.message = "Logged in successfully";
							this.uniteToast.showToast();                       
							this.nav.setRoot(ListPage);					   
						} 
					}
				});
			});      
		}			
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
