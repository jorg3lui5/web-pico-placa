import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesMenuService } from '../../servicios/opciones-menu.service';
import { CabeceraComponent } from './cabecera.component';
import { OpcionMenu } from '../../clases/opcion-menu';
import { of, throwError } from 'rxjs';
import { BreakpointObserver} from '@angular/cdk/layout';


describe('CabeceraComponent', () => {
  let component: CabeceraComponent;
  let fixture: ComponentFixture<CabeceraComponent>;
  let _opcionesMenuService: OpcionesMenuService;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraComponent],
      providers: [ 
        OpcionesMenuService,
        BreakpointObserver
      ],
      imports: [ 
        HttpClientModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraComponent);
    component = fixture.componentInstance;
    _opcionesMenuService = TestBed.inject(OpcionesMenuService);
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture.detectChanges();
  });

  it('Prueba la creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it( 'Prueba el método obtenerOpcionesMenu cuando devuelve el menú', () => { 
    const lstOpcionesMenu: OpcionMenu[] = [
      {
        icono: "log-out-outline",
        nombre: "Registro de Clientes",
        url: "/clientes/registro",
        opciones: []
      }
    ]
    spyOn( _opcionesMenuService, 'getOpcionesMenu' )
    .and.returnValue(of( lstOpcionesMenu )   );
    component.obtenerOpcionesMenu();
    expect(component.lstOpcionMenu.length).toBeGreaterThanOrEqual(1);
    
  });

  it( 'Prueba el método obtenerOpcionesMenu cuando da error', () => { 
    const miError = 'Error al listar';

    spyOn( _opcionesMenuService, 'getOpcionesMenu' ).and
            .returnValue( throwError( miError ) );

    component.obtenerOpcionesMenu()

    expect(component.lstOpcionMenu).toEqual([]);
  });

  it( 'Prueba el método configurarMenuResponsive cuando el ancho de la ventana es menor a 800px',  () => {

    const respuesta: any = {
      matches: true
    }

    spyOn( breakpointObserver, 'observe' )
          .and.returnValue(of( respuesta )   );
    component.configurarMenuResponsive();
    expect( component.sideNavAbierto).toBeFalsy();

  });

  it( 'Prueba el servicio de observable responsive cuando es mayor a 880px',  () => {

    const respuesta: any = {
      matches: false
    }

    spyOn( breakpointObserver, 'observe' )
          .and.returnValue(of( respuesta )   );
    component.configurarMenuResponsive();
    expect( component.sideNavAbierto).toBeTruthy();

  });
  
  
});
