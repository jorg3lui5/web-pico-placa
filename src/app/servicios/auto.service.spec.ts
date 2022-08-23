import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AutoRequestDTO } from '../modelo/dto/auto-request-dto';
import { of } from 'rxjs';

import { AutoService } from './auto.service';

describe('AutoService', () => {
  let service: AutoService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new AutoService(httpClientSpy);

  });

  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it( 'Prueba el servicio de registrar cuando devuelve correctamente', (done: DoneFn) => {
    const respuesta: any = null;
    
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();

    httpClientSpy.post.and.returnValue(of(respuesta));

    service.registrar(autoRequestDTO).subscribe({
      next: resp => {
        expect(resp)
          .toEqual(respuesta);
        done();
      },
      error: done.fail
    });
  });

  
});
