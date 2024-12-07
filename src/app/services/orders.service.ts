import { HttpClient, HttpParams } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import Pagination from './devices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Order from '../pages/orders/types/Order';

export interface orderResult {
  status: string;
  totalNumOfDocs?: number;
  paginationStatus?: Pagination;
  data: {
    docs: Order[];
  };
}

export interface GetOneOrder {
  status: string;
  data: {
    doc: Order;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);

  private _env = environment;

  // GET_ALL_ORDERS
  loadAllOrders(pageParam: number, limit: number): Observable<orderResult> {
    let params = new HttpParams()
      .set('page', pageParam.toString())
      .set('limit', limit.toString());
    return this._http
      .get<orderResult>(`${this._env.baseURL}/orders`, {
        params,
      })
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // DELETE_ORDER
  deleteOrder(id: string) {
    return this._http
      .delete<any>(`${this._env.baseURL}/orders/${id}`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // DELETE_ALL_ORDERS
  deleteAllOrders() {
    return this._http
      .delete<any>(`${this._env.baseURL}/orders`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_ORDERS
  getOrder(id: string): Observable<GetOneOrder> {
    return this._http.get<GetOneOrder>(`${this._env.baseURL}/orders/${id}`);
  }

  // CREATE_ORDER
  createOrder(data: any): Observable<any> {
    return this._http
      .post<any>(`${this._env.baseURL}/orders`, data)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // ADD_SNACK_TO_ORDER
  addSnackToOrder(id: string, data: any) {
    return this._http
      .patch<any>(`${this._env.baseURL}/orders/${id}/add-item`, data)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
}
