import { Component, input, output } from '@angular/core';
import Snack from '../types/Snack';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleBasedDirective } from '../../../directives/role-based.directive';

@Component({
  selector: 'app-snack-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, RoleBasedDirective],
  templateUrl: './snack-card.component.html',
  styleUrl: './snack-card.component.css',
})
export class SnackCardComponent {
  snackItem = input.required<Snack>();
  snackDeleted = output<string>();

  deleteSnack(snack: Snack) {
    this.snackDeleted.emit(snack._id);
  }
}
