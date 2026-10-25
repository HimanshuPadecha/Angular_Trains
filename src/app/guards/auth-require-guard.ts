import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserContextService } from '../user-context';

export const authRequireGuard: CanActivateFn = () => {
  const userContext = inject(UserContextService);
  const router = inject(Router);

  if (!userContext.isLoggedIn()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
