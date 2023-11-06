import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
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
  searchFormControl = new FormControl('', [Validators.required, Validators.email]);
  recipeListInit: Recipe[] = [];
  recipeList: Recipe[] = [];

  constructor(
      private recipesService: RecipesService,
      private dialog: MatDialog,
      private router: Router,
      private cdr: ChangeDetectorRef,
  ) {}

ngOnInit() {
    this.getRecipes();
}

getRecipes() {
  this.recipesService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipeListInit = recipes
        this.recipeList = recipes
        this.cdr.detectChanges();
      })
}

  removeRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { text: `Czy napewno chcesz usunąć przepis '${recipe.name}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log('usuniete')
        console.log(result)
        this.recipesService.deleteRecipe(recipe._id)
            .subscribe(res => {
              console.log(`Usunięto element ${recipe.name}`)
              this.getRecipes()
            }, err => {
              console.error('Wystąpił błąd podczas usuwania')
            })
      }
    });
  }

  // #todo dodać debounce time
  filterRecipes() {
    this.recipeList = this.recipeListInit.filter((recipe) => {
      return recipe.name.toLowerCase().includes(<string>this.searchFormControl.value?.toLowerCase())
    })
  }

  navigateToEdit(_id: any) {
    this.router.navigate(['recipe/' + _id +'/edit'])
  }
}
