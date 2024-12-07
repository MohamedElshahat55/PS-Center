import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import Snack from '../pages/snacks/types/Snack';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export interface snackResult {
  status: string;
  totalNumOfDocs?: number;
  paginationStatus?: Pagination;
  data: {
    docs: Snack[];
  };
}

export interface GetOneSnack {
  status: string;
  data: {
    doc: Snack;
  };
}

export default interface Pagination {
  currentPage: number;
  numOfItemsPerPage: number;
  numOfPages: number;
  nextPage?: number;
  previousPage?: number;
}
@Injectable({
  providedIn: 'root',
})
export class SnacksService {
  private _http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);
  private _env = environment;

  // GET_ALL_SNACKS
  loadAllSnacks(): Observable<snackResult> {
    return this._http
      .get<snackResult>(`${this._env.baseURL}/snacks?sort=-quantityInStock`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // GET_SNACK
  getSnack(id: string): Observable<Snack> {
    return this._http
      .get<GetOneSnack>(`${this._env.baseURL}/snacks/${id}`)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((res) => res.data.doc)
      );
  }

  // CREATE_SNACK
  createSnack(data: any): Observable<any> {
    return this._http
      .post<any>(`${this._env.baseURL}/snacks`, data)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
  // DELETE_SNACK
  deleteSnack(id: string): Observable<any> {
    return this._http
      .delete<any>(`${this._env.baseURL}/snacks/${id}`)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }

  // EDIT_SNACK
  editSnack(id: string, data: any) {
    return this._http
      .put<any>(`${this._env.baseURL}/snacks/${id}`, data)
      .pipe(takeUntilDestroyed(this._destroyRef));
  }
}
