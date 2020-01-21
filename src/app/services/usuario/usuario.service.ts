import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError  } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';

import { throwError } from 'rxjs';

@Injectable()
export class UsuarioService {


  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    // Inyectar peticiones http
    public http: HttpClient,
    public router: Router,
    public _subirArchivosService: SubirArchivoService

  ) {

    //console.log('servicio listo para usarse');
    this.cargarStorage();
  }


  estaLogeado() {
    // existe token esta logeado , sino tiene token no esta logeado

    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    // localStorage.clear();  // borra todo el localstorage

    //borra datos espesificos del localstorage

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }



  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    // petición post
    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        // console.log(resp)
        return true;
      }));

  }


  login(usuario: Usuario, recordar: boolean = false) {

    // Función checkbox recuerdame
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
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
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;

        }),
        catchError(err => {
          // console.log( err.status);
          console.log(err.error.mensaje)
          Swal.fire('Error al ingresar', err.error.mensaje, 'error');
          return throwError(err);
        })
      )
  }

  crearUsuario(usuario: Usuario) {
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
        }),
         catchError(err => {
           // console.log( err.status);
           console.log(err.error.mensaje)
           Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
           return throwError(err);
         })
        );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    //console.log(url);
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {

          //this.usuario = resp.usuario;
          // usuario respuesta es igual a usuario logeado
          if (usuario._id === this.usuario._id) {
            let usuariodB: Usuario = resp.usuario;
            this.guardarStorage(usuariodB._id, this.token, usuariodB, this.menu);
          }

          Swal.fire('Usuario actualizado', usuario.nombre, 'success');
          return true;
        }),
        catchError(err => {
          // console.log( err.status);
          console.log(err.error.mensaje)
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        })
      );
  }



  cambiarImagen(archivo: File, id: string) {

    this._subirArchivosService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        //console.log( resp );
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        // Guardar storage
        this.guardarStorage(id, this.token, this.usuario, this.menu);


      })
      .catch(resp => {
        //console.log( resp );
      });
  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }


  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    console.log(termino);
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.usuarios)
      );
  }


  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire('Usuario borrado', ' El usuario ha sido eliminado correctamente', 'success');

        return true;
      }));
  }
}
