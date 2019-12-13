import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Proveeidos todos los servicios
import { 
  SettingsService,
  SidebarService,
  SharedService
 } from './service.index';
// Servicio para agrupar servicios y no recargar el app.module

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SettingsService,
    SidebarService,
    SharedService
  ]
})
export class ServiceModule { }
