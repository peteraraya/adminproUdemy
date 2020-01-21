import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService : UsuarioService,
    public router: Router,

  ) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
  }


  // Función buscar
  buscar(termino:string){
    // Redireccionar a la pantalla del buscador para ello necesitamos el Router

    this.router.navigate(['/busqueda',termino]);

  }
}
