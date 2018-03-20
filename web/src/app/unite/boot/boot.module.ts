import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './../services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ConfigService]
})
export class BootModule {

  constructor(private _configService: ConfigService) {
  }

  getConfig() {
    return this._configService.getConfig().subscribe(response => {
      
    });
  }
}
