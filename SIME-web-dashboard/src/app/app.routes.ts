import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestorGeralComponent } from './pages/gestor-geral/gestor-geral.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'gestor-geral', component: GestorGeralComponent},
    { path: '**', redirectTo: '' }
];
