import { ClaveValorDTO } from './clave-valor-dto';

export class MensajeConfirmacionDTO {
    titulo: string;
    mensaje: string;
    esError: boolean;
    datos: ClaveValorDTO[] = [];
    nombreBotonOk: string = '';
    nombreBotonCancelar: string = '';
}