import { Component } from '@angular/core';
import { NavController,NavParams,Platform,LoadingController,Events  } from 'ionic-angular';
import {NativeAudio} from 'ionic-native';
import {NgZone} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {UniteList} from '../../unite-framework/unitelist';
import {UniteToast} from '../../unite-framework/unitetoast';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
	items: any;
	unitelist: any;
	siteConfig: any;

	constructor(http: Http, private zone: NgZone, storage: Storage, platform: Platform, public nav: NavController, navParams: NavParams, unitelist: UniteList) {

		this.items = [];
		this.siteConfig =	[];
		storage.get('siteConfig').then((val) => {
			this.siteConfig = JSON.parse(val);
			this.setApiParams(this.siteConfig);
		})
	}
	setApiParams(siteConfig){
		this.unitelist.loaderconfig.content = 'Please wait...';		
		this.unitelist.baseurl = siteConfig['siteurl'] + "/index.php?app=jticket&resource=geteventdetails&option=com_api&format=raw" + '&key=' + siteConfig['authkey']+'&userid=' + siteConfig['userid']+ '&eventid=' +this.selectedItem.id;
		this.loadData();
	}
	loadData() {
		this.unitelist.getData().then((value: any) => {
			this.items = value.data;			
		});		
	}
}
