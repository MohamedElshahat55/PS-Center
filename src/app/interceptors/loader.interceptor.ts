import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { skipLoading } from '../components/loading/skip-loading.component';
import { LoadingService } from '../services/loading.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  if (req.context.get(skipLoading)) {
    return next(req);
  }

  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
