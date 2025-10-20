import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarChamadoComponent } from './criar-chamado.component';

describe('CriarChamadoComponent', () => {
  let component: CriarChamadoComponent;
  let fixture: ComponentFixture<CriarChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarChamadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
