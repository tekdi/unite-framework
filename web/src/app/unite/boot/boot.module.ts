import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config, Menu } from './../core/classes';
import { MenusService } from './../core/services/menus.service';
// import { MenusService } from './services/';
import { HttpClientModule } from '@angular/common/http';
import { BootService } from './boot.service';

export function setConfig(_bootService: BootService) {
  console.log("setConfig MODULE");
  return () => {
    return _bootService.setConfig();
  };
}

export function initMenus(_bootService: BootService) {
  console.log("initMenus MODULE");
  return () => {
    return _bootService.initMenus();
  };
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [Config, MenusService, Menu, BootService,
    { provide: APP_INITIALIZER, 
      useFactory: setConfig, 
      deps: [BootService], multi: true 
    },
    { provide: APP_INITIALIZER, 
      useFactory: initMenus, 
      deps: [BootService], multi: true 
    }],
})

export class BootModule {
  constructor() { }
}