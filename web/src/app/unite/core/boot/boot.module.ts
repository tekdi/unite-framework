import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from './../../core/classes';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [Config]
})

export class BootModule {
  constructor(private _config: Config) {
    _config.setConfig();
  }
}