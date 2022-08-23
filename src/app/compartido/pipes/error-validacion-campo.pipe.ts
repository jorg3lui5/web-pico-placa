import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidacionMinLength } from 'src/app/modelo/interface/validacion-min-length';
import { ErrorValidacionCampoEnum } from '../../modelo/enums/error-validacion-campo-enum';
import { ValidacionMax } from '../../modelo/interface/validacion-max';
import { ValidacionMaxLength } from '../../modelo/interface/validacion-max-length';
import { ValidacionMin } from '../../modelo/interface/validacion-min';

@Pipe({
  name: 'errorValidacionCampo'
})
export class ErrorValidacionCampoPipe implements PipeTransform {

  transform(errors: ValidationErrors, campoValida: string, campoCompara?: string): string {
    //errores Básicos
    if(errors[ErrorValidacionCampoEnum.EMAIL]) {
      return `${campoValida}: debe tener un email válido`;
    }

    if(errors[ErrorValidacionCampoEnum.MAX]) {
      const validacionMax: ValidacionMax = errors[ErrorValidacionCampoEnum.MAX];
      return `${campoValida}: debe ingresar un número menor a ${validacionMax.max}`;
    }

    if(errors[ErrorValidacionCampoEnum.MAX_LENGTH]) {
      const validacionMaxLength: ValidacionMaxLength = errors[ErrorValidacionCampoEnum.MAX_LENGTH];
      return `${campoValida}: debe tener máximo ${validacionMaxLength.requiredLength} caracteres`;
    }

    if(errors[ErrorValidacionCampoEnum.MIN]) {
      const validacionMin: ValidacionMin = errors[ErrorValidacionCampoEnum.MIN];
      return `${campoValida}: debe ingresar un número mayor a ${validacionMin.min}`;
    }

    if(errors[ErrorValidacionCampoEnum.MIN_LENGTH]) {
      const validacionMinLength: ValidacionMinLength = errors[ErrorValidacionCampoEnum.MIN_LENGTH];
      return `${campoValida}: debe tener mínimo ${validacionMinLength.requiredLength} caracteres`;
    }

    if(errors[ErrorValidacionCampoEnum.PATTERN]) {
      return `${campoValida}: no cumple con un valor válido`;
    }

    if(errors[ErrorValidacionCampoEnum.REQUERIDO]) {
      return `${campoValida}: es requerido`;
    }

    if(errors[ErrorValidacionCampoEnum.REQUIRED_TRUE]) {
      return `${campoValida}: es requerido`;
    }

    //ERRORES PERSONALIZADOS

    if(errors[ErrorValidacionCampoEnum.ESPACIOS_EN_BLANCO]) {
      return `${campoValida}: no debe contener solo espacios en blanco`;
    }

    if(errors[ErrorValidacionCampoEnum.FECHA_HORA_MAYOR_A_LA_ACTUAL]) {
      return `${campoValida}: la fecha y hora ingresada no debe ser anterior a la fecha y hora actual`;
    }

    return `${campoValida}: no cumple con las validaciones`;
  }
}
