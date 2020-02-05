import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarCursoComponent } from './crear-editar-curso.component';

describe('CrearEditarCursoComponent', () => {
  let component: CrearEditarCursoComponent;
  let fixture: ComponentFixture<CrearEditarCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
