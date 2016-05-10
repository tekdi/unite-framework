import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {DetailsPage} from '../details/details';
import {GettingStartedPage} from '../getting-started/getting-started';

@Page({
	templateUrl: 'build/pages/list/list.html',
	providers: [UniteList],
})

export class ListPage {
	selectedItem: any;
	icons: string[];
	items: any;
	unitelist: any;
	baseurl: any;
	searchQuery: any;
	enableSearchbar: boolean;
	enablePullToRefresh: boolean;
	constructor(private nav: NavController, navParams: NavParams, unitelist: UniteList) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		this.items = [];
		// API Definitions
		this.unitelist = unitelist;
		// http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id=0
		this.unitelist.baseurl = 'http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id=0';
		this.unitelist.limit = 10;
		this.searchQuery = '';
		this.enableSearchbar = true;
		this.enablePullToRefresh = true;
		// Loader Config
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		this.loadData(null);
	}

	loadData(infiniteScroll) {
		this.unitelist.getData().then((value: any) => {
			if (value.data) {
				this.items = this.items.concat(value.data.results);
			}
			if (infiniteScroll) {
				infiniteScroll.complete();
				if (!value.data)
					infiniteScroll.enable(false);
			}
			//console.log(value);
		});

	}
	getItems(searchbar) {
		let q = searchbar.value;
		this.unitelist.limitstart = 0;
		this.unitelist.search = q;
		this.items = [];
		this.loadData(null);
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
