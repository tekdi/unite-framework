The Unite Framework is a slim framework for Ionic 2 which provides a lot of convenience for implementing common stuff like lists, push notifications and menus. Essentially, it is a starter template for [Ionic 2](http://ionic.io/2).

## How to use this template

*This template does not work on its own*. It is missing the Ionic library, and AngularJS.

To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### With the Ionic tool

Use the `ionic start` command to initialise a new Ionic 2 project using the Unite framework. The framework uses TypeScript code, so make sure you use the `--ts` flag as below.

```bash
$ sudo npm install -g ionic@beta cordova
$ ionic start my-unite-app https://github.com/appcarvers/unite-framework.git --v2 --ts
```

Then, to run it, cd into `my-unite-app` and run:

```bash
$ ionic run android
```

## Getting Started

### Creating a list view

Create a new list view uing `ionic generate`

```bash
$ ionic generate page articles-list --ts
```

Then open up the newly created app/pages/articles-list/articles-list.ts and make the following changes to start using the power of Unite!

Import Unite Framework
```typescript
import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';

@Page({
  templateUrl: 'build/pages/articles-list/articles-list.html',
  providers: [UniteList],
})
```

Update the class with necessary configuration in the constructor
```typescript
export class ArticlesListPage {
	selectedItem: any;
	icons: string[];
	items: any;
	unitelist: any;

	constructor(private nav: NavController, navParams: NavParams, unitelist: UniteList) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');

		this.items = [];
		
		// API Definitions
		this.unitelist = unitelist;
		this.unitelist.url = 'http://172.132.45.138/ekstep/index.php?app=jlike&resource=annotations&option=com_api&format=raw&key=ed086fefc3b111c666378912f44d71ca0a70a8b6&content_id=17&type=annotation&subtype=collaborators&client=com_ekcontent&plg_type=content&plg_name=jlike_ekcontent&order=DESC&parent_id=0';
		this.unitelist.limit = 10;
		
		// Loader Config
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		
		this.loadData();
		
	}
}
```

Next, add a new loadData() method to the class that will utilise the magic of Unite

```typescript
	loadData() {
		this.unitelist.getData().then((value: any) => {
			this.items = this.items.concat(value.data.results);
			//console.log(value);
		});
		
	}
	
```

Use the data returned by the API in your template (pages/articles-list/articles-list.html)

```html
<ion-navbar *navbar>
	<button menuToggle>
    <ion-icon name="menu"></ion-icon>
  </button>
	<ion-title>Lists</ion-title>
</ion-navbar>
<ion-searchbar *ngIf="enableSearchbar" [(ngModel)]="searchQuery" (input)="getItems($event)"></ion-searchbar>
<ion-content>
	<ion-list>
		<ion-refresher *ngIf="enablePullToRefresh" (refresh)="doRefresh($event)">
			<ion-refresher-content></ion-refresher-content>
		</ion-refresher>
		<ion-item *ngFor="#item of items" (click)="itemTapped($event, item)">
			<ion-avatar item-left>
				<img src="{{item.user.avatar}}">
			</ion-avatar>
			<h2>{{item.annotation_id}} {{item.user.name}}</h2>
			<p [innerHTML]="item.annotation_html"></p>
		</ion-item>
	</ion-list>
	<ion-infinite-scroll (infinite)="loadData($event)" threshold="5%">
		<ion-infinite-scroll-content></ion-infinite-scroll-content>
	</ion-infinite-scroll>
</ion-content>
```
## How to use unite toast

unite toast uses ionic 2 native toast. We need to add [cordova toast plugin](http://ionicframework.com/docs/v2/native/toast/).

Then open articles-list.ts and make the following changes to start using the power of Unite Toast!
```typescript
import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {UniteToast} from '../../unite-framework/unitetoast';

@Page({
  templateUrl: 'build/pages/articles-list/articles-list.html',
  providers: [UniteList,UniteToast],
})
```

Update the class with necessary configuration
```typescript
export class ListPage {
	selectedItem: any;
	items: any;
	unitelist: any;
	baseurl: string;
	searchQuery: string;
	enableSearchbar: boolean;
	enablePullToRefresh: boolean;
	infinitescroll: any;
	unitetoast: any;
	enableifinitescroll:boolean;
	constructor(private nav: NavController, navParams: NavParams, unitelist: UniteList, uniteitem: UniteItem, unitetoast: UniteToast) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');
		this.items = [];
		// API Definitions
		this.unitetoast = unitetoast;
		this.unitelist = unitelist;
		this.uniteitem = uniteitem;
		this.unitelist.baseurl = 'http://172.132.45.45/joomla/investsure/index.php?option=com_api&app=content&resource=articles&format=raw&key=62edf1d7654d77cc424ca8e5ea8a1140';
		this.unitelist.limit = 10;
		this.searchQuery = '';
		this.enableSearchbar = true;
		this.enablePullToRefresh = true;
		this.enableifinitescroll = false;
		// Loader Config
		this.unitelist.loaderconfig.content = 'Hold Tight!';
		
		// Toaster Config
		
		this.unitetoast.toastOptions.message = "Something went wrong!" //The message to display.
		this.unitetoast.toastOptions.duration = "3000" //Duration to show the toast, either 'short', 'long' or any number of milliseconds: '1500'.
		this.unitetoast.toastOptions.position = "bottom" //Where to position the toast, either 'top', 'center', or 'bottom'.
		
		this.loadData(null);
	}
```

We can change toaster config whenever needed.

Use showToast() method of unite toast to show toast
```
this.unitetoast.showToast();

```

Use hideToast() method of unite toast to hide toast forcefully
```
this.unitetoast.showToast();

```

## How to use unite network-infromation to check internet connection.

unite-framework provide us network-information provider to check availability of network.
unite uses Netwok component from ionic-native, and also we need to add [network cordova plugin](http://ionicframework.com/docs/v2/native/network/).
There is a method named getNetworkInfo() that returns boolean value true or false. If internet is connected it will return true otherwise return false.

open app.ts and make the following changes!

import {NetworkInformation} from './unite-framework/network-information';
```typescript
@App({
  templateUrl: 'build/app.html',
  providers: [UniteMenu, NetworkInformation],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
```
in app.ts upadate the constructor arguments like
constructor(private app: IonicApp, private platform: Platform, private networkInformation: NetworkInformation)

Then open articles-list.ts and make the following changes to start using the power of Unite Toast!
```typescript
import {Page, NavController, NavParams} from 'ionic-angular';
import {UniteList} from '../../unite-framework/unitelist';
import {UniteToast} from '../../unite-framework/unitetoast';
import {NetworkInformation} from '../../unite-framework/network-information';

@Page({
  templateUrl: 'build/pages/articles-list/articles-list.html',
  providers: [UniteList,UniteToast],
})
```
in constructor add paramters like
```
constructor(private networkInformation: NetworkInformation)
```
then we can use it like below
```
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
```
