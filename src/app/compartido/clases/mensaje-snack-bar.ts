
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Constantes } from '../../compartido/constantes/constantes';

export class MensajeSnackBar {
    mensaje: string;
    action: string;
    config: MatSnackBarConfig = {horizontalPosition: 'end', verticalPosition: 'top', duration: Constantes.tiempo_duracion_mensaje_snack_bar};
}