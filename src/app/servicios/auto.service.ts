import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutoRequestDTO } from '../modelo/dto/auto-request-dto';
import { ResponseDTO } from '../modelo/dto/response-dto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  urlBase: string = environment.picoPlacaBackend;
  servicio: string = 'auto';
  url: string = this.urlBase+this.servicio;

  constructor(private http: HttpClient) { }

  registrar(autoRequestDTO: AutoRequestDTO): Observable<ResponseDTO>{
    return this.http.post<ResponseDTO>(`${this.url}`,autoRequestDTO);
  }
}