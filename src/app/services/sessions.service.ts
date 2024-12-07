import { HttpClient, HttpParams } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import Pagination, { devicesResult } from './devices.service';
import Session from '../pages/devices/types/Session';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface sessionResult {
  status: string;
  totalNumOfDocs?: number;
  paginationStatus?: Pagination;
  data: {
    docs: Session[];
  };
}

export interface GetOneSession {
  status: string;
  data: {
    doc: Session;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);

  private _env = environment;

  // GET_ALL_SESSIONS
  loadAllSessions(pageParam: number, limit: number): Observable<sessionResult> {
    let params = new HttpParams()
      .set('page', pageParam.toString())
      .set('limit', limit.toString());
    return this._http
      .get<sessionResult>(`${this._env.baseURL}/game-sessions`, {
        params,
      })
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_SESSION
  getSession(id: string): Observable<Session> {
    return this._http
      .get<Session>(`${this._env.baseURL}/game-sessions/${id}`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // DELETE_SESSION
  deleteSession(id: string) {
    return this._http
      .delete<any>(`${this._env.baseURL}/game-sessions/${id}`)
      .pipe(takeUntilDestroyed(this._destroyRef), tap(console.log));
  }

  // DELETE_ALL_SESSIONS
  deleteAllSessions() {
    return this._http
      .delete<any>(`${this._env.baseURL}/game-sessions`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
}
