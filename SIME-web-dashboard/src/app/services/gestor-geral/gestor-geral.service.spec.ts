import { TestBed } from '@angular/core/testing';

import { GestorGeralService } from './gestor-geral.service';

describe('GestorGeralService', () => {
  let service: GestorGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
