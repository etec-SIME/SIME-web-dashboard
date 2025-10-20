import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../../services/escola/escola.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { escolaProjection } from '../../DTOs/Projections/escolaProjection';
import { ambienteRequestDTO } from '../../DTOs/ambienteRequestDTO';
import { departamentoRequestDTO } from '../../DTOs/departamentoRequestDTO';
import { tipoPerfilRequestDTO } from '../../DTOs/tipoPerfilRequestDTO';
import { tipoChamadoRequestDTO } from '../../DTOs/tipoChamadoRequestDTO';
import { equipamentoRequestDTO } from '../../DTOs/equipamentoRequestDTO';
import { permissao } from '../../models/permissao';
import { tipoEquipamento } from '../../models/tipoEquipamento';
import { tipoAmbienteRequestDTO } from '../../DTOs/tipoAmbienteRequestDTO';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { usuarioRequestDTO } from '../../DTOs/usuarioRequestDTO';
import { permissaoTipoPerfilDTO } from '../../DTOs/permissaoTipoPerfilDTO';
import { tipoEquipamentoAmbienteDTO } from '../../DTOs/tipoEquipamentoAmbienteDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';

@Component({
  selector: 'app-escola',
  imports: [CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './escola.component.html',
  styleUrl: './escola.component.css'
})
export class EscolaComponent implements OnInit{

  escolas: escolaProjection[] = []

  ambientesSelect: AmbienteSelectDTO[] = []; // para filtros, cards, etc
  ambientesRequest: ambienteRequestDTO[] = []; // para acessar descricaoAmbiente quando precisar
  departamentos: departamentoRequestDTO[] = []
  equipamentos: equipamentoRequestDTO[] = []
  tipoPerfis: tipoPerfilRequestDTO[] = []
  tipoChamados: tipoChamadoRequestDTO[] = []
  tipoEquipamentos: tipoEquipamento[] = []
  tipoAmbientes: tipoAmbienteRequestDTO[] = []

  permissoes: permissao[] = []
  tipoEquipamento: tipoEquipamento[] = []

  constructor(private escolaService: EscolaService, private fb: FormBuilder){
    this.CriarForms();
  }

  carregado: boolean = false;

  ngOnInit(): void{

    // escolas
    this.escolaService.getAllEscolas().subscribe(resp =>
      this.escolas = resp
    )

    // ambientes
    this.escolaService.getAllAmbiente().subscribe(resp =>
      this.ambientesSelect = resp.map(a => {
      const ambienteReq = this.ambientesRequest.find(ar => ar.numAmbiente === a.numAmbiente);
        return {
          ...a,
          descricaoAmbiente: ambienteReq ? ambienteReq.descricaoAmbiente : 'Sem descrição'
        };
      }) // Arrumar aqui
      
    );

    // departamentos
    this.escolaService.getAllDepartamento().subscribe((resp) => {
      this.departamentos = resp,
      this.carregado = true
    })

    // tipo perfis
    this.escolaService.getAllTipoPerfil().subscribe((resp) => {
      this.tipoPerfis = resp
      this.carregado = true
    })

    // equipamentos
    this.escolaService.getAllEquipamento().subscribe((resp) => {
      this.equipamentos = resp
      this.carregado = true
    })

    // tipo de chamados
    this.escolaService.getAllTipoChamado().subscribe((resp) => {
      this.tipoChamados = resp
      this.carregado = true
    })

    // tipo de equipamentos
    this.escolaService.getAllTipoEquipamento().subscribe((resp) => {
      this.tipoEquipamentos = resp
      this.carregado = true
    })

    this.escolaService.getAllTipoAmbiente().subscribe((resp) => {
      this.tipoAmbientes = resp
      this.carregado = true
    })

  }

  getDescricao(numAmbiente: number): string {
    const ambiente = this.ambientesRequest.find(a => a.numAmbiente === numAmbiente);
    return ambiente ? ambiente.descricaoAmbiente : 'Sem descrição';
  }

  getAllAmbientesComDescricao(): (AmbienteSelectDTO & { descricaoAmbiente: string })[] {
  return this.ambientesSelect.map(a => ({
    ...a,
    descricaoAmbiente: this.getDescricao(a.numAmbiente)
  }));
}

  //Formulários de cadastro/criação

  formCadastrarTipoPerfil!: FormGroup;
  formCriarTipoChamado!: FormGroup;
  formCriarTipoEquipamento!: FormGroup;
  formCriarTipoAmbiente!: FormGroup;

  formCadastrarUsuario!: FormGroup;
  formCriarDepartamento!: FormGroup;
  formCadastrarAmbiente!: FormGroup;
  formCadastrarEquipamento!: FormGroup;

  //Formulário de edição

  formEditarTipoPerfil!: FormGroup;
  formEditarTipoChamado!: FormGroup;
  formEditarTipoEquipamento!: FormGroup;
  formEditarTipoAmbiente!: FormGroup;

  formEditarUsuario!: FormGroup;
  formEditarDepartamento!: FormGroup;
  formEditarAmbiente!: FormGroup;
  formEditarEquipamento!: FormGroup;

  idTipoPerfil!: FormGroup;
  idAmbiente!: FormGroup;
  listaPermissoes!: FormGroup;
  listaTipoEquipamento!: FormGroup;

  CriarForms(){

    //
    this.idTipoPerfil = this.fb.group({
      id: ['']
    })

    this.idAmbiente = this.fb.group({
      id: ['']
    })

    this.listaPermissoes = this.fb.group({
      idTipoPerfil: [''],
      ids: [[]]
    })

    this.listaTipoEquipamento = this.fb.group({
      idAmbiente: [''],
      ids: [[]]
    })

    //
    this.formCadastrarTipoPerfil = this.fb.group({
      nomeTipoPerfil: ['']
    })

    this.formCriarTipoAmbiente = this.fb.group({
      nomeTipoAmbiente: ['']
    })

    this.formCriarTipoChamado = this.fb.group({
      idDepartamento: [''],
      nomeTipoChamado: ['']
    })

    this.formCriarTipoEquipamento = this.fb.group({
      nomeTipoEquipamento: ['']
    })

    this.formCriarDepartamento = this.fb.group({
      nomeDepartamento: [''],
      descDepartamento: ['']
    })

    this.formCadastrarAmbiente = this.fb.group({
        numAmbiente: [''],
        descricaoAmbiente: [''],
        idTipoAmbiente: ['']
    })

    this.formCadastrarUsuario =  this.fb.group({
        rmUsuario: [''],
        //idTipoPerfil: [''],
        nomeUsuario: [''],
        senhaUsuario: [''],
        cpfUsuario: [''],
        emailUsuario: [''],
        telefoneUsuario: [''],
        //departamentoIds: ['']
    })

    this.formCadastrarEquipamento = this.fb.group({
      codEquipamento: [''],
      idTipoEquipamento: ['']
    })

    //Forms de edição

    this.formEditarTipoPerfil = this.fb.group({
      id: [''],
      nomeTipoPerfil: ['']
    })

    this.formEditarTipoAmbiente = this.fb.group({
      id: [''],
      nomeTipoAmbiente: ['']
    })

    this.formEditarTipoChamado = this.fb.group({
      id: [''],
      idDepartamento: [''],
      nomeTipoChamado: ['']
    })

    this.formEditarTipoEquipamento = this.fb.group({
      id: [''],
      nomeTipoEquipamento: ['']
    })

    this.formEditarAmbiente = this.fb.group({
      id: [''],
      numAmbiente: [''],
      descricaoAmbiente: [''],
      idTipoAmbiente: ['']
    })


    this.formEditarEquipamento = this.fb.group({
      codEquipamento: [''],
      idTipoEquipamento: ['']
    })

    this.formEditarDepartamento = this.fb.group({
      id: [''],
      nomeDepartamento: [''],
      descDepartamento: ['']
    })

  }

  onListarPermissaoTipoPerfil(){
      const id = this.idTipoPerfil.value.id;

      this.escolaService.getAllPermissaoTipoPerfil(Number(id)).subscribe({
        next: (resp) => {
        this.permissoes = resp;
        this.carregado = true
      },
      error: (err) =>{
        alert("Erro ao listar permissoes")
      }
      });
    }

    onListarTipoEquipamentoAmbiente(){
      const id = this.idAmbiente.value.id;

      this.escolaService.getAllTipoEquipamentoAmbiente(Number(id)).subscribe({
        next: (resp) => {
        this.tipoEquipamento = resp;
        this.carregado = true
      },
      error: (err) =>{
        alert("Erro ao listar tipo de equipamentos")
      }
      });

    }

    onAtribuirPermissoes(){
      const idTipoPerfil = this.listaPermissoes.value.idTipoPerfil;

      const idsPermissao = this.listaPermissoes.get('ids')?.value

      const listaPermissoes = idsPermissao.split(',').map((id: string) => Number(id.trim()));

      const payload: permissaoTipoPerfilDTO = {idPermissoes: listaPermissoes};

      this.escolaService.atribuirPermissoesTipoPerfil(idTipoPerfil, payload).subscribe({
        next: (resp) => {
          alert("Atribuiu!!");
          this.listaPermissoes.reset();
        }, error: (err) => {
          alert("Não atribuiu!!");
          console.log(err);
        }
      })
    }

    onAtribuirTipoEquipamento(){
      const idAmbiente = this.listaTipoEquipamento.value.idAmbiente;

      const idsTipoEquipamento= this.listaTipoEquipamento.get('ids')?.value

      const listaTipoEquipamento = idsTipoEquipamento.split(',').map((id: string) => Number(id.trim()));

      const payload: tipoEquipamentoAmbienteDTO = {idsTipoEquipamento: listaTipoEquipamento};

      this.escolaService.atribuirTipoEquipamentoAmbiente(idAmbiente, payload).subscribe({
        next: (resp) => {
          alert("Atribuiu!!");
          this.listaTipoEquipamento.reset();
        }, error: (err) => {
          alert("Não atribuiu!!");
        }
      })
    }

  onCadastrarTipoPerfil(){
    const novoTipoPerfil = this.formCadastrarTipoPerfil.value;

    this.escolaService.cadastrarTipoPerfil(novoTipoPerfil).subscribe({
      next: (resp) => {
        console.log("Deu certo o post!!", resp)
      },
      error: (err) =>{
        alert("Erro ao criar o tipo perfil")
      }
    });
  }

    OnCriarDepartanmento(){
      const novoDepartamento = this.formCriarDepartamento.value;

      this.escolaService.criarDepartamento(novoDepartamento).subscribe({
        next: (resp) => {
          alert("Departamento criado com sucesso!");
          this.formCriarDepartamento.reset();
        },
        error: (err) => {
          console.log("erro ao criar departamento", err)
        }
      })
    }

    onCriarTipoAmbiente(){
      const novoTipoAmbiente = this.formCriarTipoAmbiente.value;

      this.escolaService.criarTipoAmbiente(novoTipoAmbiente).subscribe({
        next: (resp) => {
          alert("Tipo ambiente criado com sucesso!");
          this.formCriarTipoAmbiente.reset();
        },error: (err) => {
          alert("Erro ao criar Tipo ambiente!!");
        }
      })
    }


    onCriarTipoChamado(){
      const novoTipoChamado = this.formCriarTipoChamado.value;

      this.escolaService.criarTipoChamado(novoTipoChamado).subscribe({
        next: (resp) => {
          alert("Tipo chamado criado com sucesso!");
          this.formCriarTipoChamado.reset();
        }, error: (err) => {
          alert("Erro ao criar Tipo chamado!!");
        }
      })
    }

    onCriarTipoEquipamento(){
      const novoTipoEquipamento = this.formCriarTipoEquipamento.value;

      this.escolaService.criarTipoEquipamento(novoTipoEquipamento).subscribe({
        next: (resp) => {
          alert("Tipo equipamento criado com sucesso!");
          this.formCriarTipoEquipamento.reset();
        }, error: (err) => {
          alert("Erro ao criar Tipo equipamento!!");
        }
      })
    }


    onCadastrarAmbiente(){
      const formValue = this.formCadastrarAmbiente.value;

      const novoAmbiente: ambienteRequestDTO = {
        numAmbiente: Number(formValue.numAmbiente),
        descricaoAmbiente: formValue.descricaoAmbiente,
        idTipoAmbiente: Number(formValue.idTipoAmbiente)
      };


      this.escolaService.cadastrarAmbiente(novoAmbiente).subscribe({
        next: (resp) => {
          alert("Ambiente criado com sucesso!");
          this.formCadastrarAmbiente.reset();
        },error: (err) => {
          alert("Erro ao criar Ambiente!!");
        }
      })
    }

    onCadastrarUsuario(){
      const formValue = this.formCadastrarUsuario.value;

      const novoUsuario: usuarioRequestDTO = {
        rmUsuario: String(formValue.rmUsuario),
        nomeUsuario: String(formValue.nomeUsuario),
        senhaUsuario: String(formValue.senhaUsuario),
        emailUsuario: String(formValue.emailUsuario),
        cpfUsuario: String(formValue.cpfUsuario),
        telefoneUsuario: String(formValue.telefoneUsuario),
      };

      this.escolaService.cadastrarUsuario(novoUsuario).subscribe({
        next: (resp) => {
          alert("Usuario criado com sucesso!");
          this.formCadastrarUsuario.reset();
        },error: (err) => {
          alert("Erro ao criar Usuario!!");
          console.log(err)
        }
      })
    }


    onCadastrarEquipamento(){
      const formValue = this.formCadastrarEquipamento.value;

      const novoEquipamento: equipamentoRequestDTO = {
        codEquipamento: formValue.codEquipamento,
        idTipoEquipamento: formValue.idTipoEquipamento

      };

      this.escolaService.cadastrarEquipamento(novoEquipamento).subscribe({
        next: (resp) => {
          alert("Equipamento criado com sucesso!");
          this.formCadastrarEquipamento.reset();
        },error: (err) => {
          alert("Erro ao criar Equipamento!!");
        }
      })

    }

  onEditarTipoPerfil(){
    const idTipoPerfil= this.formEditarTipoPerfil.value.id;

    const tipoPerfilEditado = {
        nomeTipoPerfil: this.formEditarTipoPerfil.value.nomeTipoPerfil
      }

    this.escolaService.editarTipoPerfil(idTipoPerfil, tipoPerfilEditado).subscribe({
      next: (res) => {
        console.log('EDITAR TIPO PERFIL CLICADO');
        alert('Tipo de perfil editado com sucesso');
        this.formEditarTipoPerfil.reset();

      },
      error: (err) => {
        alert('Erro ao editar tipo de perfil');
      }
    });
  }

  onEditarTipoAmbiente(){
    const idTipoAmbiente = this.formEditarTipoAmbiente.value.id;

    const tipoAmbienteEditado = {
        idTipoAmbiente: idTipoAmbiente, 
        nomeTipoAmbiente: this.formEditarTipoAmbiente.value.nomeTipoAmbiente
    }

    this.escolaService.editarTipoAmbiente(idTipoAmbiente, tipoAmbienteEditado).subscribe({
      next: (res) => {
        alert('Tipo ambiente editado com sucesso');
        this.formEditarTipoAmbiente.reset();
      },
      error: (err) => {
        alert('Erro ao editar tipo ambiente');
      }
    });
  }

  onEditarTipoEquipamento(){
    const idTipoEquipamento= this.formEditarTipoEquipamento.value.id;

    const tipoEquipamentoEditado = {
        nomeTipoEquipamento: this.formEditarTipoEquipamento.value.nomeTipoEquipamento
      }

    this.escolaService.editarTipoEquipamento(idTipoEquipamento, tipoEquipamentoEditado).subscribe({
      next: (res) => {
        alert('Tipo equipamento editado com sucesso');
        this.formEditarTipoEquipamento.reset();
      },
      error: (err) => {
        alert('Erro ao editar tipo equipamento');
      }
    });
  }

  onEditarTipoChamado(){
    const idTipoChamado= this.formEditarTipoChamado.value.id;

    const tipoChamadoEditado = {
        idDepartamento: this.formEditarTipoChamado.value.idDepartamento,
        nomeTipoChamado: this.formEditarTipoChamado.value.nomeTipoChamado
      }

    this.escolaService.editarTipoChamado(idTipoChamado, tipoChamadoEditado).subscribe({
      next: (res) => {
        alert('Tipo chamado editado com sucesso');
        this.formEditarTipoChamado.reset();
      },
      error: (err) => {
        alert('Erro ao editar tipo chamado');
      }
    });
  }


    onEditarDepartanmento(){
      const idDepartamento = this.formEditarDepartamento.value.id;

      const departamentoEditado = {
        nomeDepartamento: this.formEditarDepartamento.value.nomeDepartamento,
        descDepartamento: this.formEditarDepartamento.value.descDepartamento
      }
      this.escolaService.editarDepartamento(idDepartamento, departamentoEditado).subscribe({
        next: (resp) => {
          alert("Departamento editado com sucesso!",);
          this.formEditarDepartamento.reset();
        },
        error: (err) => {
          alert("erro ao editar departamento")
        }
      });
    }


    onEditarAmbiente(){
      const idAmbiente = this.formEditarAmbiente.value.id;

      const ambienteEditado = {
        numAmbiente: this.formEditarAmbiente.value.numAmbiente,
        descricaoAmbiente: this.formEditarAmbiente.value.descricaoAmbiente,
        idTipoAmbiente: this.formEditarAmbiente.value.idTipoAmbiente
      }

      this.escolaService.editarAmbiente(idAmbiente, ambienteEditado).subscribe({
        next: (resp) => {
          alert("Ambiente editado com sucesso!",);
          this.formEditarAmbiente.reset();
        },
        error: (err) => {
          alert("erro ao editar ambiente")
        }
      });
    }



    onEditarEquipamento(){
      const codEquipamento = this.formEditarEquipamento.value.codEquipamento;

      const equipamentoEditado = {
        codEquipamento: this.formEditarEquipamento.value.codEquipamento,
        idTipoEquipamento: this.formEditarEquipamento.value.idTipoEquipamento
      }

      this.escolaService.editarEquipamento(codEquipamento, equipamentoEditado).subscribe({
        next: (resp) => {
          alert("Equipamento editado com sucesso!",);
          this.formEditarEquipamento.reset();
        },
        error: (err) => {
          alert("erro ao editar equipamento")
        }
      });
    }






}
