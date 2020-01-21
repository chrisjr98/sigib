import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaFormularioComponent } from './pelicula-formulario.component';

describe('PeliculaFormularioComponent', () => {
  let component: PeliculaFormularioComponent;
  let fixture: ComponentFixture<PeliculaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
