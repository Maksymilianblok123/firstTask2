import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxsModule} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {FeatureListComponent} from "feature-list";
import {FeatureNavbarComponent} from "feature-navbar";
import {RecipesState} from "../libs/data-access-recipes/src/lib/data-access-recipes/recipes.state";
import {RecipesFacade} from "../libs/data-access-recipes/src/lib/data-access-recipes/recipes.fascade";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxsModule.forRoot([RecipesState], {
      developmentMode: true
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FeatureListComponent,
    FeatureNavbarComponent
  ],
  providers: [RecipesFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
