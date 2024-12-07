import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { SnacksService } from '../../../services/snacks.service';
import Order from '../types/Order';
import { GetOneOrder, OrdersService } from '../../../services/orders.service';
import { OrderCardComponent } from '../order-card/order-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, OrderCardComponent],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
})
export class EditOrderComponent {
  _snacksService = inject(SnacksService);
  _orderService = inject(OrdersService);
  snacks$: Observable<any> = this._snacksService.loadAllSnacks();
  _fb = inject(FormBuilder);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  _destroyRef = inject(DestroyRef);

  order!: Order;
  orderId!: string;

  _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.orderId = this._activatedRoute.snapshot.paramMap.get('id') as string;
    this.getOrder();
  }

  getOrder() {
    this._orderService.getOrder(this.orderId).subscribe((res) => {
      this.order = res.data.doc;
    });
  }

  fb = new FormBuilder();
  editForm = this.fb.nonNullable.group({
    snackId: ['', [Validators.required]],
    quantity: [null, [Validators.required]],
  });

  onSubmit() {
    const data = {
      ...this.editForm.value,
    };
    if (!data) {
      console.log('updated failed');
      return;
    }
    if (this.editForm.valid) {
      this._orderService.addSnackToOrder(this.orderId, data).subscribe({
        next: (res) => {
          this.getOrder();
          this._toastr.success('Successfully Edited');
        },
        error: () => {
          this._toastr.error('Something is wrong! Please try again.');
        },
      });
    }
  }
}
