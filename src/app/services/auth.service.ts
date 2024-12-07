import { HttpClient } from '@angular/common/http';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { environment } from '../../environments/environment.development';
import User, { UserRoles } from '../pages/auth/types/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

interface AuthResponse {
  status: string;
  token: string;
  user: User;
}
const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo = new BehaviorSubject<AuthResponse | null>(null);

  #userSignal = signal<AuthResponse | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());
  constructor() {
    this.loadUserFromLocalStorage();
    effect(() => {
      const user = this.user();

      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  loadUserFromLocalStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
      this.userInfo.next(user);
    }
  }

  private _http = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  _router = inject(Router);

  private _env = environment;

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(`${this._env.baseURL}/auth/register`, {
        username,
        email,
        password,
      })
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  login(email: string, password: string) {
    this._http
      .post<AuthResponse>(`${this._env.baseURL}/auth/login`, {
        email,
        password,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.#userSignal.set(user);
        this.userInfo.next(user);
        this._router.navigateByUrl('/devices');
      });
  }

  logOut() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    this.userInfo.next(null);
    this._router.navigateByUrl('/login');
  }
}
