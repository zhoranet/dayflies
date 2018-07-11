import { Component, OnInit } from '@angular/core';
import { EventInfo } from '../../models/event-info';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { CalendarService } from '../../shared/calendar.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute) {
  }

  eventList$: Observable<EventInfo[]>;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const languageCode = params['language'];
      const date = params['date'];
      this.eventList$ = this.calendarService.getEvents$(new Date(date), languageCode);
    });    
  }
}
