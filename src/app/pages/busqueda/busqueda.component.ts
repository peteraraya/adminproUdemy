import { Component, OnInit } from '@angular/core';
// ActivateRoute
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
// Modelos
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  // Definimos 3 arreglos para mostrar info en html

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];



  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe ( params => {
        //Obtengo el parametro definido en el router ( el termino)
        let termino = params['termino'];
        console.log(termino);
        this.buscar( termino );
      });
   }

  ngOnInit() {
  }

  buscar( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
        .subscribe( (resp:any) =>{
          console.log(resp);
          // 3 propiedades a utilizar
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;

        });
  }

}
