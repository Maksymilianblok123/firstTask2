import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipe/add',
    loadComponent: () =>
      import('../libs/feature-recipe-item-add/recipe-item-add.component')
        .then(m => m.RecipeItemAddComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('../libs/feature-recipe-details/recipe-details.component')
        .then(m => m.RecipeDetailsComponent)
  },
  {
    path: 'recipe/:id/edit',
    loadComponent: () =>
      import('../libs/feature-recipe-details-edit/recipe-details-edit.component')
        .then(m => m.RecipeDetailsEditComponent)
  },
  {
    path: '**',
    redirectTo: '/recipe/add',
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
