import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroChamadosKanbanComponent } from './quadro-chamados-kanban.component';

describe('QuadroChamadosKanbanComponent', () => {
  let component: QuadroChamadosKanbanComponent;
  let fixture: ComponentFixture<QuadroChamadosKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroChamadosKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadroChamadosKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
