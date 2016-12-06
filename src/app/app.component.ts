import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {NgZone} from '@angular/core';

import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DetailsPage } from '../pages/details/details';

import {UniteItem} from '../unite-framework/uniteitem';
import {UniteList} from '../unite-framework/unitelist';
import {UniteToast} from '../unite-framework/unitetoast';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
  providers: [UniteItem,UniteList,UniteToast]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  storage:any;

  constructor(public platform: Platform, private zone: NgZone, storage:Storage) {
    this.storage = storage;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Details', component: DetailsPage },
    ];
  }

  initializeApp() {
    /*this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });*/


      this.platform.ready().then(() => {
        this.storage.get("siteConfig").then((value) => {
          if (value) {
            //this.siteConfig.setConfig(JSON.parse(value));
            this.zone.run(() => {
              if (value) {
                this.rootPage = ListPage;	
              } else {
                this.rootPage = LoginPage;
              }
            });
          } else {
            this.rootPage = LoginPage;
          }
        });
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
