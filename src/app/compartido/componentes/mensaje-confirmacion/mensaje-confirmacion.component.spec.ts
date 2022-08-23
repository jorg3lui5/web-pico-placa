import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MensajeConfirmacionDTO } from 'src/app/modelo/dto/mensaje-confirmacion-dto';

import { MensajeConfirmacionComponent } from './mensaje-confirmacion.component';

describe('MensajeConfirmacionComponent', () => {
  let component: MensajeConfirmacionComponent;
  let fixture: ComponentFixture<MensajeConfirmacionComponent>;
  let matDialogRef: MatDialogRef<MensajeConfirmacionDTO>;

  const data: MensajeConfirmacionDTO = {
    mensaje:'mensaje',
    titulo: 'titulo',
    esError: false,
    nombreBotonCancelar: 'Cancelar',
    nombreBotonOk: 'Ok',
    datos: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeConfirmacionComponent ],
      providers: [
        {
          provide: MatDialogRef, useValue: {close: () => {}}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeConfirmacionComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Prueba el método clickCancelar', () => {
    const espia =spyOn(matDialogRef, 'close' );
    component.clickCancelar();
    expect(espia).toHaveBeenCalledWith(false);
  });

  it('Prueba el método clickOk', () => {
    const espia =spyOn(matDialogRef, 'close' );
    component.clickOk();
    expect(espia).toHaveBeenCalledWith(true);
  });

});
