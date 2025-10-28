import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAmbienteComponent } from './criar-ambiente.component';

describe('CriarAmbienteComponent', () => {
  let component: CriarAmbienteComponent;
  let fixture: ComponentFixture<CriarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarAmbienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
