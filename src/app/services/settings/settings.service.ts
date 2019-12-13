import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Establecer valores por defecto : en caso de no haber seleccionado un tema
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default;'
  };



  constructor(@Inject(DOCUMENT) private document) {
    // Llamada a la función
    this.cargarAjustes();
  }

  // Grabar información en el localStorage
  guardarAjustes() {
    //console.log('Guardado en el localStorage');
    // Convierte este objeto en un string para poder grabarlo en localstorage
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

  }
  cargarAjustes() {


    // si existen los ajustes
    if (localStorage.getItem('ajustes')) {
      // Convertimos el string a objeto js
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
     // console.log('cargando de localStorage');
      this.aplicarTema(this.ajustes.tema);

    } else {
      //console.log('usando valore por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  // Usamos un lugar donde cambie el tema fisicamente
  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById('tema').setAttribute('href', url);

    // utilizando el servicio
    // servicio + propiedad
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    // Grabamos esos datos en localstorage
    this.guardarAjustes();

  }
}

// restringir tema
interface Ajustes {
  temaUrl: string;
  tema: string;
}