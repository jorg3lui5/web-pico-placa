import { ClaseMensajeSnackbarPipe } from './clase-mensaje-snackbar.pipe';
import { TipoMensajeErrorEnum } from '../../modelo/enums/tipo-mensaje-error-enum';

describe('ClaseMensajeSnackbarPipe', () => {
  const pipe: ClaseMensajeSnackbarPipe = new ClaseMensajeSnackbarPipe();

  it('Prueba la instancia creada', () => {
    expect(pipe).toBeTruthy();
  });

  it('Prueba conversión de TipoMensajeErrorEnum.ADVERTENCIA a "mensaje-snackbar-advertencia"', () => {
    expect(pipe.transform(TipoMensajeErrorEnum.ADVERTENCIA)).toBe('mensaje-snackbar-advertencia');
  });

  it('Prueba conversión de TipoMensajeErrorEnum.ERROR a "mensaje-snackbar-error"', () => {
    expect(pipe.transform(TipoMensajeErrorEnum.ERROR)).toBe('mensaje-snackbar-error');
  });

  it('Prueba conversión de TipoMensajeErrorEnum.INFORMACION a "mensaje-snackbar-informacion"', () => {
    expect(pipe.transform(TipoMensajeErrorEnum.INFORMACION)).toBe('mensaje-snackbar-informacion');
  });

  it('Prueba conversión por defecto', () => {
    expect(pipe.transform('DEFAULT')).toBe('mensaje-snackbar-error');
  });
});

