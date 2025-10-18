import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDepartamentoComponent } from './gestor-departamento.component';

describe('GestorDepartamentoComponent', () => {
  let component: GestorDepartamentoComponent;
  let fixture: ComponentFixture<GestorDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorDepartamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
