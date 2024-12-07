import { Component, effect, HostBinding, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { RoleBasedDirective } from '../../directives/role-based.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    SidebarComponent,
    LoadingComponent,
    RoleBasedDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  _authService = inject(AuthService);
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkmode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkmode', JSON.stringify(this.darkMode()));
    });
  }

  logout() {
    this._authService.logOut();
  }
}
