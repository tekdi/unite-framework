import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EventsComponent, EventDetailComponent]
})
export class ViewsModule { }
