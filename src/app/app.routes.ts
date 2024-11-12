import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path : 'detalle/:id',
        loadComponent: () => import('./pages/detalle-sms/detalle-sms.component'),    
    },
    {
        path: '',
        redirectTo : 'detalle/0',
        pathMatch: 'full'
    }
];
