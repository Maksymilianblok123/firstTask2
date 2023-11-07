import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeDetailsEditComponent} from "./recipe-details-edit/recipe-details-edit.component";
import {RecipeItemAddComponent} from "./recipe-item-add/recipe-item-add.component";

const routes: Routes = [
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path: 'recipe/:id/edit', component: RecipeDetailsEditComponent},
  {path: 'recipe/add', component: RecipeItemAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
{
        bindToComponentInputs: true
      } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
