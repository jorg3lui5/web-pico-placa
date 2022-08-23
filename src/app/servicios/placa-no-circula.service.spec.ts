import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VerificaCirculacionRequestDTO } from '../modelo/dto/verifica-circulacion-request-dto';

import { PlacaNoCirculaService } from './placa-no-circula.service';

describe('PlacaNoCirculaService', () => {
  let service: PlacaNoCirculaService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new PlacaNoCirculaService(httpClientSpy);

  });

  it('Prueba de creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it( 'Prueba el servicio de registrar cuando devuelve correctamente', (done: DoneFn) => {
    const respuesta: any = null;
    
    const verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO = new VerificaCirculacionRequestDTO();

    httpClientSpy.post.and.returnValue(of(respuesta));

    service.verificarCirculacion(verificaCirculacionRequestDTO).subscribe({
      next: resp => {
        expect(resp)
          .toEqual(respuesta);
        done();
      },
      error: done.fail
    });
  });

  
});
