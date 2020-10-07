import { Component, OnInit } from '@angular/core';

import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly url = "http://localhost:8000/message/";
  message = 'Hello SSE';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService
      .getMessageEvent(this.url + "events/")
      .subscribe(res => this.message = res || this.message);
  }

  getMessage() {
    this.messageService.getMessage(this.url).subscribe(
      res => this.message = res.message || this.message
    );
  }

  setMessage(text: string) {
    const message = {
      "message": text
    }
    this.messageService.setMessage(this.url, message).subscribe();
  }
}
