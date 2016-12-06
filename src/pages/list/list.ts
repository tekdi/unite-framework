import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UniteToast} from '../../unite-framework/unitetoast';
import {UniteList} from '../../unite-framework/unitelist';
import { Storage } from '@ionic/storage';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	items: any;
	unitelist: any;
	baseurl: string;
	searchQuery: string;
	enableSearchbar: boolean;
	enablePullToRefresh: boolean;
	enableifinitescroll: boolean;
	noitem: boolean;
	infinitescroll: any;
	unitetoast: any;
	siteConfig:any;

  constructor(unitelist: UniteList, unitetoast: UniteToast, storage: Storage, public navCtrl: NavController) {

	this.searchQuery = '';
	this.enableSearchbar = true;
	this.enablePullToRefresh = true;
	this.enableifinitescroll = false;
	this.noitem = true;
	this.items = [];
	this.unitetoast = unitetoast;
	this.unitelist = unitelist;
	storage = storage;

	this.items = [];
	this.siteConfig =	[];
	storage.get('siteConfig').then((val) => {
		this.siteConfig = JSON.parse(val);
		this.setApiParams(this.siteConfig);
	})
  }
	setApiParams(siteConfig){
		this.unitelist.loaderconfig.content = 'Please wait...';		
		this.unitelist.baseurl = siteConfig['siteurl'] + "/index.php?app=jticket&resource=getticketlist&option=com_api&format=raw" + '&key=' + siteConfig['authkey']+'&userid=' + siteConfig['userid'];
		this.loadData(null);
	}
	loadData(infiniteScroll) {
			if (infiniteScroll) {			
				if (infiniteScroll.state == 'refreshing') {				
					if (this.infinitescroll) {
						this.infinitescroll.enable(true);
					}
				} 
				else {
					this.infinitescroll = infiniteScroll;
				}
			}

			this.unitelist.getData().then((value: any) => {
				if (value) {
					if (value == 'Error') {
						this.unitetoast.toastOptions.message = "opps! something went wrong";
						this.unitetoast.showToast();
					} 
					else if (value.success && value.success == 'false') {
						this.unitetoast.toastOptions.message = value.message;
						this.unitetoast.showToast();
					}
					this.noitem = value.success;
				}
				if (value.data) {
					this.items = value.data;
					this.enableifinitescroll = false;
					this.noitem = value.success;
				}
				if (infiniteScroll) {
					infiniteScroll.complete();
					if (!value.data) {
						infiniteScroll.enable(false);
						this.enableifinitescroll = false;
					}
				}	
			});
	}

	getItems(searchbar) {	
		this.enableifinitescroll = false;
		if (this.searchQuery) {
			this.unitelist.limitstart = 0;
			this.unitelist.search = this.searchQuery;
			this.items = [];
			this.loadData(null);
		} 
		else {
			this.unitelist.search = '';
		}
	}
	
	doRefresh(refresher) {
		this.unitelist.limitstart = 0;		
		this.items = [];
		this.loadData(refresher);
	}
	
	clearSearch() {				
		this.unitelist.search = '';
		this.unitelist.limitstart = 0;
		this.items = [];
		this.loadData(null);
	}
	
	itemTapped(event, item) {
		this.navCtrl.push(DetailsPage, {
			item: item
		});
	}		
}
