import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RecipesState } from './recipes.state';

@NgModule({
  imports: [NgxsModule.forRoot([RecipesState])],
})
export class StateModule {}
