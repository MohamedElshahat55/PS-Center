import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { SnacksService } from '../../../services/snacks.service';

@Component({
  selector: 'app-create-snack',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-snack.component.html',
  styleUrl: './create-snack.component.css',
})
export class CreateSnackComponent {
  _fb = inject(FormBuilder);
  _snacksService = inject(SnacksService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  fb = new FormBuilder();

  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    quantityInStock: [null, [Validators.required]],
    buyingPrice: [
      null,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
    sellingPrice: [
      null,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
  });

  onSubmit() {
    const data = { ...this.createForm.value };

    if (!data) {
      console.log('login failed');
      return;
    }
    if (this.createForm.valid) {
      this._snacksService.createSnack(data).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this._toastr.success('Successfully Created');
            this._router.navigateByUrl('/snacks');
          }
        },
        error: () => {
          this._toastr.error('Something is wrong! Please try again.');
        },
      });
    }
  }
}
