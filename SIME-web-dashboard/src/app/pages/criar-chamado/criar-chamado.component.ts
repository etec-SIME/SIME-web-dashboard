import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';
import { AmbienteSelectDTO } from '../../DTOs/AmbienteSelectDTO';
import { TipoChamadoSelectDTO } from '../../DTOs/TipoChamadoSelectDTO';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-criar-chamado',
  imports: [ReactiveFormsModule],
  templateUrl: './criar-chamado.component.html',
  styleUrl: './criar-chamado.component.css'
})
export class CriarChamadoComponent {
  tiposChamado: TipoChamadoSelectDTO[] = [];
  ambientes: AmbienteSelectDTO[] = [];

  chamadoForm: FormGroup;
  selectedFiles: File[] = []; // Changed from a single File to an array of Files

  constructor(private fb: FormBuilder, private chamadoService: ChamadoService) {
    this.chamadoForm = this.fb.group({
      // data: ['', Validators.required],
      // ambiente: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // tipoChamado: ['', Validators.required],
      // problema: ['', Validators.required],
      // descricao: ['', Validators.required],
      // equipamento: [''],
      // codigoEquipamento: ['']

      data: [''],
      ambiente: [''],
      email: [''],
      tipoChamado: [''],
      problema: [''],
      descricao: [''],
      equipamento: [''],
      codigoEquipamento: ['']
    });
  }

  ngOnInit() {
    this.loadSelects();
  }

  loadSelects() {
    forkJoin({
      ambientes: this.chamadoService.getAmbienteChamadoSelect(),
      tiposChamado: this.chamadoService.getTipoChamadoSelect()
    }).subscribe({
      next: ({ambientes, tiposChamado}) => {
        this.ambientes = ambientes.map(a => ({
          ...a, // pega todas as propriedades do objeto 'a' (idAmbiente, numAmbiente, nomeTipoAmbiente, etc.)
          displayName: `${a.nomeTipoAmbiente} - ${a.numAmbiente}`
        }))
        this.tiposChamado = tiposChamado;
      },
      error: (err) => console.error('Erro ao carregar ambientes:', err)
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
  
      this.selectedFiles = files.filter(file => file.type.startsWith('image/'));
  
      if (this.selectedFiles.length !== files.length) {
        alert('Apenas arquivos de imagem são permitidos!');
      }
    }
  }

  onSubmit() {
    if(this.chamadoForm.invalid) {
      return;
    }

    const formValues = this.chamadoForm.value;

    const ambienteSelecionado: AmbienteSelectDTO = formValues.ambiente;

    console.log(`idAmbiente: ${ambienteSelecionado.idAmbiente}`);
    console.log(`idTipoAmbiente: ${ambienteSelecionado.idTipoAmbiente}`);
    console.log(`numAmbiente: ${ambienteSelecionado.numAmbiente}`);
    console.log(`nomeTipoAmbiente: ${ambienteSelecionado.nomeTipoAmbiente}`);

    // const chamadoRequestDTO: ChamadoRequestDTO = {
    //   tituloChamado: "dawdwa", //formValues.problema,
    //   descChamado: "dawdwa",//formValues.descricao,
    //   dataAbertura: formValues.data,
    //   emailUsuario: "raphael@gmail.com", //formValues.email,
    //   imgChamado: 'abc.png', //formValues.imgChamado,
    //   idTipoChamado: 1, //formValues.tipoChamado,
    //   codEquipamento: "123", //formValues.codigoEquipamento,
    //   idAmbiente: 1, //ambienteSelecionado?.idAmbiente ?? 0,
    //   idTipoAmbiente: 1, //ambienteSelecionado?.idTipoAmbiente ?? 0
    // };

    const chamadoRequestDTO: ChamadoRequestDTO = {
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

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let file of this.selectedFiles) {
        formData.append('files', file);
      }
    }
    
    this.chamadoService.criarChamado(formData).subscribe({
      next: (res) => {
        console.log('Chamado criado com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao criar chamado:', err);
      }
    });
  }
}
