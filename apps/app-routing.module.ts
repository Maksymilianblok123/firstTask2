import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipe/add',
    loadComponent: () =>
      import('../libs/feature-recipe-item-add/src/lib/feature-recipe-item-add/feature-recipe-item-add.component')
        .then(m => m.FeatureRecipeItemAddComponent)
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('../libs/feature-recipe-details/src/lib/feature-recipe-details/feature-recipe-details.component')
        .then(m => m.FeatureRecipeDetailsComponent)
  },
  {
    path: 'recipe/:id/edit',
    loadComponent: () =>
      import('../libs/feature-recipe-details-edit/src/lib/feature-recipe-details-edit/feature-recipe-details-edit.component')
        .then(m => m.FeatureRecipeDetailsEditComponent)
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
