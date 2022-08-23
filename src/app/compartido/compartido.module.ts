import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorValidacionCampoPipe } from './pipes/error-validacion-campo.pipe';
import { ClaseMensajeSnackbarPipe } from './pipes/clase-mensaje-snackbar.pipe';
import { MensajeConfirmacionComponent } from './componentes/mensaje-confirmacion/mensaje-confirmacion.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    
    ErrorValidacionCampoPipe,
    ClaseMensajeSnackbarPipe,
    MensajeConfirmacionComponent,
    CabeceraComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    RouterModule,
    MatExpansionModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ErrorValidacionCampoPipe,
    ClaseMensajeSnackbarPipe,
    RouterModule,
    CabeceraComponent,
  ],
  providers: [
    
  ]
})
export class CompartidoModule { }
