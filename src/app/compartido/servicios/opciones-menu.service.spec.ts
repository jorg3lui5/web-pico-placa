import { OpcionMenu } from './../clases/opcion-menu';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { OpcionesMenuService } from './opciones-menu.service';

describe('OpcionesMenuService', () => {
  let service: OpcionesMenuService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new OpcionesMenuService(httpClientSpy);

  });

  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it( 'Prueba el servicio getOpcionesMenu cuando devuelve correctamente', (done: DoneFn) => {
    const respuesta: OpcionMenu[] = [
      {
        icono: "log-out-outline",
        nombre: "Registro de Clientes",
        url: "/clientes/registro",
        opciones: []
      }
    ]

    httpClientSpy.get.and.returnValue(of(respuesta));

    service.getOpcionesMenu().subscribe({
      next: resp => {
        expect(resp)
          .toEqual(respuesta);
        done();
      },
      error: done.fail
    });
  });
});
