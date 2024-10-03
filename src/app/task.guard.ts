import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const taskGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.Token)
    return true;
  
  router.navigate(['/login']);
  return false;
};
