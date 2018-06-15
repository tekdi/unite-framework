import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataSources } from '../../../../datasources/sources.collection';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  items = '';

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    let dataSourceClass = dataSources['Diksha'];        
    let dataSourceObj = new dataSourceClass('events', this._httpClient);
    dataSourceObj.getAll().subscribe((result) => {
      this.items = result;
      console.log(result, "EVENTS VIEW RESULT");
    });
  }
}
