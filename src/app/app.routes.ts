import { SessionsListComponent } from './pages/sessions/sessions-list/sessions-list.component';
import { Routes } from '@angular/router';
import { DevicesListComponent } from './pages/devices/devices-list/devices-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { roleGuard } from './pages/auth/role.guard';
import { CreateComponent } from './pages/devices/create/create.component';
import { EditComponent } from './pages/devices/edit/edit.component';
import { editDeviceResolver } from './resolvers/edit-device.resolver';
import { SnacksListsComponent } from './pages/snacks/snacks-lists/snacks-lists.component';
import { CreateSnackComponent } from './pages/snacks/create-snack/create-snack.component';
import { EditSnackComponent } from './pages/snacks/edit-snack/edit-snack.component';
import { editSnackResolver } from './resolvers/edit-snack.resolver';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { CreateOrderComponent } from './pages/orders/create-order/create-order.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { EditOrderComponent } from './pages/orders/edit-order/edit-order.component';
import { editOrderResolver } from './resolvers/edit-order.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'devices',
        component: DevicesListComponent,
        canActivate: [roleGuard],
        data: { roles: ['USER', 'ADMIN', 'OWNER'] },
      },
      {
        path: 'devices/create',
        component: CreateComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'devices/edit/:device-id',
        component: EditComponent,
        resolve: {
          device: editDeviceResolver,
        },
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'sessions',
        component: SessionsListComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'snacks',
        component: SnacksListsComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER', 'USER'] },
      },
      {
        path: 'snacks/create',
        component: CreateSnackComponent,

        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'snacks/edit/:snack-id',
        component: EditSnackComponent,
        resolve: {
          snack: editSnackResolver,
        },
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'orders',
        component: OrdersListComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'orders/create',
        component: CreateOrderComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'orders/:id/edit',
        component: EditOrderComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'OWNER'] },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
