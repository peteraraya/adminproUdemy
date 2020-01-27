import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  //Obtengo token 
  constructor( 
      public _usuarioService: UsuarioService,
      public router:Router
    ){

  }

  canActivate(): Promise<boolean> | boolean {

    // console.log('Inicio de token guard');
    let token = this._usuarioService.token;

    // recuperar fecha de expiración : los string de jwt son un un string codificado en base 64
    // decodifica una cadena de datos que ha sido codificada con base 64
    let payload = JSON.parse( atob( token.split('.')[1]));

    let expirado = this.expirado ( payload.exp );

    if (expirado) {
        this.router.navigate(['/login']);
        return false;
    }

    

    console.log(payload);

    return this.verificaRenueva( payload.exp);
  }


  verificaRenueva ( fechaExp: number): Promise<boolean>{
    return new Promise( (resolve,reject) =>{

      // Traer el token a una fecha presente

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));
      // console.log( tokenExp);
      // console.log( ahora );

      //siempre actualizar el token

      if ( tokenExp.getTime() > ahora.getTime() ) {
          resolve(true); // no quiero0 renovar el token
      }else{
          // el token está proximo a vencer y debo renovarlo
          this._usuarioService.renuevaToken()
            .subscribe( ()=>{
                resolve(true);
            }, () => {
                this.router.navigate(['/login']);
               reject(false); // en caso de error saca al usuario
               
            })
      }

    
    });
  }


  expirado( fechaExp:number){
    //creamos una instancia de la hora actual del sistema

    let ahora = new Date().getTime() /1000;

    if ( fechaExp < ahora) {
       return true; // esta expirado
    }else{  
       return false; // no ha expirado
    }
  }


}
