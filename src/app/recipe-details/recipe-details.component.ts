import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {Subscription} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        NgForOf,
        RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent {
  activeRecipe: Recipe | undefined;
  subscriptions = new Subscription();
  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipesService,
      private cdr: ChangeDetectorRef,
      private dialog: MatDialog,
      private router: Router,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
        this.route.params.subscribe((params: Params) => {
          this.activeRecipe = this.recipeService.getRecipeById(params['id'])
          this.cdr.detectChanges();
        })
    )
  }

  ngOnDestroy() {
      this.subscriptions.unsubscribe()
  }

    removeRecipe(recipe?: Recipe) {
      if(!recipe){
          return
      }
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: { text: `Czy napewno chcesz usunąć przepis '${recipe.name}'` },
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                console.log('usuniete')
            }
        });
    }

    navigateToEdit(_id: string | undefined) {
        this.router.navigate(['recipe/' + _id +'/edit'])
    }
}
