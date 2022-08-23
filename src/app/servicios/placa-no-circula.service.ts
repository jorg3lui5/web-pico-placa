import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerificaCirculacionRequestDTO } from '../modelo/dto/verifica-circulacion-request-dto';
import { VerificaCirculacionResponseDTO } from '../modelo/dto/verifica-circulacion-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PlacaNoCirculaService {
  urlBase: string = environment.picoPlacaBackend;
  servicio: string = 'placa-no-circula';
  url: string = this.urlBase+this.servicio;

  constructor(private http: HttpClient) { }

  verificarCirculacion(verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO): Observable<VerificaCirculacionResponseDTO>{
    return this.http.post<VerificaCirculacionResponseDTO>(`${this.url}/verificarCirculacion`,verificaCirculacionRequestDTO);
  }
}