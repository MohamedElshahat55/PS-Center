import { Component, inject } from '@angular/core';
import Order from '../types/Order';
import { OrdersService } from '../../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrderCardComponent } from '../order-card/order-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [InfiniteScrollModule, OrderCardComponent, RouterLink],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
})
export class OrdersListComponent {
  orders: Order[] = []; // Array to store fetched devices
  page: number = 1; // Page counter for pagination
  limit: number = 10; // Number of items per request
  isLoading: boolean = false; // To prevent multiple simultaneous API calls
  hasMore: boolean = true; // Flag to check if more data is available

  scrollDistance = 1; // Trigger when 1px before the bottom
  scrollUpDistance = 2; // Trigger when scrolling 2px from the top

  _oredersService = inject(OrdersService);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders() {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this._oredersService.loadAllOrders(this.page, this.limit).subscribe({
      next: (response) => {
        const newOrders = response.data.docs;
        if (newOrders.length < this.limit) {
          this.hasMore = false; // No more data left to load
        }
        this.orders = [...this.orders, ...newOrders];
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
    this.loadAllOrders();
  }

  onOrderDeleted(orderId: string) {
    this._oredersService.deleteOrder(orderId).subscribe({
      next: () => {
        this._toastr.success('Order Successfully deleted');
        this.orders = this.orders.filter((order) => order._id !== orderId);
      },
    });
  }
}
