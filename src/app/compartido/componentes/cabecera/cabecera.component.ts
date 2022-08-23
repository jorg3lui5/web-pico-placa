import { Mensajes } from 'src/app/compartido/constantes/mensajes';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OpcionesMenuService } from '../../servicios/opciones-menu.service';
import { OpcionMenu } from '../../clases/opcion-menu';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent extends Mensajes implements OnInit {

  lstOpcionMenu: OpcionMenu[] = [];

  sideNavModoOver = true;
  sideNavAbierto = false;

  constructor(
    public observer: BreakpointObserver, 
    private _opcionesMenuService: OpcionesMenuService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.obtenerOpcionesMenu();
  }

  configurarMenuResponsive(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sideNavAbierto = false;
        this.sideNavModoOver = true;
      } else {
        this.sideNavAbierto = true;
        this.sideNavModoOver = false;
      }
    });
  }
  
  ngAfterViewInit() {
    this.configurarMenuResponsive();
    this.cd.detectChanges();
  }

  obtenerOpcionesMenu(){
    this._opcionesMenuService.getOpcionesMenu().subscribe({
      next:(result) => {
        this.lstOpcionMenu=result;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
