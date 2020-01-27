import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
// Rutas
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        //Lazyload
        path:'',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        // string de dos partes : path al modulo a cargar y nombre del modulo
        loadChildren:'./pages/pages.module#PagesModules'
    },
    { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });

