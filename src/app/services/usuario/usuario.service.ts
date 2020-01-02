import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

  constructor(
      // Inyectar peticiones http
      public http: HttpClient

  ) {

    console.log('servicio listo para usarse');
  }


  login( usuario: Usuario, recordar:boolean = false){


    // Función checkbox recuerdame
    if (recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }


      let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        // Guardando en info del usuario en localStorage
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario)); // se convierte a string para guardarlo , debido a que es un objeto
        //Grabando info  
        return true;
     
      }));


  }




  crearUsuario( usuario: Usuario ){
      let url = URL_SERVICIOS + '/usuario';

    // Regresaré un observador
    // tslint:disable-next-line: align
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Creado',
            text: 'Usuario Creado con exito'
          });
          return resp.usuario;
        }));
  }
}
