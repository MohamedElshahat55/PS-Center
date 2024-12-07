import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SnacksService } from '../../../services/snacks.service';
import { NgIf } from '@angular/common';
import { SnackCardComponent } from '../snack-card/snack-card.component';
import Snack from '../types/Snack';

@Component({
  selector: 'app-edit-snack',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, SnackCardComponent],
  templateUrl: './edit-snack.component.html',
  styleUrl: './edit-snack.component.css',
})
export class EditSnackComponent {
  snack!: Snack;
  snackId!: string;

  _fb = inject(FormBuilder);
  _snacksService = inject(SnacksService);
  _toastr = inject(ToastrService);
  _router = inject(Router);
  fb = new FormBuilder();

  _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.snack = this._activatedRoute.snapshot.data['snack'];
    this.snackId = this._activatedRoute.snapshot.paramMap.get(
      'snack-id'
    ) as string;
    this.updateFormValues();
  }

  editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    quantityInStock: [0, [Validators.required]],
    buyingPrice: [
      0,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
    sellingPrice: [
      0,
      [Validators.required, Validators.pattern('^\\d+(\\.\\d+)?$')],
    ],
  });

  updateFormValues() {
    this.editForm.patchValue({
      name: this.snack.name,
      quantityInStock: this.snack.quantityInStock,
      buyingPrice: this.snack.buyingPrice,
      sellingPrice: this.snack.sellingPrice,
    });
  }

  onSubmit() {
    const data = { ...this.editForm.value };

    if (!data) {
      console.log('updated failed');
      return;
    }
    if (this.editForm.valid) {
      this._snacksService.editSnack(this.snackId, data).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this._toastr.success('Successfully Updated');
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
