import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivos/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';

  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor(
    public _subirArhivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    // console.log ('Modal Listo');
  }

  ngOnInit() {
  }


  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // Validación

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }

    // console.log(archivo)
    this.imagenSubir = archivo;
    // console.log(archivo);

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {

    // está función regresa una promesa
    this._subirArhivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        // console.log(resp);
        // Emitir un mensaje a todo el mundo que ya se subio la imagen
        this._modalUploadService.notificacion.emit(resp); // viene lo que emitamos en este servicio
        // se oculta
        // this._modalUploadService.ocultarModal();
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga');
      });

  }


}
