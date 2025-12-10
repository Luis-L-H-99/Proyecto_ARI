import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Reproductor } from './Pages/reproductor/reproductor';
import { Dasboard } from './Pages/dasboard/dasboard';
import { DasboardWickOutPlan } from './Pages/dasboard-wick-out-plan/dasboard-wick-out-plan';
import { Formulario } from './Pages/formulario/formulario';
export const routes: Routes = [
    { path: 'Login', component: Login },
    { path: 'Formulario', component: Formulario },
    { path: 'DashboardWithOutPlan', component: DasboardWickOutPlan },
    { path: 'Dashboard', component: Dasboard },
    { path: 'Reproductor', component: Reproductor },
    { path: '', redirectTo: 'Login', pathMatch: 'full'},
    { path: '##', redirectTo: 'Login'}
];