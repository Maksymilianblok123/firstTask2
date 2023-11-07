import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ListComponent} from "./list/list.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import { RecipeDetailsEditComponent } from './recipe-details-edit/recipe-details-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RecipeListItemComponent } from './recipe-list-item/recipe-list-item.component';
import { RecipeItemAddComponent } from './recipe-item-add/recipe-item-add.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsEditComponent,
    RecipeListItemComponent,
    RecipeItemAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ListComponent,
    NavbarComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
