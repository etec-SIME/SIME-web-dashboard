import { TestBed } from '@angular/core/testing';

import { ChamadoService } from './Chamado.service';

describe('ChamadoService', () => {
  let service: ChamadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
