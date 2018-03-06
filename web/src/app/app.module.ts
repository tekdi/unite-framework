import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const r : Routes = [
                {
                  path : "",
    loadChildren: "./unite/unite.module#UniteModule",
                  data: {'basePath' : ''}
                }
              ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(r)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
