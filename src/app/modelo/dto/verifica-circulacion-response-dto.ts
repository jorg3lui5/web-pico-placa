import { AutoResponseDTO } from './auto-response-dto';

export class VerificaCirculacionResponseDTO {
    mensaje: string;
    permiteCircular: boolean;
    autoResponseDTO: AutoResponseDTO;
}