import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from './app.service';

export const authGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);
  const router = inject(Router)
  // console.log('AUTH CHECKING', appService.checkAuthStatus);

  if (appService.checkAuthStatus) {
    return true;
  }

  return router.navigate(['/login']);
};
