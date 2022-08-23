import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { ErrorValidacionCampoEnum } from '../../modelo/enums/error-validacion-campo-enum';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  ValidacionEspaciosEnBlanco(control: FormControl): ValidationErrors | null {
    const valor:string = control.value.trim();
    if(!valor) {
      return {[ErrorValidacionCampoEnum.ESPACIOS_EN_BLANCO]: true};
    }
    return null;
  }

  ValidacionFechaHoraMayorALaActual(control: FormControl): ValidationErrors | null {

    const fechaHoraIngresada:string = control.value;
    if(!fechaHoraIngresada) {
      return {[ErrorValidacionCampoEnum.REQUERIDO]: true};
    }

    const fechaActual = new Date();
    fechaActual.setSeconds(0);
    fechaActual.setMilliseconds(0);
    console.log('ingresada',new Date(fechaHoraIngresada));
    console.log('actual',fechaActual);

    if(new Date(fechaHoraIngresada)<fechaActual){
      return {[ErrorValidacionCampoEnum.FECHA_HORA_MAYOR_A_LA_ACTUAL]: true};
    }

    return null;
  }
}




