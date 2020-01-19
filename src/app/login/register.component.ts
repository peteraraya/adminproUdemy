import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

// Llamando una función fuera de angular
declare function init_plugings();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {


  forma: FormGroup;


  sonIguales(campo1: string, campo2: string) {
    // Si la condicion que voy a retornar no se cumple retorno un error
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value; // tengo contraseña 1
      let pass2 = group.controls[campo2].value; // tengo contraseña 2

      // si la condicion se hace regrese un null
      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    }
  }

  constructor(
    public _usuarioService: UsuarioService,
    // Para navegar entre paginas
    public router: Router
  ) { }

  ngOnInit() {
    init_plugings();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    },
      { validators: this.sonIguales('password', 'password2') });



    // enviando data
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: 'asdf1234',
      password2: 'asdf1234',
      condiciones: true
    })
  }

  registrarUsuario() {
    // Si la forma es valida

    if (this.forma.invalid) {
      return;
    }


    if (!this.forma.value.condiciones) {
      //console.log('Debe de acepptar las condiciones');
      Swal.fire({
        icon: 'warning',
        title: 'Importante',
        text: 'Debe de aceptar las condiciones'
      });
    }

    // Obejeto del usuario
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    // Llamamos al servicio
    this._usuarioService.crearUsuario(usuario)
      .subscribe((resp: any) => {
        //console.log(resp);
      },
        (err) => {
          console.log(err.error.errors.message)
          Swal.fire({
            icon: 'error',
            title: err.error.mensaje,
            text: 'Email debe ser unico'
          });

        }
      ); // redireccionará al login

    // console.log('Forma Valida ' , this.forma.valid);


    // console.log(this.forma.value);


  }

}
