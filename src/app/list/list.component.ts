import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  constructor(
      private recipesService: RecipesService,
      private dialog: MatDialog
  ) {
  }
  searchFormControl = new FormControl('', [Validators.required, Validators.email]);

  recipeList: any[] = this.recipesService.recipeList;

  removeRecipe(_id: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { text: `Czy napewno chcesz usunąć przepis '${_id}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('usuniete')
      }
    });
  }

  // #todo dodać debounce time
  filterRecipes() {
    this.recipeList = this.recipesService.recipeList.filter((recipe) => {
      return recipe.name.toLowerCase().includes(<string>this.searchFormControl.value?.toLowerCase())
    })
  }
}
