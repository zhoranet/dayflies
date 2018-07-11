import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { EventInfo } from '../../models/event-info';
import { CalendarService } from '../../shared/calendar.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  eventInfo$: Observable<EventInfo>;

  private currentEventId: string;
  private currentDate: Date;
  private currentLanguageCode: string;

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.currentLanguageCode = params['language'];
      this.currentDate = new Date(params['date']);      
      this.currentEventId = params['eventId'];
      this.eventInfo$ = this.calendarService.getEvent(this.currentEventId, this.currentLanguageCode);      
    });    
  }

  loadPreviousEvent() {    
    let previousEventId = this.calendarService.getPreviousEventId(this.currentDate, this.currentEventId, this.currentLanguageCode);
    this.navigateToEventId(previousEventId);    
  }

  loadNextEvent() {
    let nextEventId = this.calendarService.getNextEventId(this.currentDate, this.currentEventId, this.currentLanguageCode);
    this.navigateToEventId(nextEventId);    
  }

  private navigateToEventId(previousEventId: string) {
    this.router.navigate(['calendar', this.currentLanguageCode, this.calendarService.formatToISO(this.currentDate), previousEventId]);
  }

  

}
