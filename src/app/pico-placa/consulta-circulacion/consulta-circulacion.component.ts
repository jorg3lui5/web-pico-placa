import { VerificaCirculacionRequestDTO } from './../../modelo/dto/verifica-circulacion-request-dto';
import { PlacaNoCirculaService } from './../../servicios/placa-no-circula.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Mensajes } from 'src/app/compartido/constantes/mensajes';
import { ClaseMensajeSnackbarPipe } from 'src/app/compartido/pipes/clase-mensaje-snackbar.pipe';
import { ErrorValidacionCampoPipe } from 'src/app/compartido/pipes/error-validacion-campo.pipe';
import { ValidacionesService } from 'src/app/compartido/servicios/validaciones.service';
import { DatePipe } from '@angular/common';
import { Constantes } from 'src/app/compartido/constantes/constantes';
import { TipoMensajeErrorEnum } from 'src/app/modelo/enums/tipo-mensaje-error-enum';
import { VerificaCirculacionResponseDTO } from '../../modelo/dto/verifica-circulacion-response-dto';
import { MensajeConfirmacionDTO } from 'src/app/modelo/dto/mensaje-confirmacion-dto';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from 'src/app/compartido/componentes/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-consulta-circulacion',
  templateUrl: './consulta-circulacion.component.html',
  styleUrls: ['./consulta-circulacion.component.scss']
})
export class ConsultaCirculacionComponent extends Mensajes implements OnInit {

  errorValidacionCampoPipe: ErrorValidacionCampoPipe = new ErrorValidacionCampoPipe();
  claseMensajeSnackbarPipe: ClaseMensajeSnackbarPipe = new ClaseMensajeSnackbarPipe();
  datePipe: DatePipe = new DatePipe(Constantes.locale);


  formGroup: FormGroup = this.formBuilder.group({
    placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), this._validacionesService.ValidacionEspaciosEnBlanco]],
    fechaHora: ['', [Validators.required, this._validacionesService.ValidacionFechaHoraMayorALaActual]],
  })

  @BlockUI() bloqueoPantalla: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private _placaNoCirculaService: PlacaNoCirculaService,
    private _snackBar: MatSnackBar,
    private _validacionesService: ValidacionesService,
    public dialog: MatDialog

  ) {
    super();
  }

  ngOnInit(): void {

  }

  get placa() {
    return this.formGroup.get('placa');
  }
  get fechaHora() {
    return this.formGroup.get('fechaHora');
  }

  clickConsultar(): void {
    console.log('sss',this.formGroup);
    if(this.formGroup.valid){
      const verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO = {
        placa: this.formGroup.value.placa,
        fechaHora: this.datePipe.transform(new Date(this.formGroup.value.fechaHora),Constantes.formatoFechaEnviarDTO)!
      }
      
      this.verificarCirculacion(verificaCirculacionRequestDTO);
    }
    else{
      this.mostrarMensaje(this._losValoresIngresadosNoSonValidos,TipoMensajeErrorEnum.ERROR)
    }
  }

  verificarCirculacion(verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO){
    this.bloqueoPantalla.start();
    this._placaNoCirculaService.verificarCirculacion(verificaCirculacionRequestDTO).subscribe({
      next:(result) => {
        this.bloqueoPantalla.reset();
        this.mostrarMensajeConfirmacion(result);

      },
      error:(error)=>{
        console.log(error);
        this.bloqueoPantalla.reset();
        if(error?.error?.message){
          this.mostrarMensaje(error.error.message,TipoMensajeErrorEnum.ERROR)
        }
        else {
          this.mostrarMensaje(error.message,TipoMensajeErrorEnum.ERROR)
        }
      }
    })
  }

  mostrarMensajeConfirmacion(verificaCirculacionResponseDTO: VerificaCirculacionResponseDTO): void {
    const mensajeConfirmacionDTO: MensajeConfirmacionDTO = new MensajeConfirmacionDTO();
    mensajeConfirmacionDTO.titulo=this._circulacionVehicular;
    mensajeConfirmacionDTO.mensaje=verificaCirculacionResponseDTO.mensaje;
    mensajeConfirmacionDTO.esError=!verificaCirculacionResponseDTO.permiteCircular;
    mensajeConfirmacionDTO.datos = [
      {clave: this._id, valor: String(verificaCirculacionResponseDTO.autoResponseDTO.id)},
      {clave: this._placa, valor: verificaCirculacionResponseDTO.autoResponseDTO.placa},
      {clave: this._color, valor: verificaCirculacionResponseDTO.autoResponseDTO.color},
      {clave: this._modelo, valor: verificaCirculacionResponseDTO.autoResponseDTO.modelo},
      {clave: this._chasis, valor: verificaCirculacionResponseDTO.autoResponseDTO.chasis},
      {clave: this._otraInformacion, valor: verificaCirculacionResponseDTO.autoResponseDTO.otraInformacion}
    ]
    mensajeConfirmacionDTO.nombreBotonOk=this._cerrar;

    this.dialog.open(MensajeConfirmacionComponent, {
      width: Constantes.dialog_width_40,
      data: mensajeConfirmacionDTO,
    });
  }
  
  esCampoInvalido(campo: string) {
    return (this.formGroup.controls[campo].errors);
  }

  mostrarMensajeError(nombreControl: string, campoValida: string, campoCompara?: string){
    return this.errorValidacionCampoPipe.transform(this.formGroup.controls[nombreControl].errors!, campoValida, campoCompara);
  }

  mostrarMensaje(mensaje: string, tipoMensajeError: string){
    const claseMensajeSnackBar = this.claseMensajeSnackbarPipe.transform(tipoMensajeError);
    this._snackBar.open(mensaje, undefined, {
      panelClass: [claseMensajeSnackBar]
    })
  }

}

