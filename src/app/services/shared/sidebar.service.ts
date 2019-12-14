import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // Arreglo de objeto para el menú
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        { subtitulo: 'Dashboard', url: '/dashboard'},
        { subtitulo: 'ProgressBar', url: '/progress' },
        { subtitulo: 'Graficas', url: '/graficas1' },
        { subtitulo: 'Promesas', url: '/promesas' },
        { subtitulo: 'Rxjs', url: '/rxjs' },
      ]
    }
  ];
  
  constructor() { }
}
