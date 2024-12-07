import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { take, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);
  return _authService.userInfo.pipe(
    take(1), // We take only one emission because we only need the token once
    switchMap((user) => {
      // Ensure user exists and has a token
      if (user && user.token) {
        // Clone the request and add the token to the headers
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        return next(clonedReq);
      }

      // If no token, just pass the original request
      return next(req);
    })
  );
};
