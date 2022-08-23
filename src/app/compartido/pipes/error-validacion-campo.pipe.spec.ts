import { ValidationErrors } from '@angular/forms';
import { ErrorValidacionCampoEnum } from 'src/app/modelo/enums/error-validacion-campo-enum';
import { ValidacionMax } from 'src/app/modelo/interface/validacion-max';
import { ValidacionMaxLength } from 'src/app/modelo/interface/validacion-max-length';
import { ValidacionMin } from 'src/app/modelo/interface/validacion-min';
import { ErrorValidacionCampoPipe } from './error-validacion-campo.pipe';
import { ValidacionMinLength } from '../../modelo/interface/validacion-min-length';

describe('ErrorValidacionCampoPipe', () => {
  const pipe: ErrorValidacionCampoPipe = new ErrorValidacionCampoPipe();
  let errors: ValidationErrors;
  const campoValida: string='campo prueba';
  it('Prueba la instancia creada', () => {
    expect(pipe).toBeTruthy();
  });

  it('Prueba el mensaje de error devuelto de tipo EMAIL', () => {
    errors = {email: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: debe tener un email válido');
  });

  it('Prueba el mensaje de error devuelto de tipo MAX', () => {
    const validacionMax: ValidacionMax = {
      actual:12,
      max: 10
    }
    errors = {max: validacionMax};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: debe ingresar un número menor a 10');
  });

  it('Prueba el mensaje de error devuelto de tipo MAX_LENGTH', () => {
    const validacionMaxLength: ValidacionMaxLength = {
      actualLength: 12,
      requiredLength: 10
    }
    errors = {maxlength: validacionMaxLength};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: debe tener máximo 10 caracteres');
  });

  it('Prueba el mensaje de error devuelto de tipo MIN', () => {
    const validacionMin: ValidacionMin = {
      actual: 2,
      min: 5
    }
    errors = {min: validacionMin};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: debe ingresar un número mayor a 5');
  });

  it('Prueba el mensaje de error devuelto de tipo MIN_LENGTH', () => {
    const validacionMinLength: ValidacionMinLength = {
      actualLength: 2,
      requiredLength: 5
    }
    errors = {minlength: validacionMinLength};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: debe tener mínimo 5 caracteres');
  });

  it('Prueba el mensaje de error devuelto de tipo PATTERN', () => {
    errors = {pattern: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: no cumple con un valor válido');
  });

  it('Prueba el mensaje de error devuelto de tipo REQUERIDO', () => {
    errors = {required: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: es requerido');
  });

  it('Prueba el mensaje de error devuelto de tipo REQUIRED_TRUE', () => {
    errors = {requiredTrue: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: es requerido');
  });

  it('Prueba el mensaje de error devuelto de tipo ESPACIOS_EN_BLANCO', () => {
    errors = {espaciosEnBlanco: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: no debe contener solo espacios en blanco');
  });

  it('Prueba el mensaje de error devuelto de tipo FECHA_HORA_MAYOR_A_LA_ACTUAL', () => {
    errors = {fechaHoraMayorALaActual: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: la fecha y hora ingresada no debe ser anterior a la fecha y hora actual');
  });

  it('Prueba el mensaje de error devuelto por Defecto', () => {
    errors = {DEFAULT: true};
    expect(pipe.transform(errors, campoValida)).toBe('campo prueba: no cumple con las validaciones');
  });
});
