import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  //variables globales
  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor(
    private _usuarioService : UsuarioService
  ) { 

    //Inicializar mi usuario
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario){
      console.log(this.usuario);

      this.usuario.nombre = usuario.nombre;
      // Si no es un usuario de google permitirá actualizar correo
      if ( !this.usuario.google ) {
        this.usuario.email = usuario.email;
      }
    

    this._usuarioService.actualizarUsuario( this.usuario)
            .subscribe( resp=> {
              console.log(resp);
            });

  }

  seleccionImagen(archivo: File){
    if (!archivo ){
      this.imagenSubir = null;
      return;
    }

    // Validación

    if( archivo.type.indexOf('image')< 0){
      Swal.fire('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }

    // console.log(archivo)
    this.imagenSubir = archivo;
    console.log(archivo);

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }


  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }
}
