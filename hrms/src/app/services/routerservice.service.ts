import { Injectable } from '@angular/core';
import {NavigationStart, NavigationEnd, NavigationCancel, NavigationError}  from '@angular/router';
import {Observable, Observer}  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() { }

  isStart(e: Event): boolean {
    return e instanceof NavigationStart;
    }
    
    isEnd(e: Event): boolean {
    return e instanceof NavigationEnd ||
      e instanceof NavigationCancel ||
      e instanceof NavigationError;
    }

    collectAllEventsForNavigation(obs: Observable<Event>): Observable<Event[]>{
      let observer: Observer<Event[]>;
      const events: any[] = [];
      const sub = obs.subscribe((e: any) => {
        events.push(e);
        if (this.isEnd(e)) {
          observer.next(events);
          observer.complete();
        }
      });
      return new Observable<Event[]>(o => observer = o);
    }    
}
