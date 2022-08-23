import { AutoResponseDTO } from './../../modelo/dto/auto-response-dto';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Mensajes } from 'src/app/compartido/constantes/mensajes';
import { ValidacionesService } from 'src/app/compartido/servicios/validaciones.service';
import { PlacaNoCirculaService } from 'src/app/servicios/placa-no-circula.service';
import { EMPTY, of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import localEsEC from '@angular/common/locales/es-EC';

import { ConsultaCirculacionComponent } from './consulta-circulacion.component';
import { TipoMensajeErrorEnum } from 'src/app/modelo/enums/tipo-mensaje-error-enum';
import { VerificaCirculacionRequestDTO } from 'src/app/modelo/dto/verifica-circulacion-request-dto';
import { VerificaCirculacionResponseDTO } from 'src/app/modelo/dto/verifica-circulacion-response-dto';
import { AutoRequestDTO } from 'src/app/modelo/dto/auto-request-dto';
import { MensajeConfirmacionComponent } from 'src/app/compartido/componentes/mensaje-confirmacion/mensaje-confirmacion.component';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEsEC);
describe('ConsultaCirculacionComponent', () => {
  let component: ConsultaCirculacionComponent;
  let fixture: ComponentFixture<ConsultaCirculacionComponent>;
  let _placaNoCirculaService: PlacaNoCirculaService;
  let _validacionesService: ValidacionesService;
  const mensajes: Mensajes = new Mensajes();
  let matSnackbar: MatSnackBar;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ConsultaCirculacionComponent,
      ],
      providers: [
        ValidacionesService,
        PlacaNoCirculaService,
        {
          provide: MatSnackBar, useValue: {open: () => {}}
        },
        { 
          provide: MatDialog, useValue: { open: () => of(true), afterClosed : of(true) } 
        },
      ],
      imports: [ 
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCirculacionComponent);
    component = fixture.componentInstance;
    _placaNoCirculaService = TestBed.inject(PlacaNoCirculaService);
    _validacionesService = TestBed.inject(ValidacionesService);

    matSnackbar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('Prueba la creación del componente', () => {
    expect(component).toBeTruthy();
    expect(component.placa).not.toBeNull();
    expect(component.fechaHora).not.toBeNull();

  });

  it('Prueba el método clickConsultar cuando el formulario es válido pero la fecha es menor a la actual', () => {

    const formGrup = {
      placa: 'ABD1234',
      fechaHora: '2022-08-18T00:09'
    }
  
    component.formGroup.setValue(formGrup);

    const respuestaValidacion = null;
    spyOn( _validacionesService, 'ValidacionFechaHoraMayorALaActual' ).and
            .returnValue( respuestaValidacion );
    
    component.clickConsultar();

    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Prueba el método clickConsultar cuando el formulario es válido', () => {
    
    const formGrup = {
      placa: 'ABD1234',
      fechaHora: '2023-08-18T00:09'
    }
  
    component.formGroup.setValue(formGrup);

    const respuestaValidacion = null;
    spyOn( _validacionesService, 'ValidacionFechaHoraMayorALaActual' ).and
            .returnValue( respuestaValidacion );
    const espia =spyOn( component, 'verificarCirculacion' );
    
    component.clickConsultar();

    expect(espia).toHaveBeenCalled();
  });

  it('Prueba el método clickConsultar cuando el formulario NO es válido', () => {
    const espia =spyOn( component, 'mostrarMensaje' );
    component.clickConsultar();
    expect(espia).toHaveBeenCalledWith(mensajes._losValoresIngresadosNoSonValidos,TipoMensajeErrorEnum.ERROR);

  });

  it('Prueba el método registrar cuando el registro es OK', () => {
    const verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO = new VerificaCirculacionRequestDTO();

    const autoResponseDTO: AutoResponseDTO = new AutoResponseDTO();
    autoResponseDTO.chasis='1111';
    autoResponseDTO.color ='Rojo';
    autoResponseDTO.modelo = 'Modelo';
    autoResponseDTO.placa = 'ABD1234';
    autoResponseDTO.otraInformacion = '';

    const respuesta: VerificaCirculacionResponseDTO = new VerificaCirculacionResponseDTO();
    respuesta.mensaje='Libre de circular';
    respuesta.permiteCircular=true;
    respuesta.autoResponseDTO=autoResponseDTO;


    spyOn( _placaNoCirculaService, 'verificarCirculacion' )
          .and.returnValue(of( respuesta )   );

    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof MensajeConfirmacionComponent>);

    component.verificarCirculacion(verificaCirculacionRequestDTO);
    expect(dialog.open).toHaveBeenCalled();

  });

  it('Prueba el método registrar cuando el registro devuelve error', () => {
    const verificaCirculacionRequestDTO: VerificaCirculacionRequestDTO = new VerificaCirculacionRequestDTO();

    const miError = {error: {message: 'error en el servidor'}};
    const espia =spyOn( component, 'mostrarMensaje' );

    spyOn( _placaNoCirculaService, 'verificarCirculacion' ).and
            .returnValue( throwError( miError ) );

    component.verificarCirculacion(verificaCirculacionRequestDTO);

    expect(espia).toHaveBeenCalledWith(miError.error.message,TipoMensajeErrorEnum.ERROR);

  });


  it('Prueba el método mostrarMensaje', () => {
    const espia =spyOn(matSnackbar, 'open' );
    const claseMensajeSnackBar = "mensaje-snackbar-advertencia";
    component.mostrarMensaje('mensaje', TipoMensajeErrorEnum.ADVERTENCIA)    
    expect(espia).toHaveBeenCalledWith('mensaje', undefined, {
      panelClass: [claseMensajeSnackBar]
    });
  });

});