import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaListarComponent } from './pelicula-listar.component';

describe('PeliculaListarComponent', () => {
  let component: PeliculaListarComponent;
  let fixture: ComponentFixture<PeliculaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
