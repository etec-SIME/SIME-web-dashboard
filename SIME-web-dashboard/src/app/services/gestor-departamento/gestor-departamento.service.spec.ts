import { TestBed } from '@angular/core/testing';

import { GestorDepartamentoService } from './gestor-departamento.service';

describe('GestorDepartamentoService', () => {
  let service: GestorDepartamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorDepartamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
