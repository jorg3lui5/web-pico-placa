import { ValidacionesService } from './../../compartido/servicios/validaciones.service';
import { Component, OnInit } from '@angular/core';
import { Mensajes } from 'src/app/compartido/constantes/mensajes';
import { ClaseMensajeSnackbarPipe } from 'src/app/compartido/pipes/clase-mensaje-snackbar.pipe';
import { ErrorValidacionCampoPipe } from 'src/app/compartido/pipes/error-validacion-campo.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AutoService } from '../../servicios/auto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoRequestDTO } from '../../modelo/dto/auto-request-dto';
import { TipoMensajeErrorEnum } from 'src/app/modelo/enums/tipo-mensaje-error-enum';

@Component({
  selector: 'app-ingreso-auto',
  templateUrl: './ingreso-auto.component.html',
  styleUrls: ['./ingreso-auto.component.scss']
})
export class IngresoAutoComponent extends Mensajes implements OnInit {

  errorValidacionCampoPipe: ErrorValidacionCampoPipe = new ErrorValidacionCampoPipe();
  claseMensajeSnackbarPipe: ClaseMensajeSnackbarPipe = new ClaseMensajeSnackbarPipe();

  formGroup: FormGroup = this.formBuilder.group({
    placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7), this._validacionesService.ValidacionEspaciosEnBlanco]],
    color: ['', [Validators.required, Validators.maxLength(20), this._validacionesService.ValidacionEspaciosEnBlanco]],
    modelo: ['', [Validators.required, Validators.maxLength(40), this._validacionesService.ValidacionEspaciosEnBlanco]],
    chasis: ['', [Validators.required, Validators.maxLength(20), this._validacionesService.ValidacionEspaciosEnBlanco]],
    otraInformacion: ['', [Validators.maxLength(100)]],
  })

  @BlockUI() bloqueoPantalla: NgBlockUI;

  constructor(
    private formBuilder: FormBuilder,
    private _autoService: AutoService,
    private _snackBar: MatSnackBar,
    private _validacionesService: ValidacionesService,

  ) {
    super();
  }

  ngOnInit(): void {

  }

  get placa() {
    return this.formGroup.get('placa');
  }
  get color() {
    return this.formGroup.get('color');
  }
  get modelo() {
    return this.formGroup.get('modelo');
  }
  get chasis() {
    return this.formGroup.get('chasis');
  }
  get otraInformacion() {
    return this.formGroup.get('otraInformacion');
  }

  clickGuardar() {
    if(this.formGroup.valid){
      const autoRequestDTO: AutoRequestDTO = {
        ...this.formGroup.value
      }
      
      this.registrar(autoRequestDTO);
    }
    else{
      this.mostrarMensaje(this._losValoresIngresadosNoSonValidos,TipoMensajeErrorEnum.ERROR)
    }
  }

  registrar(autoRequestDTO: AutoRequestDTO){
    this.bloqueoPantalla.start();
    this._autoService.registrar(autoRequestDTO).subscribe({
      next:(result) => {
        this.bloqueoPantalla.reset();
        if(result.estado=='OK'){
          this.mostrarMensaje(result.mensaje, TipoMensajeErrorEnum.INFORMACION);
        }
        else{
          this.mostrarMensaje(result.mensaje, TipoMensajeErrorEnum.ERROR);
        }
      },
      error:(error)=>{
        this.bloqueoPantalla.reset();
        this.mostrarMensaje(error.error.message,TipoMensajeErrorEnum.ERROR)
      }
    })
  }

  clickLimpiar() {
    this.formGroup.reset({
      placa: '',
      color: '',
      modelo: '',
      chasis: '',
      otraInformacion: '',
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

