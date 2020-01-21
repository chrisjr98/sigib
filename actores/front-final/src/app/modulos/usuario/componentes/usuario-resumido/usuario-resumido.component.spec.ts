import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioResumidoComponent } from './usuario-resumido.component';

describe('UsuarioResumidoComponent', () => {
  let component: UsuarioResumidoComponent;
  let fixture: ComponentFixture<UsuarioResumidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioResumidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioResumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
