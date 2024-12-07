import { Component, input, output } from '@angular/core';
import Order from '../types/Order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  orderItem = input.required<Order>();
  orderDeleted = output<string>();

  deleteOrder(order: Order) {
    this.orderDeleted.emit(order._id);
  }
}
