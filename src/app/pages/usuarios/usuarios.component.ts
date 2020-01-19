import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // arreglo de usuarios
  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros : number = 0;

  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { 
  
  }

  ngOnInit() {
    this.cargarUsuarios();
    // Subscribir a cualquier emisión que esto haga 
    this.modalUploadService.notificacion
        .subscribe( resp => {
          this.cargarUsuarios()
        });
  }

  mostrarModal( id: string){
    this.modalUploadService.mostrarModal('usuarios',id);  // llamo al modal
  }


  cargarUsuarios(){
    // Empieza a cargar
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp:any) =>{
        // // console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      })
  }

  cambiarDesde( valor:number){

    // que numero quiere moverse el usuario
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if(desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino : string){


    // Validación
    if ( termino.length <= 0) {
       this.cargarUsuarios();
       return;
    }


    // // console.log( termino );
    this._usuarioService.buscarUsuarios( termino )
      .subscribe((usuarios:Usuario[]) => {
        // console.log( usuarios );
        this.usuarios = usuarios;
      })
  }

  borrarUsuario( usuario:Usuario){
    // console.log( usuario);

    // Validación de no borrarse a asi mismo
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario', 'No puede borrarse a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Estas Seguro?',
      text:'Estas a punto de boorar a '+ usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancelar!',
      confirmButtonText: 'Si, quiero borrarlo!'
    })
    .then ( borrar => {
      // console.log( borrar );
      if (borrar){
          this._usuarioService.borrarUsuario ( usuario._id )
                              .subscribe( borrado=>{
                                // console.log( borrado );
                                this.cargarUsuarios();
                              })
      }
    })
    // Pregunta

  }

  guardarUsuario(usuario:Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }




}
