import { Component, inject, OnInit } from '@angular/core';
import { SessionsService } from '../../../services/sessions.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import Session from '../../devices/types/Session';
import { SessionCardComponent } from '../session-card/session-card.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [InfiniteScrollModule, SessionCardComponent],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.css',
})
export class SessionsListComponent implements OnInit {
  sessions: Session[] = []; // Array to store fetched devices
  page: number = 1; // Page counter for pagination
  limit: number = 10; // Number of items per request
  isLoading: boolean = false; // To prevent multiple simultaneous API calls
  hasMore: boolean = true; // Flag to check if more data is available

  scrollDistance = 1; // Trigger when 1px before the bottom
  scrollUpDistance = 2; // Trigger when scrolling 2px from the top

  _sessionsService = inject(SessionsService);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadAllSessions();
  }

  loadAllSessions() {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this._sessionsService.loadAllSessions(this.page, this.limit).subscribe({
      next: (response) => {
        const newSessions = response.data.docs.filter(
          (session) => session.device !== null
        );
        if (newSessions.length < this.limit) {
          this.hasMore = false; // No more data left to load
        }
        this.sessions = [...this.sessions, ...newSessions];
        this.page++; // Increment page number for the next request
        this.isLoading = false; // Reset loading flag
      },
      error: (error) => {
        console.error('Error loading sessions:', error);
        this.isLoading = false; // Reset loading flag on error
      },
    });
  }

  onScroll() {
    this.loadAllSessions();
  }

  onDeleteSession(sessionId: string) {
    this._sessionsService.deleteSession(sessionId).subscribe({
      next: () => {
        this._toastr.success('Session Successfully deleted');
        this.sessions = this.sessions.filter(
          (session) => session._id !== sessionId
        );
      },
    });
  }

  onDeleteAllSessions() {
    this._sessionsService.deleteAllSessions().subscribe({
      next: () => {
        this._toastr.success('Successfully deleted all sessions');
      },
    });
  }
}
