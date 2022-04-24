import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sessionService: SessionService) { }

  isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  logOut() {
    this.sessionService.destroy();
  }
}
