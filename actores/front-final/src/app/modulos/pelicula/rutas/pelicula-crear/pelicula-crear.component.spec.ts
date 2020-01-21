import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaCrearComponent } from './pelicula-crear.component';

describe('PeliculaCrearComponent', () => {
  let component: PeliculaCrearComponent;
  let fixture: ComponentFixture<PeliculaCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
