import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';
import Device from '../pages/devices/types/Device';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface devicesResult {
  status: string;
  totalNumOfDocs?: number;
  paginationStatus?: Pagination;
  data: {
    docs: Device[];
  };
}

export interface GetOneDevice {
  status: string;
  data: {
    doc: Device;
  };
}

export default interface Pagination {
  currentPage: number;
  numOfItemsPerPage: number;
  numOfPages: number;
  nextPage?: number;
  previousPage?: number;
}

export enum SessionTypes {
  DUO = 'DUO',
  MULTI = 'MULTI',
}

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);

  private _env = environment;

  // GET_ALL_DEVICES
  loadAllDevices(): Observable<devicesResult> {
    return this._http.get<devicesResult>(
      `${this._env.baseURL}/devices?sort=+isEmpty`
    );
  }
  // CREATE_DEVICE
  createDevice(
    name: string,
    type: string,
    duoPricePerHour: number,
    multiPricePerHour: number
  ): Observable<any> {
    return this._http
      .post<any>(`${this._env.baseURL}/devices`, {
        name,
        type,
        duoPricePerHour,
        multiPricePerHour,
      })
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
  // DELETE_DEVICE
  deleteDevice(id: string): Observable<any> {
    return this._http
      .delete<any>(`${this._env.baseURL}/devices/${id}`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // EDIT_DEVICE
  editDevice(id: string, data: any) {
    return this._http
      .put<any>(`${this._env.baseURL}/devices/${id}`, data)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // CHANGE_SESSION_TYPE
  editDeviceSessionType(id: string, sessionType: any) {
    return this._http
      .patch<any>(`${this._env.baseURL}/devices/${id}/session-type`, {
        sessionType: sessionType,
      })
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_DEVICE
  getDevice(id: string): Observable<Device> {
    return this._http
      .get<GetOneDevice>(`${this._env.baseURL}/devices/${id}`)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((res) => res.data.doc)
      );
  }

  // RESET_DEVICE
  resetDevice(id: string) {
    return this._http
      .put<any>(`${this._env.baseURL}/devices/${id}/reset`, {})
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // START_TIME
  startTime(id: string): Observable<any> {
    return this._http
      .patch<any>(`${this._env.baseURL}/devices/${id}/start-time`, {})
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
  // END_TIME
  endTime(id: string): Observable<any> {
    return this._http
      .post<any>(`${this._env.baseURL}/devices/${id}/end-time`, {})
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // RESET_ALL_DEVICE
  resetAllDevices(): Observable<any> {
    return this._http
      .put<any>(`${this._env.baseURL}/devices/reset`, {})
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
}
