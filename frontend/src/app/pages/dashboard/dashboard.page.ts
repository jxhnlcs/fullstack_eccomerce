import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  constructor(private authService: AuthService, private router: Router) {}

  // logout() {
  //   this.authService.logout().then(() => {
  //     this.router.navigate(['/login']);
  //   });
  // }
}