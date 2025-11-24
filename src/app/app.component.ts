import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  isLoggedIn$;

  constructor(public auth: AuthService, private router: Router) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); // redirige al login
  }
}
