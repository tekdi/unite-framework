import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './unite/core/error-handler/app-error';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BootModule } from './unite/boot';

const r: Routes = [
                {
                  path : '',
                  loadChildren: './unite/unite.module#UniteModule',
                  data: {'basePath' : ''}
                }
              ]; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BootModule,
    RouterModule.forRoot(r, { enableTracing: false })
  ],
  providers: [
    //  { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
