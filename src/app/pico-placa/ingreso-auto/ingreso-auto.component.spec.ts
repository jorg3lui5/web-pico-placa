import { AutoRequestDTO } from './../../modelo/dto/auto-request-dto';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Mensajes } from 'src/app/compartido/constantes/mensajes';
import { ValidacionesService } from 'src/app/compartido/servicios/validaciones.service';
import { AutoService } from 'src/app/servicios/auto.service';

import { IngresoAutoComponent } from './ingreso-auto.component';
import { EMPTY, of, throwError } from 'rxjs';
import { TipoMensajeErrorEnum } from 'src/app/modelo/enums/tipo-mensaje-error-enum';
import { ResponseDTO } from 'src/app/modelo/dto/response-dto';

describe('IngresoAutoComponent', () => {
  let component: IngresoAutoComponent;
  let fixture: ComponentFixture<IngresoAutoComponent>;
  let _autoService: AutoService;
  let _validacionesService: ValidacionesService;
  const mensajes: Mensajes = new Mensajes();
  let matSnackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        IngresoAutoComponent,
      ],
      providers: [
        ValidacionesService,
        AutoService,
        {
          provide: MatSnackBar, useValue: {open: () => {}}
        }
      ],
      imports: [ 
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoAutoComponent);
    component = fixture.componentInstance;
    _autoService = TestBed.inject(AutoService);
    _validacionesService = TestBed.inject(ValidacionesService);

    matSnackbar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('Prueba la creación del componente', () => {
    expect(component).toBeTruthy();
    expect(component.placa).not.toBeNull();
    expect(component.color).not.toBeNull();
    expect(component.modelo).not.toBeNull();
    expect(component.chasis).not.toBeNull();
    expect(component.otraInformacion).not.toBeNull();

  });

  it('Prueba el método clickGuardar cuando el formulario es válido', () => {
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();
    autoRequestDTO.chasis='1111';
    autoRequestDTO.color ='Rojo';
    autoRequestDTO.modelo = 'Modelo';
    autoRequestDTO.placa = 'ABD1234';
    autoRequestDTO.otraInformacion = '';
  
    component.formGroup.setValue(autoRequestDTO);

    const espia =spyOn( component, 'registrar' );
    
    component.clickGuardar();


    expect(espia).toHaveBeenCalled();
  });

  it('Prueba el método clickGuardar cuando el formulario NO es válido', () => {
    const espia =spyOn( component, 'mostrarMensaje' );
    component.clickGuardar();
    expect(espia).toHaveBeenCalledWith(mensajes._losValoresIngresadosNoSonValidos,TipoMensajeErrorEnum.ERROR);

  });

  it('Prueba el método registrar cuando el registro es OK', () => {
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();

    const respuesta: ResponseDTO = new ResponseDTO();
    respuesta.estado='OK';
    respuesta.mensaje='Registrado';


    spyOn( _autoService, 'registrar' )
          .and.returnValue(of( respuesta )   );

    const espia =spyOn( component, 'mostrarMensaje' );
    
    component.registrar(autoRequestDTO);
    expect(espia).toHaveBeenCalledWith(respuesta.mensaje,TipoMensajeErrorEnum.INFORMACION);

  });

  it('Prueba el método registrar cuando el registro NO es OK', () => {
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();

    const respuesta: ResponseDTO = new ResponseDTO();
    respuesta.estado='ERROR';
    respuesta.mensaje='No Registrado';


    spyOn( _autoService, 'registrar' )
          .and.returnValue(of( respuesta )   );    

    const espia =spyOn( component, 'mostrarMensaje' );
    component.registrar(autoRequestDTO);
    expect(espia).toHaveBeenCalledWith(respuesta.mensaje,TipoMensajeErrorEnum.ERROR);

  });

  it('Prueba el método registrar cuando el registro devuelve error', () => {
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();

    const miError = {error: {message: 'error en el servidor'}};
    const espia =spyOn( component, 'mostrarMensaje' );

    spyOn( _autoService, 'registrar' ).and
            .returnValue( throwError( miError ) );

    component.registrar(autoRequestDTO);

    expect(espia).toHaveBeenCalledWith(miError.error.message,TipoMensajeErrorEnum.ERROR);

  });

  it('Prueba el método clickLimpiar', () => {
    const autoRequestDTO: AutoRequestDTO = new AutoRequestDTO();
    autoRequestDTO.chasis='1111';
    autoRequestDTO.color ='Rojo';
    autoRequestDTO.modelo = 'Modelo';
    autoRequestDTO.placa = 'ABD1234';
    autoRequestDTO.otraInformacion = '';
  
    component.formGroup.setValue(autoRequestDTO);

    component.clickLimpiar();

    expect(component.formGroup.value.placa).toEqual('');

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
