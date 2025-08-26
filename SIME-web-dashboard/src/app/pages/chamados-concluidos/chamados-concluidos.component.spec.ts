import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosConcluidosComponent } from './chamados-concluidos.component';

describe('ChamadosConcluidosComponent', () => {
  let component: ChamadosConcluidosComponent;
  let fixture: ComponentFixture<ChamadosConcluidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosConcluidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosConcluidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
