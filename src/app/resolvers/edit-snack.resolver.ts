import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SnacksService } from '../services/snacks.service';
import Snack from '../pages/snacks/types/Snack';

export const editSnackResolver: ResolveFn<Snack | null> = (route, state) => {
  const _snackService = inject(SnacksService);
  const snackId = route.paramMap.get('snack-id');

  if (!snackId) {
    return null;
  }

  return _snackService.getSnack(snackId);
};
