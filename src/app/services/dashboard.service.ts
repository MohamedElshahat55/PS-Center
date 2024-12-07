import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { OrderTypes } from '../pages/orders/types/Order';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// PERCENTAGE_TYPES
export interface SessionTypesPercentageItem {
  DuoPercentage: number;
  MultiPercentage: number;
}
export interface OrderTypesPercentageItem {
  InDevicePercentage: number;
  OutDevicePercentage: number;
}
export interface PercentageResI<T> {
  status: string;
  data: {
    percentage: T[];
  };
}

// MONTHLY_PROFITS_TYPES
export interface ProfitItem {
  _id: {
    month: number;
    year: number;
    type?: OrderTypes;
  };
  value: number;
}
export interface ProfitsI<T> {
  status: string;
  data: {
    profits: T[];
  };
}

// DOCS_COUNT_TYPE
export interface DocsCountI {
  status: string;
  data: {
    orders: number;
    sessions: number;
    devices: number;
    snacks: number;
    users: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);

  private _env = environment;

  // GET_ORDERS_MONTHLY_PROFITS
  getOrdersMonthlyProfits(): Observable<ProfitsI<ProfitItem>> {
    return this._http
      .get<ProfitsI<ProfitItem>>(`${this._env.baseURL}/orders/monthly-profits`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_ORDERS_MONTHLY_PROFITS
  getOrderTypesPercentages(): Observable<
    PercentageResI<OrderTypesPercentageItem>
  > {
    return this._http
      .get<PercentageResI<OrderTypesPercentageItem>>(
        `${this._env.baseURL}/orders/types-percentage`
      )
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_SESSIONS_MONTHLY_PROFITS
  getSessionsMonthlyProfits(): Observable<
    PercentageResI<SessionTypesPercentageItem>
  > {
    return this._http
      .get<PercentageResI<SessionTypesPercentageItem>>(
        `${this._env.baseURL}/game-sessions/session-types-percentage`
      )
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_DOCS_COUNT
  getDocsCount(): Observable<DocsCountI> {
    return this._http.get<DocsCountI>(`${this._env.baseURL}/docs-count`);
  }
}
