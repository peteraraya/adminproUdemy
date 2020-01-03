import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService} from '../../services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
// Importamos el servicio sidebar
  constructor( 
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    
    ) {

    
   }





  ngOnInit() {
  }

}
