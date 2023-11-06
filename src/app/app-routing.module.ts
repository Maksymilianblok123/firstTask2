import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeDetailsEditComponent} from "./recipe-details-edit/recipe-details-edit.component";

const routes: Routes = [
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path: 'recipe/:id/edit', component: RecipeDetailsEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
