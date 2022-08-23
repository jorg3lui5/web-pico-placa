import { ConsultaCirculacionComponent } from './consulta-circulacion/consulta-circulacion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoAutoComponent } from './ingreso-auto/ingreso-auto.component';

const routes: Routes = [
  {
    path: 'ingreso-auto', 
    component: IngresoAutoComponent
  },
  {
    path: 'consulta-circulacion', 
    component: ConsultaCirculacionComponent
  },
  {
    path: '**', 
    redirectTo: 'ingreso-auto'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicoPlacaRoutingModule { }
