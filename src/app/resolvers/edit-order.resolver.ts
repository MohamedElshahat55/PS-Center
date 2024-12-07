import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GetOneOrder, OrdersService } from '../services/orders.service';

export const editOrderResolver: ResolveFn<GetOneOrder | null> = (
  route,
  state
) => {
  const _orderService = inject(OrdersService);
  const orderId = route.paramMap.get('id');

  if (!orderId) {
    return null;
  }

  return _orderService.getOrder(orderId);
};
