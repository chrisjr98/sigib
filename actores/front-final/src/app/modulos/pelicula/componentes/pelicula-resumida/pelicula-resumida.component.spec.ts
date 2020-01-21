import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaResumidaComponent } from './pelicula-resumida.component';

describe('PeliculaResumidaComponent', () => {
  let component: PeliculaResumidaComponent;
  let fixture: ComponentFixture<PeliculaResumidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaResumidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaResumidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
