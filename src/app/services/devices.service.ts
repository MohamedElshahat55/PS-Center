import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private _http = inject(HttpClient);

  private _env = environment;

  loadAllDevices() {
    return this._http
      .get<any>(`${this._env.baseURL}/devices?sort=+isEmpty`)
      .pipe(tap(console.log));
  }
}
