import { Component, input, output } from '@angular/core';
import Session from '../../devices/types/Session';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { convertToHoursAndMinutes } from '../helpers/convertToHoursAndMinutes';

@Component({
  selector: 'app-session-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
  sessionItem = input.required<Session>();
  sessionDeleted = output<string>();

  hours: number = 0;
  minutes: number = 0;

  ngOnInit(): void {
    this.convertTime();
  }

  deleteSession(session: Session) {
    this.sessionDeleted.emit(session._id);
  }

  convertTime(): void {
    const { hours, minutes } = convertToHoursAndMinutes(
      this.sessionItem().estimatedTimeInHours
    );
    this.hours = hours;
    this.minutes = minutes;
  }
}
