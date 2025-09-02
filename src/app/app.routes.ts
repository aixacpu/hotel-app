import { LoginComponent } from './pages/login/login';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { ReceptionDashboardComponent } from './pages/reception/dashboard/dashboard';
import { ClientDashboardComponent } from './pages/client/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'reception/dashboard', component: ReceptionDashboardComponent, canActivate: [authGuard] },
  { path: 'client/dashboard', component: ClientDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
