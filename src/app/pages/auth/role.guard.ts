import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const roles = route.data['roles'] as string[];

  return new Observable<boolean>((observer) => {
    _authService.userInfo.subscribe((res) => {
      const userRole = res?.user.role; // Assuming the user object has a 'role' property

      console.log('role', userRole);

      if (!userRole) {
        // Redirect to login if no user is logged in
        _router.navigate(['/login']);
        observer.next(false);
        observer.complete();
        return;
      }

      // Check if the user role is in the allowed roles
      const hasRole = roles.some((role) => role === userRole); // Check if any of the allowed roles matches the user's role

      if (hasRole) {
        observer.next(true);
      } else {
        // Redirect to the forbidden page or login if the user doesn't have the required role
        _router.navigate(['/forbidden']);
        observer.next(false);
      }
      observer.complete();
    });
  });
};
