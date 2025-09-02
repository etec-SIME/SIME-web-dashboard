import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChamadoService } from '../../services/chamado/chamado.service';
import { ChamadoRequestDTO } from '../../DTOs/ChamadoRequestDTO';

@Component({
  selector: 'app-criar-chamado',
  imports: [ReactiveFormsModule],
  templateUrl: './criar-chamado.component.html',
  styleUrl: './criar-chamado.component.css'
})
export class CriarChamadoComponent {
  tiposChamado = [];
  ambiente = [];

  chamadoForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private chamadoService: ChamadoService) {
    this.chamadoForm = this.fb.group({
      data: ['', Validators.required],
      ambiente: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoChamado: ['', Validators.required],
      problema: ['', Validators.required],
      descricao: ['', Validators.required],
      equipamento: [''],
      codigoEquipamento: ['']
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

    const chamadoRequestDTO: ChamadoRequestDTO = {
      tituloChamado: formValues.problema,
      descChamado: formValues.descricao,
      data: formValues.data,
      emailUsuario: formValues.email,
      imgChamado: formValues.imgChamado,
      idTipoChamado: formValues.tipoChamado,
      codEquipamento: formValues.codigoEquipamento,
      idAmbiente: formValues.ambiente
    };
    
    this.chamadoService.criarChamado(, chamadoRequestDTO).subscribe({
      next: (res) => {
        console.log('Chamado criado com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao criar chamado:', err);
      }
    });
  }
}
