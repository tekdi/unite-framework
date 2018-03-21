import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from './../classes';
// import * as configData from 'assets/config.json';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [Config]
})

export class BootModule {
  constructor(public config: Config) {
    config.setConfig();
  }
}