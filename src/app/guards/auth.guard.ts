// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const ok = localStorage.getItem('auth_ok') === '1';
  if (!ok) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
