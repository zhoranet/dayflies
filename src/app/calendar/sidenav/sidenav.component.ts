import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';

import { Language } from '../../models/language';
import { CalendarService } from '../../shared/calendar.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

  private _mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  languages: Language[];
  currentLanguage: Language;
  languageCode: String;
  date: String;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private calendarService: CalendarService) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {

    this.languages = this.calendarService.languages;

    this.route.firstChild.params.subscribe((params) => {
      this.languageCode = params['language'];
      this.currentLanguage = this.calendarService.languages.find(x=>x.code == this.languageCode);
      this.date = params['date'];
    });

    this.router.events.subscribe(x => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
    this.calendarService.sidenavVisible.subscribe(x => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isScreenSmall(): boolean {
    return this.mobileQuery.matches;
  }

  changeLanuguage(event) {
    this.currentLanguage = this.languages.filter(x => x.name === event.target.innerText)[0];
    this.router.navigate(['calendar', this.currentLanguage.code, this.date]);
  }  

  changeDate(event) {    
    this.router.navigate(['calendar', this.languageCode, this.calendarService.formatToISO(event)]);
  }
}
