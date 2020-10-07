import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
  constructor(
    private _zone: NgZone,
    private http: HttpClient
  ) { }

  setMessage(url: string, message: any): Observable<any> {
    return this.http.post(url, message);
  }

  getMessage(url: string): any {
    return this.http.get(url);
  }

  getMessageEvent(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      };

      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}