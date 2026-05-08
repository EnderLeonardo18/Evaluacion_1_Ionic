import { Routes } from '@angular/router';

// Acá se gestionan las rutas, es parecido a Vue pero tambien una similitud con Angular
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'informacion',
    title: 'Información personal',
    loadComponent: () => import('./pages/informacion/informacion.page').then( m => m.InformacionPage)
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./pages/contacto/contacto.page').then( m => m.ContactoPage)
  },
];
