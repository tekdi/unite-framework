import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  selectorTag = '<app-about></app-about>';

  constructor() { }

  ngOnInit() {
  }
}
