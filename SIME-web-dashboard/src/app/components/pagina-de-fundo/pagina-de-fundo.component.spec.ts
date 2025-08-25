import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDeFundoComponent } from './pagina-de-fundo.component';

describe('PaginaDeFundoComponent', () => {
  let component: PaginaDeFundoComponent;
  let fixture: ComponentFixture<PaginaDeFundoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDeFundoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDeFundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
