import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatListModule
  ],
  exports:[
  	MatButtonModule,
  	MatExpansionModule,
  	MatToolbarModule,
  	MatInputModule,
  	MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatListModule
  ]
})
export class MaterialModule { }
