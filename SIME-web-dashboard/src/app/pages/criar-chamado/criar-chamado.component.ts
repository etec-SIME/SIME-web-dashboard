import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { chamadoRequestDTO } from '../../DTOs/chamadoRequestDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { forkJoin } from 'rxjs';
import { AmbienteChamadoSelectDTO } from '../../DTOs/AmbienteChamadoSelectDTO';
import { CodEquipamentoList, TipoEquipamentoSelectDTO } from '../../DTOs/TipoEquipamentoSelectDTO';
import { sharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-criar-chamado',
  imports: [ReactiveFormsModule, sharedImports],
  templateUrl: './criar-chamado.component.html',
  styleUrl: './criar-chamado.component.css'
})
export class CriarChamadoComponent implements OnInit {
  tiposChamado: TipoChamadoSelectDTO[] = [];
  ambientes: AmbienteChamadoSelectDTO[] = [];
  equipamentos: TipoEquipamentoSelectDTO[] = [];
  codigosEquipamento: CodEquipamentoList[] = [];

  chamadoForm: FormGroup;
  selectedFiles: File[] = [];

  imagensUrl: string[] = [];
  modalAberto = false;
  imagemModal: string = "";
  imagemIndex: number = 0;

  constructor(private fb: FormBuilder, private chamadoService: ChamadoService) {
    this.chamadoForm = this.fb.group({
      data: ['', Validators.required],
      ambiente: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoChamado: ['', Validators.required],
      problema: ['', Validators.required],
      descricao: ['', Validators.required],
      equipamento: ['', Validators.required],
      codigoEquipamento: ['', Validators.required],
      anexo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSelects();

    this.chamadoForm.get('ambiente')?.valueChanges.subscribe((ambienteSelecionado: AmbienteChamadoSelectDTO) => {
      if (ambienteSelecionado && ambienteSelecionado.tipoEquipamentoList) {
        this.equipamentos = ambienteSelecionado.tipoEquipamentoList.map(tipo => ({
          idTipoEquipamento: tipo.idTipoEquipamento,
          nomeTipoEquipamento: tipo.nomeTipoEquipamento,
          idTipoChamado: tipo.idTipoChamado,
          nomeTipoChamado: tipo.nomeTipoChamado,
          equipamentoList: tipo.equipamentoList
        }));
      } else {
        this.equipamentos = [];
      }

      this.codigosEquipamento = [];
      this.chamadoForm.get('equipamento')?.reset();
      this.chamadoForm.get('codigoEquipamento')?.reset();
    });

    this.chamadoForm.get('equipamento')?.valueChanges.subscribe((equipamentoSelecionado: any) => {
      if (equipamentoSelecionado && equipamentoSelecionado.equipamentoList) {
        this.codigosEquipamento = equipamentoSelecionado.equipamentoList.map(
          (e: { codEquipamento: any }) => e.codEquipamento
        );
      } else {
        this.codigosEquipamento = [];
      }

      this.chamadoForm.get('codigoEquipamento')?.reset();
    });
  }

  loadSelects() {
    forkJoin({
      ambientes: this.chamadoService.getAmbienteChamadoSelect(),
      tiposChamado: this.chamadoService.getTipoChamadoSelect()
    }).subscribe({
      next: ({ ambientes, tiposChamado }) => {
        this.ambientes = ambientes.map(a => ({
          ...a,
          numAmbiente: String(a.numAmbiente),
          tipoEquipamentoList: (a as any).tipoEquipamentoList ?? [],
          displayName: `${a.nomeTipoAmbiente} - ${a.numAmbiente}`
        }));
        this.tiposChamado = tiposChamado;
      },
      error: (err) => console.error('Erro ao carregar ambientes:', err)
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
      const imageFiles: File[] = files.filter(file => file.type.startsWith('image/'));

      // Adiciona os novos arquivos ao array
      this.selectedFiles.push(...imageFiles);

      // Remove duplicatas pelo nome
      this.selectedFiles = this.selectedFiles.filter(
        (file, index, self) => index === self.findIndex(f => f.name === file.name)
      );

      if (imageFiles.length !== files.length) {
        alert('Apenas arquivos de imagem são permitidos!');
      }

      this.imagensUrl = [];

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imagensUrl.push(e.target.result); // base64 da imagem
        };

        reader.readAsDataURL(file);
      });

      console.log('Arquivos selecionados:', this.selectedFiles);
      console.log('Pré-visualizações:', this.imagensUrl);
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.chamadoForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.chamadoForm.invalid) {
      this.chamadoForm.markAllAsTouched();
      return;
    }

    const formValues = this.chamadoForm.value;
    const ambienteSelecionado: AmbienteSelectDTO = formValues.ambiente;

    const chamadoRequestDTO: chamadoRequestDTO = {
      tituloChamado: formValues.problema,
      descChamado: formValues.descricao,
      dataAbertura: formValues.data,
      emailUsuario: formValues.email,
      idTipoChamado: formValues.tipoChamado,
      codEquipamento: formValues.codigoEquipamento,
      idAmbiente: ambienteSelecionado?.idAmbiente ?? 0,
      idTipoAmbiente: ambienteSelecionado?.idTipoAmbiente ?? 0
    };

    const formData = new FormData();
    formData.append('chamado', new Blob([JSON.stringify(chamadoRequestDTO)], { type: 'application/json' }));

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => formData.append('files', file));
    }

    this.chamadoService.criarChamado(formData).subscribe({
      next: (res) => {
        alert('Chamado criado com sucesso!');
        console.log('Chamado criado:', res);
        this.chamadoForm.reset();
      },
      error: (err) => {
        alert('Erro ao criar chamado. Tente novamente.');
        console.error('Erro ao criar chamado:', err);
      }
    });
  }

  abrirModal(img: string) {
    this.imagemModal = img;
    this.imagemIndex = this.imagensUrl.indexOf(img);
    this.modalAberto = true;
  }

  fecharModal(event?: Event) {
    event?.stopPropagation();
    this.modalAberto = false;
  }

  prevImagem(event: Event) {
    event.stopPropagation();
    this.imagemIndex =
        (this.imagemIndex - 1 + this.imagensUrl.length) % this.imagensUrl.length;
    this.imagemModal = this.imagensUrl[this.imagemIndex];
  }

  nextImagem(event: Event) {
    event.stopPropagation();
    this.imagemIndex =
        (this.imagemIndex + 1) % this.imagensUrl.length;
    this.imagemModal = this.imagensUrl[this.imagemIndex];
  }

  removerImagemSelecionada(event: Event) {
    event.stopPropagation();

    const index = this.imagensUrl.indexOf(this.imagemModal);
    if (index === -1) return;

    this.imagensUrl.splice(index, 1);
    this.selectedFiles.splice(index, 1);

    if (this.imagensUrl.length === 0) {
      this.fecharModal();

      const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      return;
    }

    if (index >= this.imagensUrl.length) {
      this.imagemIndex = this.imagensUrl.length - 1;
    } else {
      this.imagemIndex = index;
    }

    this.imagemModal = this.imagensUrl[this.imagemIndex];

    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}
