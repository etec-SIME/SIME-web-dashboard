import { Component, OnInit } from '@angular/core';
import { GestorDepartamentoService } from '../../services/gestor-departamento/gestor-departamento.service';
import { PrioridadeChamadoEnum } from '../../models/enums/prioridade-chamado-enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestor-departamento',
  templateUrl: './gestor-departamento.component.html',
  styleUrls: ['./gestor-departamento.component.css']
})
export class GestorDepartamentoComponent implements OnInit {

  constructor(private gestorDepartamentoService: GestorDepartamentoService) {}

  ngOnInit(): void {
    this.testarTodosEndpoints();
  }

  private logErroDetalhado(err: HttpErrorResponse) {
    console.error('Erro na requisição:');
    console.error('URL:', err.url);
    console.error('Status:', err.status, err.statusText);
    console.error('Mensagem:', err.message);
    console.error('Erro detalhado:', err.error);
  }

  private testarTodosEndpoints() {
    const rmGestor = '123456';
    const idChamado = 1;
    const departamentoId = 1;
    const idTipoPerfil = 2;
    const descricaoFeedback = 'Chamado revisado e encaminhado.';

    // 1️⃣ Buscar usuários por tipo de perfil e departamento
    this.gestorDepartamentoService.getUsuariosByTipoPerfilAndDepartamento(departamentoId, idTipoPerfil)
      .subscribe({
        next: (usuarios) => console.log('Usuários recebidos:', usuarios),
        error: (err: HttpErrorResponse) => this.logErroDetalhado(err)
      });

    // 2️⃣ Visualizar chamados do gestor
    this.gestorDepartamentoService.visualizarChamadosDepartamento(rmGestor)
      .subscribe({
        next: (chamados) => console.log('Chamados do gestor:', chamados),
        error: (err: HttpErrorResponse) => this.logErroDetalhado(err)
      });

    // 3️⃣ Enviar feedback para um chamado
    this.gestorDepartamentoService.enviarFeedback(rmGestor, idChamado, descricaoFeedback)
      .subscribe({
        next: (resp) => console.log('Feedback enviado:', resp),
        error: (err: HttpErrorResponse) => this.logErroDetalhado(err)
      });

    // 4️⃣ Alterar prioridade de um chamado
    this.gestorDepartamentoService.definirPrioridadeChamado(rmGestor, idChamado, PrioridadeChamadoEnum.AltaPrioridade)
      .subscribe({
        next: () => console.log(`Prioridade do chamado ${idChamado} alterada para: ${PrioridadeChamadoEnum.AltaPrioridade}`),
        error: (err: HttpErrorResponse) => this.logErroDetalhado(err)
      });
  }
}

