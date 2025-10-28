import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroPerfisComponent } from './quadro-perfis.component';

describe('QuadroPerfisComponent', () => {
  let component: QuadroPerfisComponent;
  let fixture: ComponentFixture<QuadroPerfisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuadroPerfisComponent]
    });
    fixture = TestBed.createComponent(QuadroPerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
