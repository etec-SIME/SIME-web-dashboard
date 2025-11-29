import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPermissoesComponent } from './tabela-permissoes.component';

describe('TabelaPermissoesComponent', () => {
  let component: TabelaPermissoesComponent;
  let fixture: ComponentFixture<TabelaPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPermissoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
