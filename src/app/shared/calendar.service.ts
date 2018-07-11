import { Injectable } from '@angular/core';
import { EventInfo } from '../models/event-info';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { ENGLISH_EVENTS, RUSSIAN_EVENTS } from './mock-event-list';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
 
  languages: Language[] = [
    { code: 'en', name: 'English'},
    { code: 'ru', name: 'Russian'},
  ];

  private eventListSource = new BehaviorSubject<EventInfo[]>(new Array<EventInfo>());
  eventList  = this.eventListSource.asObservable();
  
  private sidenavVisibleSource = new BehaviorSubject<boolean>(true);
  sidenavVisible = this.sidenavVisibleSource.asObservable();

  constructor() { }

  toggleSidenav() {
    this.sidenavVisibleSource.next(!this.sidenavVisibleSource.getValue());
  }

  getEvents$(date: Date, languageCode: string): Observable<EventInfo[]> {
    const events = this.getEventsByDateAndLanguage(date, languageCode);   
    return of(events);
  }

  getEvent(eventId: string, languageCode: string): Observable<EventInfo> {
    const events = this.getEventsByLanguage(languageCode);
    return of(events.find(x => x.id === eventId));
  }

  getPreviousEventId(currentDate: Date, currentEventId: string, currentLanguageCode: string): string {
    let events = this.getEventsByDateAndLanguage(currentDate, currentLanguageCode);
    var currentIndex = events.map(x=> x.id).indexOf(currentEventId);    
    return currentIndex > 0 ? events[currentIndex - 1].id: '';
  }

  getNextEventId(currentDate: Date, currentEventId: string, currentLanguageCode: string): string {
    let events = this.getEventsByDateAndLanguage(currentDate, currentLanguageCode);
    var currentIndex = events.map(x=> x.id).indexOf(currentEventId);    
    return currentIndex < events.length - 1 ? events[currentIndex + 1].id: '';
  }

  formatToISO(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  private getEventsByDateAndLanguage(date: Date, languageCode: string) {

    const events = this.getEventsByLanguage(languageCode);

    let index = date.getDate() - 1;

    console.log('index:' + index);

    if(index > 15) index = index - 15;    
    const randomSequence = '245913152879152614361725113313795819';
    let pair = randomSequence.substring(index * 2, (index * 2) + 2);

    return events.filter(x => parseInt(x.id, 10) >= parseInt(pair.charAt(0), 10) && parseInt(x.id, 10) <= parseInt(pair.charAt(1), 10));
  }

  private getEventsByLanguage(languageCode: String) {
    let events = ENGLISH_EVENTS;
    if (languageCode === 'ru') {
      events = RUSSIAN_EVENTS;
    }
    return events;
  }

  
}
