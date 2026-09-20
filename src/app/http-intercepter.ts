import { HttpInterceptorFn } from '@angular/common/http';
import { CONSTS } from '../types';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let requestWithCredentials = req.clone({ withCredentials: true });

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    if (token) {
      requestWithCredentials = requestWithCredentials.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(requestWithCredentials);
};
