import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaEditarComponent } from './pelicula-editar.component';

describe('PeliculaEditarComponent', () => {
  let component: PeliculaEditarComponent;
  let fixture: ComponentFixture<PeliculaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
