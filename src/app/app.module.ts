import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { DetailsPage } from '../pages/details/details';
import { Storage } from '@ionic/storage';
import {NgZone} from '@angular/core';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    DetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
