import { Component, inject } from '@angular/core';
import { SnacksService } from '../../../services/snacks.service';
import { SnackCardComponent } from '../snack-card/snack-card.component';
import Snack from '../types/Snack';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { RoleBasedDirective } from '../../../directives/role-based.directive';

@Component({
  selector: 'app-snacks-lists',
  standalone: true,
  imports: [SnackCardComponent, RouterLink, RoleBasedDirective],
  templateUrl: './snacks-lists.component.html',
  styleUrl: './snacks-lists.component.css',
})
export class SnacksListsComponent {
  snacks: Snack[] = [];

  _snackService = inject(SnacksService);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadAllSnacks();
  }

  loadAllSnacks() {
    this._snackService
      .loadAllSnacks()
      .pipe(
        map((response) => {
          // Add an image URL to each snack item
          const updatedDocs = response.data.docs.map((snack) => {
            // Dynamically assign an image URL for each snack based on its id or name
            snack.image = this.getImageForSnack(snack); // Assuming you have a method to get the image
            return snack;
          });

          // Return the updated response with enriched data
          return { ...response, data: { ...response.data, docs: updatedDocs } };
        })
      )
      .subscribe({
        next: (res) => {
          this.snacks = res.data.docs;
        },
      });
  }

  private getImageForSnack(snack: Snack): string {
    const imageName = snack.name;
    return `assets/images/snacks/${imageName}.jpg`;
  }

  onSnackDeleted(snackId: string) {
    this._snackService.deleteSnack(snackId).subscribe({
      next: () => {
        this._toastr.success('Snack Successfully deleted');
        this.snacks = this.snacks.filter((snack) => snack._id !== snackId);
      },
    });
  }
  onCreateSnack() {}
}
