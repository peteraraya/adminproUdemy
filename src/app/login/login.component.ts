import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

// Llamando una función fuera de angular
declare function init_plugings();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  // utilizada en un [(ngModel)]
  recuerdame: boolean = false;
  // aqui tendre la info que regrese google
  auth2: any;


  constructor(
    public router: Router,
    // inyección de servicio
    public _usuarioService: UsuarioService

  ) { }
  // Hago la llamada de la función al comienzo
  ngOnInit() {
    init_plugings();
    // Siempre tengo dato en email
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    // Que se queden el boton de recuerdame (chek persista)
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '686130362720-i88e6dojb1ov11smff73vf0nch9rm2ls.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'))
    });
  };


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      //Obtener token
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        // .subscribe(corecto => this.router.navigate(['/dashboard']));
        .subscribe(() => window.location.href = '#/dashboard');
      //console.log(resp);


    })
  }


  // Función ingresar para hacer uso del router
  // verificar que no halla required
  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(corecto => this.router.navigate(['/dashboard'])); // Reenvio al dashboard


    // console.log(forma.valid);
    // console.log(forma.value);
    // console.log('Ingresando');

    // this.router.navigate(['/dashboard']);
  }
}
