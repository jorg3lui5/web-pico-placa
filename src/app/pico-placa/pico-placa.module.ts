import { PicoPlacaRoutingModule } from './pico-placa-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { IngresoAutoComponent } from './ingreso-auto/ingreso-auto.component';
import { ConsultaCirculacionComponent } from './consulta-circulacion/consulta-circulacion.component';

@NgModule({
  declarations: [
    IngresoAutoComponent,
    ConsultaCirculacionComponent,
    
  ],
  imports: [
    CommonModule,
    PicoPlacaRoutingModule,
    CompartidoModule,
    
  ]
})
export class PicoPlacaModule { }
