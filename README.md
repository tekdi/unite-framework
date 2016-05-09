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
<ion-content>
	<ion-list>
		<ion-refresher (refresh)="doRefresh($event)">
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
