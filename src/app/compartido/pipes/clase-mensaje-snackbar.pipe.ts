import { Pipe, PipeTransform } from '@angular/core';
import { TipoMensajeErrorEnum } from '../../modelo/enums/tipo-mensaje-error-enum';

@Pipe({
  name: 'claseMensajeSnackbar'
})
export class ClaseMensajeSnackbarPipe implements PipeTransform {

  transform(tipoMensajeError: string): string {
    switch (tipoMensajeError) {
      case TipoMensajeErrorEnum.ADVERTENCIA:
        return 'mensaje-snackbar-advertencia';
      case TipoMensajeErrorEnum.ERROR:
        return 'mensaje-snackbar-error';
      case TipoMensajeErrorEnum.INFORMACION:
        return 'mensaje-snackbar-informacion';
      default:
        return 'mensaje-snackbar-error';
    }
  }

}
