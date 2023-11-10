import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipe/add',
    loadComponent: () =>
      import('./recipe-item-add/recipe-item-add.component')
        .then(m => m.RecipeItemAddComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./recipe-details/recipe-details.component')
        .then(m => m.RecipeDetailsComponent)
  },
  {
    path: 'recipe/:id/edit',
    loadComponent: () =>
      import('./recipe-details-edit/recipe-details-edit.component')
        .then(m => m.RecipeDetailsEditComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
{
        bindToComponentInputs: true
      } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
