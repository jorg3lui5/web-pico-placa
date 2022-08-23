import { Mensajes } from './../../constantes/mensajes';
import { Component, Inject, OnInit } from '@angular/core';
import { MensajeConfirmacionDTO } from '../../../modelo/dto/mensaje-confirmacion-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.scss']
})
export class MensajeConfirmacionComponent extends Mensajes implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public mensajeConfirmacionDTO: MensajeConfirmacionDTO,
    public dialogRef: MatDialogRef<MensajeConfirmacionComponent>
  ) {
    super();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {    
    if(!this.mensajeConfirmacionDTO.nombreBotonOk) {
      this.mensajeConfirmacionDTO.nombreBotonOk=this._aceptar;
    }
  }

  clickCancelar(){
    this.dialogRef.close(false);
  }

  clickOk(){
    this.dialogRef.close(true);
  }

}
