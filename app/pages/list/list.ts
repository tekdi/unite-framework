import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {DetailsPage} from '../details/details';
import {GettingStartedPage} from '../getting-started/getting-started';
import {UniteToast} from '../../unite-framework/unitetoast';
import {UniteItem} from '../../unite-framework/uniteitem';
import {NetworkInformation} from '../../unite-framework/network-information';
import {NgZone} from 'angular2/core';
@Page({
	templateUrl: 'build/pages/list/list.html',
	providers: [UniteList, UniteToast, UniteItem],
})

export class ListPage {
	selectedItem: any;
	icons: string[];
	items: any;
	unitelist: any;
	baseurl: string;
	searchQuery: string;
	enableSearchbar: boolean;
	enablePullToRefresh: boolean;
	infinitescroll: any;
	uniteitem: any;
	unitetoast: any;
	enableifinitescroll:boolean;
	constructor(private nav: NavController, navParams: NavParams, private zone: NgZone, unitelist: UniteList, uniteitem: UniteItem, unitetoast: UniteToast, private networkInformation: NetworkInformation) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		console.log(this.selectedItem);
		this.items = [];
		// API Definitions
		this.unitetoast = unitetoast;
		this.unitelist = unitelist;
		this.uniteitem = uniteitem;
		// http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id=0
		this.unitelist.baseurl = 'http://172.132.45.45/joomla/investsure/index.php?option=com_api&app=content&resource=articles&format=raw&key=62edf1d7654d77cc424ca8e5ea8a1140';
		this.unitelist.limit = 10;
		this.searchQuery = '';
		this.enableSearchbar = true;
		this.enablePullToRefresh = true;
		this.enableifinitescroll = false;
		// Loader Config
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		//this.postData();
		this.loadData(null);
	}
	postData() {
		let datatobesend = 'title=' + 'Test title' + '&introtext=' + 'test introltext' + '&catid=' + 11;
		let url = 'http://172.132.45.45/joomla/investsure/index.php?option=com_api&app=content&resource=articles&format=raw&key=62edf1d7654d77cc424ca8e5ea8a1140';
		this.uniteitem.postData(url, datatobesend).then((value: any) => {
			if (value) {
				if (value == 'Error') {
					this.unitetoast.toastOptions.message = "Something went wrong!";
					this.unitetoast.showToast();
				} else if (value.success && value.success == 'false') {
					this.unitetoast.toastOptions.message = value.message;
					this.unitetoast.showToast();
				}
			}
			console.log('YEAH');
			console.log(value);
		});

	}
	clearSearch() {
		this.unitelist.limitstart = 0;
		this.items = [];
		this.unitelist.search = '';
		this.loadData(null);
	}
	loadData(infiniteScroll) {
		if (infiniteScroll) {
			if (infiniteScroll.state == 'refreshing') {
				if (this.infinitescroll) {
					this.infinitescroll.enable(true);
				}
			} else {
				this.infinitescroll = infiniteScroll;
			}
		}
		if (this.networkInformation.getNetworkInfo()) {
			this.unitelist.getData().then((value: any) => {
				if (value.data) {
					this.items = this.items.concat(value.data.results);
					this.enableifinitescroll = true;
				}
				if (infiniteScroll) {
					infiniteScroll.complete();
					if (!value.data){
						infiniteScroll.enable(false);
						this.enableifinitescroll = false;
					}
						
				}
				//console.log(value);
			});
		} else {
			this.unitetoast.toastOptions.message = "Internet is disconnected!";
			this.unitetoast.showToast();
		}
	}
	getItems(searchbar) {
		this.enableifinitescroll = false;
		//console.log(searchbar);
		//let q = searchbar.value;
		let q = this.searchQuery;
		if (q) {
			this.unitelist.limitstart = 0;
			this.unitelist.search = q;
			this.items = [];
			this.loadData(null);
		}else{
			this.unitelist.search = '';
		}
		return false;
	}
	doRefresh(refresher) {
		this.unitelist.limitstart = 0;
		this.items = [];
		this.loadData(refresher);
	}

	itemTapped(event, item) {
		this.nav.push(DetailsPage, {
			item: item
		});
	}

}
