import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  // referencia al dom a travez de una inyección | Importamos nuestro servicio
  constructor(
    @Inject(DOCUMENT) private document,
    public _ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(tema: string, event) {
    //console.log(event.target);

    this.aplicarCheck(event.target);
    // Cambiando color

    this._ajustes.aplicarTema(tema);
    this.colocarCheck();
  }

  aplicarCheck(link: any) {
    // Barrer todos los elementos que tengan el selector y averiguar cual coincide con el tema seleccionado
    // hacer referencias al elemento


    let selectores: any = this.document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');

  }
  // mantener icono seleccionado
  colocarCheck() {

    let selectores: any = this.document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;
    // Que elemento tendra la clase working
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');

      }

    }
  }


}
