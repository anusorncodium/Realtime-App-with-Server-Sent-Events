import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = 'web';

  constructor() { }

  updateText(text: string) {
    this.text = text;
  }
}
