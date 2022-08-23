import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pico-placa',
    loadChildren: () => import('./pico-placa/pico-placa.module').then(m=>m.PicoPlacaModule)
  },
  {
    path: '**', 
    redirectTo: 'pico-placa'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
