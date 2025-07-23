import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosPendentesComponent } from './chamados-pendentes.component';

describe('ChamadosPendentesComponent', () => {
  let component: ChamadosPendentesComponent;
  let fixture: ComponentFixture<ChamadosPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosPendentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
