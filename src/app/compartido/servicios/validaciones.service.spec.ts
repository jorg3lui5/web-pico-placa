import { TestBed } from '@angular/core/testing';

import { ValidacionesService } from './validaciones.service';
import { FormControl } from '@angular/forms';

describe('ValidacionesService', () => {
  let service: ValidacionesService;

  beforeEach(() => {
    service = new ValidacionesService();
  });
  
  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it( 'Prueba el servicio ValidacionEspaciosEnBlanco cuando existe tal error', () => {
    const control: FormControl = new FormControl(['', []]);
    control.setValue('    ')
    const respuesta = {espaciosEnBlanco: true};
    expect(service.ValidacionEspaciosEnBlanco(control)).toEqual(respuesta);
  });

  it( 'Prueba el servicio ValidacionEspaciosEnBlanco cuando no existe tal error', () => {
    const control: FormControl = new FormControl(['', []]);
    control.setValue(' Prueba   ')
    expect(service.ValidacionEspaciosEnBlanco(control)).toBeNull();
  });
});
