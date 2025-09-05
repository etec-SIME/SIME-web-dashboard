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
  selectedFile: File | null = null;

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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.chamadoForm.patchValue({
          imgChamado: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if(this.chamadoForm.invalid) {
      return;
    }

    const formValues = this.chamadoForm.value;

    const ambienteSelecionado: AmbienteSelectDTO = formValues.ambiente;

    const ambienteObj = { ...ambienteSelecionado };
    console.log(JSON.stringify(ambienteObj, null, 2))

    const chamadoRequestDTO: ChamadoRequestDTO = {
      tituloChamado: "dawdwa", //formValues.problema,
      descChamado: "dawdwa",//formValues.descricao,
      dataAbertura: formValues.data,
      emailUsuario: "raphael@gmail.com", //formValues.email,
      imgChamado: 'abc.png', //formValues.imgChamado,
      idTipoChamado: 1, //formValues.tipoChamado,
      codEquipamento: "123", //formValues.codigoEquipamento,
      idAmbiente: 1, //ambienteSelecionado?.idAmbiente ?? 0,
      idTipoAmbiente: 1, //ambienteSelecionado?.idTipoAmbiente ?? 0
    };
    
    this.chamadoService.criarChamado(chamadoRequestDTO).subscribe({
      next: (res) => {
        console.log('Chamado criado com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao criar chamado:', err);
      }
    });
  }
}
