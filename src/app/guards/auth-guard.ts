import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserContextService } from '../user-context';

export const authGuard: CanActivateFn = () => {
  const userContext = inject(UserContextService);
  const router = inject(Router);


  // Already logged in redirect to home
  if (userContext.currentUser()) {
    console.log("Already logged in redirect to home..");
    return router.createUrlTree(['/home']);
  }

  // Not logged in redirect : let it redirect
  return true;
};
