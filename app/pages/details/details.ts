import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {UniteToast} from '../../unite-framework/unitetoast';

@Page({
  templateUrl: 'build/pages/details/details.html',
   providers: [UniteList,UniteToast]
})

export class DetailsPage {
	selectedItem: any;
	items: any;
	unitelist: any;
	constructor(private nav: NavController, navParams: NavParams, unitelist: UniteList) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		// API Definitions
		this.unitelist = unitelist;
		this.unitelist.baseurl = 'http://jlike.cloudaccess.host/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=87aa58a73cc77f31411d226202e4a6b0&content_id=1&type=annotation&subtype=collaborators&client=com_content&plg_type=content&plg_name=jlike_articles&order=DESC&parent_id='+this.selectedItem.annotation_id;
		this.unitelist.limit = 10;
		// Loader Config
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		this.loadData();
	}
	
	loadData() {
		this.unitelist.getData().then((value: any) => {
			//this.items = this.items.concat(value.data.results);
			console.log(value);
		});
		
	}
	
}

