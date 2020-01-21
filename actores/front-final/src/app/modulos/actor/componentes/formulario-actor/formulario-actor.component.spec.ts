import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActorComponent } from './formulario-actor.component';

describe('FormularioActorComponent', () => {
  let component: FormularioActorComponent;
  let fixture: ComponentFixture<FormularioActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
