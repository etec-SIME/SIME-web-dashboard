import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoDetalheComponent } from './chamado-detalhe.component';

describe('ChamadoDetalheComponent', () => {
  let component: ChamadoDetalheComponent;
  let fixture: ComponentFixture<ChamadoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
