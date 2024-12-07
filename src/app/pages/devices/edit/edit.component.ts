import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevicesService } from '../../../services/devices.service';
import { NgIf } from '@angular/common';
import { DeviceCardComponent } from '../device-card/device-card.component';
import Device from '../types/Device';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DeviceCardComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  device!: Device;
  deviceId!: string;

  _fb = inject(FormBuilder);
  _deviceService = inject(DevicesService);
  _toastr = inject(ToastrService);
  _router = inject(Router);

  _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.device = this._activatedRoute.snapshot.data['device'];
    this.deviceId = this._activatedRoute.snapshot.paramMap.get(
      'device-id'
    ) as string;
    this.updateFormValues();
  }

  fb = new FormBuilder();
  editForm = this.fb.nonNullable.group({
    name: [this.device?.name, [Validators.required]],
    type: ['', [Validators.required]],
    duoPricePerHour: [
      0,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
    multiPricePerHour: [
      0,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
  });

  updateFormValues() {
    this.editForm.patchValue({
      name: this.device.name,
      type: this.device.type,
      duoPricePerHour: this.device.duoPricePerHour,
      multiPricePerHour: this.device.multiPricePerHour,
    });
  }

  onSubmit() {
    const data = {
      ...this.editForm.value,
    };
    if (!data) {
      console.log('updated failed');
      return;
    }
    if (this.editForm.valid) {
      this._deviceService.editDevice(this.deviceId, data).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this._toastr.success('Successfully Edited');
            this._router.navigateByUrl('/devices');
          }
        },
        error: () => {
          this._toastr.error('Something is wrong! Please try again.');
        },
      });
    }
  }
}
