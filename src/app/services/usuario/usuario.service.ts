import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {


  usuario: Usuario;
  token:string;

  constructor(
      // Inyectar peticiones http
      public http: HttpClient,
      public router: Router

  ) {

    console.log('servicio listo para usarse');
    this.cargarStorage();
  }


  estaLogeado(){
    // existe token esta logeado , sino tiene token no esta logeado

    return (this.token.length>5) ? true : false;
  }

  cargarStorage(){
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id:string, token:string, usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario)); 

    this.usuario = usuario;
    this.token = token;

  }

  logout(){
    this.usuario = null;
    this.token = '';

    // localStorage.clear();  // borra todo el localstorage

    //borra datos espesificos del localstorage

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }



  loginGoogle( token:string){

    let url = URL_SERVICIOS + '/login/google';

    // petición post
    return this.http.post (url, {token} )
      .pipe(map( (resp:any) =>{
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
      }));
    
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
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario)); // se convierte a string para guardarlo , debido a que es un objeto
        //Grabando info  
        this.guardarStorage(resp.id, resp.token, resp.usuario);
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
