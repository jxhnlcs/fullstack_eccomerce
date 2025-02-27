import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao logar', error);
    }
  }
  
}