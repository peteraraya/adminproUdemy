import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  //Necesito el usuario service ya que puedo espesificar el rol

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){
    
  }

  canActivate(){

    // Puedo tener la info del usuario sin un proceso asincrono

    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
       return true; // si puede activar esa ruta
    }else{
      console.log('Bloqueado por el ADMIN GUARD');
      // this.router.navigate(['/login']);
      this._usuarioService.logout();
      return false;
    }

    return true;
  }
  
}
