import { Component } from '@angular/core';
import {AuthService} from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hpc-generation-licence-front';

  constructor(private authService: AuthService) { }

  isAuthenticated() { return this.authService.isAuthenticated(); }
}
