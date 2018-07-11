import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CalendarService } from '../../shared/calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  title$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService) {
  }

  ngOnInit() {

    this.route.firstChild.params.subscribe((params: ParamMap) => {
      const languageCode = params['language'];
      this.title$ = of(this.formatToDisplay(new Date(params['date']), languageCode));
    });    
  }

  private formatToDisplay(date: Date, languageCode: string): string {
    return date.toLocaleDateString(languageCode, this.dateFormatOptions);
  }

  toggleSidenav() {
    this.calendarService.toggleSidenav();
  }
}
