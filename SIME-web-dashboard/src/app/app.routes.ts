import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ChamadosConcluidosComponent } from './pages/chamados-concluidos/chamados-concluidos.component';
import { ChamadosPendentesComponent } from './pages/chamados-pendentes/chamados-pendentes.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EscolaComponent } from './pages/escola/escola.component';
import { CriarChamadoComponent } from './pages/criar-chamado/criar-chamado.component';
import { CriarAmbienteComponent } from './pages/criar-ambiente/criar-ambiente.component';
import { GestorGeralComponent } from './pages/gestor-geral/gestor-geral.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CriarComponent } from './pages/criar/criar.component';
import { LoginComponent } from './pages/login/login.component';
import { ChamadoDetalheComponent } from './pages/chamado-detalhe/chamado-detalhe.component';
import { PaginaDeFundoComponent } from './components/pagina-de-fundo/pagina-de-fundo.component';
import { CadastroFuncionarioComponent } from './pages/cadastro-funcionario/cadastro-funcionario.component';
import { AuthGuard } from './services/auth/guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'layout', component: LayoutComponent, canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomeComponent, data: { titulo: 'Home - Locais' } },
        { path: 'chamados-pendentes', component: ChamadosPendentesComponent, data: { titulo: 'Chamados Pendentes' } },
        { path: 'chamados-concluidos', component: ChamadosConcluidosComponent, data: { titulo: 'Chamados Concluídos' } },
        { path: 'home', component: HomeComponent, data: { titulo: 'Home - Locais' } },
        { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
        { path: 'criar', component: CriarComponent, data: { titulo: "Criar" } },
        { path: 'criar-chamado', component: CriarChamadoComponent, data: { titulo: 'Criar Chamado' } },
        { path: 'chamado/:id', component: ChamadoDetalheComponent, data: { titulo: 'Detalhes do Chamado' } },
        { path: 'cadastro-funcionario', component: CadastroFuncionarioComponent, data: { titulo: 'Cadastro de Funcionário' } },
        { path: 'criar-ambiente', component: CriarAmbienteComponent, data: { titulo: 'Criar Local' } },
      ]
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { permissions: ['guigass'] } },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'escola', component: EscolaComponent },
    { path: 'gestor-geral', component: GestorGeralComponent},
    { path: 'pagina-de-fundo', component: PaginaDeFundoComponent },
    { path: 'cadastro-funcionario', component: CadastroFuncionarioComponent},
    { path: '**', redirectTo: 'login' }
];
