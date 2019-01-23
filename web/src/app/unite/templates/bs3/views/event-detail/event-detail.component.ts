import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { dataSources } from '../../../../datasources/sources.collection';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  item = '';
  constructor(private _acRoutes: ActivatedRoute, private _httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    let dataSourceClass = dataSources['Diksha'];
    let dataSourceObj = new dataSourceClass('events', this._httpClient);
    dataSourceObj.get('/' + this._acRoutes.snapshot.params['id']).subscribe((result) => {
      this.item = result;
    });
  }
}
