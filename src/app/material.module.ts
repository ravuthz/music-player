import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatSliderModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatSliderModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MaterialFileInputModule,
  MatDialogModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
  providers: [
    MatDatepickerModule
  ]
})
export class MaterialModule { }
