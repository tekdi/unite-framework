import { Component, OnInit } from '@angular/core';
import { renderMapper } from '../../renderer/renderers.collection';
import { Menu } from '@unite/core';


@Component({
  selector: 'app-layout-one',
  templateUrl: './layout-one.component.html'
})
export class LayoutOneComponent implements OnInit {

  renderMapper = renderMapper;
  uniteMenus;
  constructor(private _menu: Menu) {
    console.log('LAYOUT', this._menu.getMenus());
    this.uniteMenus = this._menu.getMenus();
  }

  ngOnInit() {
  }
}
