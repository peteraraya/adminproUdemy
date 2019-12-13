import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Lllamando una función fuera de angular
declare function init_plugings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }
 // Hago la llamada de la función al comienzo
  ngOnInit() {
    init_plugings();
  }


  //Función ingresar para hacer uso del router
  // verificar que no halla required
  ingresar(){
    console.log('Ingresando');

    this.router.navigate(['/dashboard']);
  }
}
