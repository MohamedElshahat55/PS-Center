import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevicesService } from '../../../services/devices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  _fb = inject(FormBuilder);
  _deviceService = inject(DevicesService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  fb = new FormBuilder();
  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    duoPricePerHour: [
      null,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
    multiPricePerHour: [
      null,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
  });

  onSubmit() {
    const { name, type, duoPricePerHour, multiPricePerHour } = {
      ...this.createForm.value,
    };
    if (!name || !type || !duoPricePerHour || !multiPricePerHour) {
      console.log('login failed');
      return;
    }
    if (this.createForm.valid) {
      this._deviceService
        .createDevice(name, type, duoPricePerHour, multiPricePerHour)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this._toastr.success('Successfully Created');
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
