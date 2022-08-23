import { OpcionMenu } from './../clases/opcion-menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionesMenuService {
  
  constructor(
    private http: HttpClient,
    
  ) { }

  getOpcionesMenu(): Observable<OpcionMenu[]> {
    return this.http.get<OpcionMenu[]>('/assets/datos/opciones-menu.json');
  }
}
