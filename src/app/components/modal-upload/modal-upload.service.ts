import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto'; // modal oculto por defecto
  // Escucha
  public notificacion = new EventEmitter<any>();


  constructor() {
    //console.log('Modal upload listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    // Limpia para evitar errores
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
