import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosLocaisCardsComponent } from './chamados-locais-cards.component';

describe('ChamadosLocaisCardsComponent', () => {
  let component: ChamadosLocaisCardsComponent;
  let fixture: ComponentFixture<ChamadosLocaisCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadosLocaisCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosLocaisCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
