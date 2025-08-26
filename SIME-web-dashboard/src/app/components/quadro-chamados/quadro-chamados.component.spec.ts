import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroChamadosComponent } from './quadro-chamados.component';

describe('QuadroChamadosComponent', () => {
  let component: QuadroChamadosComponent;
  let fixture: ComponentFixture<QuadroChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroChamadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadroChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
