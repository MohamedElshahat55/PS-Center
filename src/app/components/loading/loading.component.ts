import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinner],
  template: ` @if (loading()) {
    <div class="spinner-container">
      <mat-spinner />
    </div>

    }`,
  styles: `.spinner-container {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.32);
    z-index: 10000;
  }
  `,
})
export class LoadingComponent {
  loadingService = inject(LoadingService);

  loading = this.loadingService.loading;
}
