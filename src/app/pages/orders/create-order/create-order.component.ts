import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SnacksService } from '../../../services/snacks.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { DevicesService } from '../../../services/devices.service';
import { Observable, switchMap } from 'rxjs';
import { OrdersService } from '../../../services/orders.service';
import Device from '../../devices/types/Device';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  _fb = inject(FormBuilder);
  _snacksService = inject(SnacksService);
  _devicesService = inject(DevicesService);
  _ordersService = inject(OrdersService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  fb = new FormBuilder();
  devices!: Device[];

  isEmpty!: boolean;
  deviceId!: string;

  snacks$: Observable<any> = this._snacksService.loadAllSnacks();

  createForm = this.fb.nonNullable.group({
    snackId: ['', [Validators.required]],
    quantity: [null, [Validators.required]],
    deviceId: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadAllDevices();
    this._activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          const deviceId = params['deviceId'];
          return this._devicesService.getDevice(deviceId);
        })
      )
      .subscribe((res) => {
        this.createForm.patchValue({
          deviceId: res._id,
        });
      });
  }

  loadAllDevices() {
    this._devicesService.loadAllDevices().subscribe((res) => {
      this.devices = res.data.docs;
    });
  }

  onSubmit() {
    // Load all devices once
    this.loadAllDevices();

    // Find if the device is empty (assuming you want to check the selected device, not all devices)
    const selectedDevice = this.devices.find(
      (device) => device._id === this.createForm.controls.deviceId.value
    );

    // Check if selected device is empty
    this.isEmpty = selectedDevice ? selectedDevice.isEmpty : false;

    const data = { ...this.createForm.value };

    // Prepare data to send based on the condition
    let dataToSend;
    if (data.deviceId === '') {
      dataToSend = {
        snackId: this.createForm.controls.snackId.value,
        quantity: this.createForm.controls.quantity.value,
      };
    } else {
      dataToSend = data;
    }

    // Call the createOrder API and handle response
    this._ordersService.createOrder(dataToSend).subscribe({
      next: () => {
        if (this.isEmpty && data.deviceId !== '') {
          // If device is empty and a deviceId is provided, show specific error
          this._toastr.error(
            'This device is empty now. Please select another device.'
          );
        } else {
          // Success
          this._toastr.success('Order successfully created.');
          this._router.navigateByUrl('/orders');
        }
      },
      error: (error) => {
        // Handle error based on response status
        if (error.status === 400) {
          this._toastr.error('Bad request. Please check your input.');
        } else if (error.status === 500) {
          this._toastr.error('Internal server error. Please try again later.');
        } else {
          this._toastr.error('Something went wrong. Please try again!');
        }
      },
    });
  }
}
