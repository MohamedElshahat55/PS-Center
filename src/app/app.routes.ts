import { Routes } from '@angular/router';
import { DevicesListComponent } from './pages/devices/devices-list/devices-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'devices', component: DevicesListComponent }],
  },
  { path: '**', component: NotFoundComponent },
];
