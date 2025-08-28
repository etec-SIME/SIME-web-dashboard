import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-chamado',
  imports: [],
  templateUrl: './criar-chamado.component.html',
  styleUrl: './criar-chamado.component.css'
})
export class CriarChamadoComponent {
  chamadoForm: FormGroup;
  tiposChamado = [
    { idTipoChamado: 1, nomeTipoChamado: 'Manutenção' },
    { idTipoChamado: 2, nomeTipoChamado: 'Suporte' },
    { idTipoChamado: 3, nomeTipoChamado: 'Outro' }
  ];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.chamadoForm = this.fb.group({
      data: ['', Validators.required],
      local: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoChamado: ['', Validators.required],
      problema: ['', Validators.required],
      descricao: ['', Validators.required],
      equipamento: [''],
      codigoEquipamento: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  onSubmit() {
    if (this.chamadoForm.valid) {
      const formData = new FormData();
      Object.keys(this.chamadoForm.value).forEach(key => {
        formData.append(key, this.chamadoForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('anexo', this.selectedFile);
      }
      console.log('Form enviado:', formData);
      
    }
  }
}
