import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // <--- ajoute ça
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],   // <--- ajoute CommonModule ici
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  async onSubmit() {
    console.log('submit', this.email, this.password);
    this.error = '';

    const user = await this.auth.login(this.email, this.password);

    if (!user) {
      this.error = 'Identifiants invalides';
      return;
    }

    localStorage.setItem('auth_ok', '1');
    localStorage.setItem('role', user.role);
    localStorage.setItem('id', user.id);

    if (user.role === 'admin') {
      this.router.navigateByUrl('/admin/dashboard');
    } else if (user.role === 'receptioniste') {
      this.router.navigateByUrl('/reception/dashboard');
    } else {
      this.router.navigateByUrl('/client/dashboard');
    }
  }
}
